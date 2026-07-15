const generatePdf = (req, res) => {
  res.json({
    success: true,
    message: "PDF generation request received.",
  });
};

module.exports = {
  generatePdf,
};