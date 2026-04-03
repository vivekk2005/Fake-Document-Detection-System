const path = require("path");
const Tesseract = require("tesseract.js");

const detectAadhaar = async (file, existingDoc) => {

  if (existingDoc) {
    return {
      status: "FAKE",
      confidence: 100,
      reason: "Duplicate document"
    };
  }

  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".pdf") {
    return {
      status: "FAKE",
      confidence: 50,
      reason: "PDF not supported for OCR"
    };
  }

  const result = await Tesseract.recognize(file.path, "eng");
  const text = result.data.text.toUpperCase();

  console.log("Extracted Text:\n", text);

  const aadhaarRegex = /\d{12}|\d{4}\s?\d{4}\s?\d{4}/;

  let score = 0;

  // 1️⃣ Aadhaar Number Check (50 points)
  if (aadhaarRegex.test(text)) {
    score += 50;
  }

  // 2️⃣ Government Keyword Check (25 points)
  if (text.includes("GOVERN")) {
    score += 25;
  }

  // 3️⃣ Identification Keyword Check (25 points)
  if (text.includes("IDENTIFICATION") || text.includes("UIDAI")) {
    score += 25;
  }

  // Final Decision
  if (score >= 75) {
    return {
      status: "GENUINE",
      confidence: score,
      reason: "Valid Aadhaar detected"
    };
  } else {
    return {
      status: "FAKE",
      confidence: score,
      reason: "Aadhaar validation failed"
    };
  }
};

module.exports = detectAadhaar;