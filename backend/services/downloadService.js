const ytdlp = require("yt-dlp-exec");
const path = require("path");

async function downloadVideo(url) {
    const outputPath = path.join(
        __dirname,
        "../temp/video.%(ext)s"
    );

    await ytdlp(url, {
        output: outputPath,
        format: "mp4",
    });

    return path.join(__dirname, "../temp");
}

module.exports = {
    downloadVideo,
};