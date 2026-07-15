const { isValidYoutubeUrl } = require("../utils/validator");
const { getVideoMetadata } = require("../services/youtubeService");

const generatePdf = async (req, res) => {
  try {
    const { url } = req.body;

    // Check if URL is provided
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "YouTube URL is required.",
      });
    }

    // Validate YouTube URL
    if (!isValidYoutubeUrl(url)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid YouTube URL.",
      });
    }

    // Get video metadata
    const metadata = await getVideoMetadata(url);

    return res.status(200).json({
      success: true,
      message: "Video metadata fetched successfully.",
      data: metadata,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generatePdf,
};