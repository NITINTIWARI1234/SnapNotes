const express = require("express");

const router = express.Router();

// Import PDF metadata controller
const { generatePdf } = require("../controllers/pdfController");

// Import download controller
const {
    downloadVideoController,
} = require("../controllers/downloadController");

// Fetch YouTube metadata
router.post("/generate", generatePdf);

// Download YouTube video
router.post("/download", downloadVideoController);

module.exports = router;