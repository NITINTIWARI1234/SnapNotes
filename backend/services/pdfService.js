const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function createPdf(imageFolder, videoInfo) {
    return new Promise((resolve, reject) => {

        const pdfPath = path.join(__dirname, "../temp/output.pdf");

        const doc = new PDFDocument({
            autoFirstPage: false,
            margin: 50,
        });

        const stream = fs.createWriteStream(pdfPath);

        doc.pipe(stream);

        // =========================
        // Cover Page
        // =========================

        doc.addPage();

        doc
            .fontSize(30)
            .fillColor("#2563eb")
            .text("SnapNotes", {
                align: "center",
            });

        doc.moveDown();

        doc
            .fontSize(22)
            .fillColor("black")
            .text(videoInfo.title || "Unknown Title", {
                align: "center",
            });

        doc.moveDown(2);

        doc
            .fontSize(16)
            .text(`Channel: ${videoInfo.uploader || "Unknown"}`);

        doc.moveDown();

        const minutes = Math.floor((videoInfo.duration || 0) / 60);
        const seconds = (videoInfo.duration || 0) % 60;

        doc.text(`Duration: ${minutes} min ${seconds} sec`);

        doc.moveDown();

        doc.text(`Generated: ${new Date().toLocaleString()}`);

        // =========================
        // Screenshot Pages
        // =========================

        const images = fs
            .readdirSync(imageFolder)
            .filter(file => file.endsWith(".jpg"))
            .sort();

        images.forEach((image, index) => {

            doc.addPage({
                size: "A4",
                margin: 40,
            });

            // Header
            doc
                .fontSize(18)
                .fillColor("#2563eb")
                .text("SnapNotes", {
                    align: "center",
                });

            doc.moveDown(0.5);

            doc
                .fontSize(14)
                .fillColor("black")
                .text(`Screenshot ${index + 1}`, {
                    align: "center",
                });

            doc.moveDown();

            // Image
            doc.image(
                path.join(imageFolder, image),
                {
                    fit: [500, 620],
                    align: "center",
                    valign: "center",
                }
            );

            doc.moveDown();

            // Footer
            doc
                .fontSize(11)
                .fillColor("gray")
                .text(
                    `Page ${index + 1} of ${images.length}`,
                    {
                        align: "center",
                    }
                );
        });

        doc.end();

        stream.on("finish", () => resolve(pdfPath));
        stream.on("error", reject);
    });
}

module.exports = {
    createPdf,
};