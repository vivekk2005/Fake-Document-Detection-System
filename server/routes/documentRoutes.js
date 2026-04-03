const express = require("express");
const router = express.Router();

const {
  uploadDocument,
  getDocuments,
} = require("../controllers/documentController");

const upload = require("../middleware/uploadMiddleware");

router.post("/upload", upload.single("document"), uploadDocument);
router.get("/all", getDocuments);

module.exports = router;