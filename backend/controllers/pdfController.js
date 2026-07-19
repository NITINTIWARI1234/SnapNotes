const { getVideoMetadata } = require("../services/youtubeService");

const generatePdf = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "YouTube URL is required.",
            });
        }

        const metadata = await getVideoMetadata(url);

        return res.status(200).json({
            success: true,
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