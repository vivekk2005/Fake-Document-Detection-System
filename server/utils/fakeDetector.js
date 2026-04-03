const suspiciousWords = [
  "fake",
  "edited",
  "copy",
  "scan",
  "test"
];

const detectFakeDocument = (file, existingDoc) => {
  let status = "GENUINE";
  let confidence = 85;

  // 1️⃣ Duplicate Check (Hashing concept)
  if (existingDoc) {
    return {
      status: "FAKE",
      confidence: 100,
      reason: "Duplicate document detected"
    };
  }

  // 2️⃣ Suspicious Filename Check (String Search - O(n))
  const lowerName = file.originalname.toLowerCase();

  for (let word of suspiciousWords) {
    if (lowerName.includes(word)) {
      return {
        status: "FAKE",
        confidence: 90,
        reason: "Suspicious filename detected"
      };
    }
  }

  // 3️⃣ File Size Check (Rule-based validation)
  if (file.size < 5000) {
    return {
      status: "FAKE",
      confidence: 80,
      reason: "File size too small"
    };
  }

  return {
    status,
    confidence,
    reason: "Document passed basic validation"
  };
};

module.exports = detectFakeDocument;