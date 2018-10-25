const expect = require('chai').expect;
const fs = require('mz/fs');
const {pdfToImage} = require('../PDF2Image');
const fileType = require("file-type")

describe('PDF2Image', function () {
    describe('pdfToImage', function () {
        it('should produce a JPG for a PDF', async function () {
            const pdf = await fs.readFile('test/portrait-singlepage.pdf');
            const img = await pdfToImage(pdf, 'jpg', 50);
            // Check image type
            expect(fileType(img).ext).to.equal('jpg');
        });
        it('should produce a PNG for a PDF', async function () {
            const pdf = await fs.readFile('test/portrait-singlepage.pdf');
            const img = await pdfToImage(pdf, 'png', 50);
            // Check image type
            expect(fileType(img).ext).to.equal('png');
        });
        it('a larger DPI value should produce larger files', async function () {
            const pdf = await fs.readFile('test/portrait-singlepage.pdf');
            const img30 = await pdfToImage(pdf, 'png', 30);
            const img100 = await pdfToImage(pdf, 'png', 100);
            // Check image type
            expect(img100.length).to.be.greaterThan(img30.length);
        });
    });
});
