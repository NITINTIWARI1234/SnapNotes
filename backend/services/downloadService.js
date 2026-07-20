const ytdlp = require("yt-dlp-exec");
const path = require("path");
const fs = require("fs");

const COOKIE_PATH = path.join(__dirname, "../cookies.txt");
const DENO_PATH = path.join(__dirname, "../deno/bin/deno");

if (process.env.YT_COOKIES_B64 && !fs.existsSync(COOKIE_PATH)) {
    fs.writeFileSync(COOKIE_PATH, Buffer.from(process.env.YT_COOKIES_B64, "base64"));
}

async function downloadVideo(url) {
    const outputPath = path.join(__dirname, "../temp/video.%(ext)s");
    const options = { output: outputPath };

    if (fs.existsSync(COOKIE_PATH)) {
        options.cookies = COOKIE_PATH;
    }
    if (fs.existsSync(DENO_PATH)) {
        options.jsRuntimes = `deno:${DENO_PATH}`;
        options.remoteComponents = "ejs:github";
    }
    if (process.env.YT_PROXY) {
        options.proxy = process.env.YT_PROXY;
    }

    await ytdlp(url, options);
    return path.join(__dirname, "../temp");
}

module.exports = {
    downloadVideo,
};