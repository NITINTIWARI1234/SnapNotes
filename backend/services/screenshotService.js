const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

function extractScreenshots(videoPath) {
    return new Promise((resolve, reject) => {
        const outputFolder = path.join(__dirname, "../temp/screenshots");

        // Create screenshots folder if it doesn't exist
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }

        const outputPattern = path.join(outputFolder, "shot-%03d.jpg");

        const command = `ffmpeg -i "${videoPath}" -vf fps=1/10 "${outputPattern}"`;

        exec(command, (error) => {
            if (error) {
                return reject(error);
            }

            resolve(outputFolder);
        });
    });
}

module.exports = {
    extractScreenshots,
};