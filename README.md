# 🕵️ Fake Document Detection System

![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)
![OCR](https://img.shields.io/badge/-Tesseract%20OCR-4285F4?style=flat-square&logo=googlelens&logoColor=white)

A document authentication system that detects forged or manipulated files using OCR-driven pattern analysis and data structure–based validation techniques.

---

## 📖 Overview

Fraudulent and tampered documents are hard to catch by eye. This project extracts text and structural data from uploaded documents via OCR, then applies pattern analysis and validation rules to flag inconsistencies that indicate forgery or manipulation — surfaced through a clean React interface for upload and result review.

## ✨ Features

- **Secure document upload** through a React.js frontend
- **OCR-based text extraction** to pull structured content from scanned/uploaded documents
- **Pattern analysis & validation** to detect forged, altered, or manipulated fields
- **Result visualization** highlighting flagged inconsistencies and confidence indicators
- **REST API backend** separating detection logic from the client for easy extension

## 🏗️ Architecture

```
Fake-Document-Detection-System/
├── client/              # React + Vite frontend (upload & results UI)
└── server/              # Node.js + Express backend
    ├── controllers/     # Request handling & detection orchestration
    ├── middleware/       # Upload handling, auth, error handling
    ├── models/           # MongoDB schemas
    ├── routes/           # REST API endpoints
    ├── utils/            # Helper utilities
    └── eng.traineddata   # Tesseract OCR language data
```

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Database | MongoDB |
| OCR Engine | Tesseract |
| Core Concepts | C++, DSA, pattern-based validation |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance (local or hosted)

### Installation

```bash
git clone https://github.com/vivekk2005/Fake-Document-Detection-System.git
cd Fake-Document-Detection-System

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Running the app

```bash
# Start the backend
cd server && npm start

# In a separate terminal, start the frontend
cd client && npm run dev
```

Open the printed local URL in your browser to upload a document and view the authentication results.

## 🎯 Use Case

Built to demonstrate practical application of cybersecurity and data-structure concepts to real-world document integrity verification and fraud detection — useful for ID verification, certificate validation, and similar authenticity checks.

## 👤 Author

**Vivek K**
[GitHub](https://github.com/vivekk2005) · [LinkedIn](https://linkedin.com/in/vivekkannoth) · vivekkannoth5678@gmail.com
