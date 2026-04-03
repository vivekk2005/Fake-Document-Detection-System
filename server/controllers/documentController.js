
// const Document = require("../models/Document");
// const generateHash = require("../utils/hashGenerator");
// const detectFakeDocument = require("../utils/fakeDetector");


// const uploadDocument = async (req, res) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Generate file hash
//     const hash = generateHash(file.path);

//     // Check duplicate
//     const existingDoc = await Document.findOne({ hash });

//     if (existingDoc) {
//       return res.status(400).json({
//         message: "Duplicate document detected",
//       });
//     }

//     // 🔥 Run actual detection logic (instead of random)
//     const result = detectFakeDocument(file, existingDoc);

//     const newDoc = new Document({
//       filename: file.filename,
//       originalName: file.originalname,
//       hash,
//       status: result.status,
//       confidence: result.confidence,
//     });

//     await newDoc.save();

//     res.status(201).json(newDoc);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Upload failed" });
//   }
// };

// const getDocuments = async (req, res) => {
//   const docs = await Document.find().sort({ createdAt: -1 });
//   res.json(docs);
// };

// module.exports = {
//   uploadDocument,
//   getDocuments,
// };

// const Document = require("../models/Document");
// const generateHash = require("../utils/hashGenerator");
// const detectAadhaar = require("../utils/aadhaarDetector");
// const detectAadhaar = require("../utils/googleVisionDetector");

// const uploadDocument = async (req, res) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // 1️⃣ Generate file hash (Hashing concept - DSA)
//     const hash = generateHash(file.path);

//     // 2️⃣ Check duplicate (O(1) lookup in DB)
//     const existingDoc = await Document.findOne({ hash });

//     // 3️⃣ Run Aadhaar detection logic (OCR + Pattern Matching)
//     const result = await detectAadhaar(file, existingDoc);

//     // 4️⃣ Save result to database
//     const newDoc = new Document({
//       filename: file.filename,
//       originalName: file.originalname,
//       hash,
//       status: result.status,
//       confidence: result.confidence,
//     });

//     await newDoc.save();

//     res.status(201).json(newDoc);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Upload failed" });
//   }
// };

// const getDocuments = async (req, res) => {
//   try {
//     const docs = await Document.find().sort({ createdAt: -1 });
//     res.json(docs);
//   } catch (error) {
//     res.status(500).json({ message: "Fetch failed" });
//   }
// };

// module.exports = {
//   uploadDocument,
//   getDocuments,
// };

const Document = require("../models/Document");
const generateHash = require("../utils/hashGenerator");
const detectAadhaar = require("../utils/googleVisionDetector"); // only ONE

const uploadDocument = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const hash = generateHash(file.path);
    const existingDoc = await Document.findOne({ hash });

    const result = await detectAadhaar(file, existingDoc);

    const newDoc = new Document({
      filename: file.filename,
      originalName: file.originalname,
      hash,
      status: result.status,
      confidence: result.confidence,
    });

    await newDoc.save();

    res.status(201).json(newDoc);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
};