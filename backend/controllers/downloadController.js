const fs = require("fs");
const path = require("path");

const { downloadVideo } = require("../services/downloadService");
const { extractScreenshots } = require("../services/screenshotService");

const downloadVideoController = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "YouTube URL is required.",
            });
        }

        // Download video
        const downloadFolder = await downloadVideo(url);

        // Find downloaded video
        const files = fs.readdirSync(downloadFolder);

        const videoFile = files.find(
            (file) =>
                file.endsWith(".mp4") ||
                file.endsWith(".webm") ||
                file.endsWith(".mkv")
        );

        if (!videoFile) {
            return res.status(500).json({
                success: false,
                message: "Downloaded video not found.",
            });
        }

        const videoPath = path.join(downloadFolder, videoFile);

        // Extract screenshots
        const screenshotsFolder = await extractScreenshots(videoPath);

        res.status(200).json({
            success: true,
            message: "Video downloaded and screenshots extracted successfully.",
            video: videoFile,
            screenshotsFolder,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    downloadVideoController,
};