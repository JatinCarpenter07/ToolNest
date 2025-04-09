const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function getPdfPageCount(pdfPath) {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    return pdfDoc.getPageCount();
}

module.exports = { getPdfPageCount };