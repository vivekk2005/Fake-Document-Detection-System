const vision = require("@google-cloud/vision");
const Tesseract = require("tesseract.js");

let client;
try {
  client = new vision.ImageAnnotatorClient();
} catch (err) {
  console.warn("Google Vision client failed to initialize. Will use Tesseract fallback.", err.message);
  client = null;
}

const performOCR = async (filePath) => {
  // Try Google Vision first
  if (client) {
    try {
      const [result] = await client.textDetection(filePath);
      if (result.textAnnotations && result.textAnnotations.length > 0) {
        return result.textAnnotations[0].description.toUpperCase();
      }
    } catch (err) {
      console.warn("Google Vision API failed, using Tesseract fallback:", err.message);
    }
  }

  // Fallback to Tesseract.js
  try {
    const result = await Tesseract.recognize(filePath, "eng");
    return result.data.text.toUpperCase();
  } catch (err) {
    console.error("Tesseract OCR also failed:", err.message);
    throw new Error(`All OCR methods failed: ${err.message}`);
  }
};

const detectAadhaar = async (file, existingDoc) => {

  if (existingDoc) {
    return {
      status: "DUPLICATE",
      confidence: 100,
      reason: "Duplicate document detected"
    };
  }

  try {
    const text = await performOCR(file.path);

    if (!text || text.trim().length === 0) {
      return {
        status: "FAKE",
        confidence: 60,
        reason: "No text detected in image"
      };
    }

    let confidence = 0;
    let reasons = [];

    // Check for Aadhaar patterns (flexible)
    const aadhaarRegex = /\d{4}\s?\d{4}\s?\d{4}|\d{12}/;
    const hasAadhaar = aadhaarRegex.test(text);
    if (hasAadhaar) {
      confidence += 35;
      reasons.push("Valid Aadhaar format detected");
    }

    // Check for Aadhaar keywords (at least ONE required)
    const hasUIDAI = text.includes("UIDAI") || text.includes("UNIQUE IDENTIFICATION");
    const hasGov = text.includes("GOVERNMENT OF INDIA") || text.includes("GOI");
    const hasAadhaarText = text.includes("AADHAAR") || text.includes("E-AADHAAR");

    if (hasUIDAI || hasGov || hasAadhaarText) {
      confidence += 40;
      reasons.push("Official Aadhaar keywords found");
    }

    // Check for security features or markers
    if (text.includes("QR CODE") || text.includes("DOB") || text.includes("GENDER")) {
      confidence += 15;
      reasons.push("Security/structural elements detected");
    }

    // Additional checks for document authenticity
    if (text.length > 100) {
      confidence += 10;
      reasons.push("Adequate text content");
    }

    // Final verdict
    if (confidence >= 60) {
      return {
        status: "GENUINE",
        confidence: Math.min(confidence, 98),
        reason: reasons.join("; ") || "Document structure matches Aadhaar"
      };
    } else if (confidence >= 40) {
      return {
        status: "SUSPICIOUS",
        confidence: confidence,
        reason: reasons.join("; ") || "Incomplete Aadhaar markers"
      };
    } else {
      return {
        status: "FAKE",
        confidence: Math.max(confidence, 40),
        reason: reasons.length > 0 ? reasons.join("; ") : "Does not match Aadhaar document structure"
      };
    }

  } catch (error) {
    console.error("Detection Error:", error);

    return {
      status: "ERROR",
      confidence: 0,
      reason: `Processing failed: ${error.message}`
    };
  }
};

module.exports = detectAadhaar;