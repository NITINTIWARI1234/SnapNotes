const path = require("path");
const fs = require("fs");

const { downloadVideo } = require("../services/downloadService");
const { extractScreenshots } = require("../services/screenshotService");
const { createPdf } = require("../services/pdfService");
const { getVideoMetadata } = require("../services/youtubeService");

const downloadVideoController = async (req, res) => {
    try {
        console.log("\n========== NEW PDF REQUEST ==========");

        const { url } = req.body;

        console.log("URL:", url);

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "YouTube URL is required.",
            });
        }

        // STEP 1
        console.log("\nSTEP 1: Fetching metadata...");
        const metadata = await getVideoMetadata(url);
        console.log("✓ Metadata:", metadata);

        // STEP 2
        console.log("\nSTEP 2: Downloading video...");
        const downloadFolder = await downloadVideo(url);
        console.log("✓ Download folder:", downloadFolder);

        // STEP 3
        const files = fs.readdirSync(downloadFolder);

        console.log("Files in temp folder:", files);

        const videoFile = files.find(
            (file) =>
                file.endsWith(".mp4") ||
                file.endsWith(".webm") ||
                file.endsWith(".mkv")
        );

        if (!videoFile) {
            throw new Error("Downloaded video not found.");
        }

        console.log("✓ Video file:", videoFile);

        const videoPath = path.join(downloadFolder, videoFile);

        // STEP 4
        console.log("\nSTEP 4: Extracting screenshots...");
        const screenshotsFolder = await extractScreenshots(videoPath);

        console.log("✓ Screenshot folder:", screenshotsFolder);

        // STEP 5
        console.log("\nSTEP 5: Creating PDF...");
        const pdfPath = await createPdf(
            screenshotsFolder,
            metadata
        );

        console.log("✓ PDF created:", pdfPath);

        const safeFileName = (metadata.title || "SnapNotes")
            .replace(/[<>:"/\\|?*]/g, "")
            .trim();

        // STEP 6
        console.log("\nSTEP 6: Sending PDF...");

        res.download(pdfPath, `${safeFileName}.pdf`, (err) => {

            if (err) {
                console.error("Download Error:", err);
                return;
            }

            console.log("✓ PDF downloaded");

            // Cleanup
            if (fs.existsSync(pdfPath)) {
                fs.unlinkSync(pdfPath);
            }

            if (fs.existsSync(videoPath)) {
                fs.unlinkSync(videoPath);
            }

            if (fs.existsSync(screenshotsFolder)) {
                fs.readdirSync(screenshotsFolder).forEach((file) => {
                    fs.unlinkSync(path.join(screenshotsFolder, file));
                });

                fs.rmdirSync(screenshotsFolder);
            }

            console.log("✓ Temporary files deleted");
        });

    } catch (error) {
        console.error("\n========== DOWNLOAD ERROR ==========");
        console.error(error);
        console.error("====================================\n");

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    downloadVideoController,
};