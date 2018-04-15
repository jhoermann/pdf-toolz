const expect = require('chai').expect;
const fs = require('mz/fs');
const {readPDFPageSizes, PageSize} = require('../PageSizes');

describe('PageSize', function () {
    describe('readPDFPageSizes', function () {
        it('should read correct page sizes for portrait single page', async function () {
            const pdf = await fs.readFile('test/portrait-singlepage.pdf');
            const pageSizes = await readPDFPageSizes(pdf);
            expect(pageSizes).to.deep.equal([new PageSize(595, 842)]);
        });
        it('should read correct page sizes for landscape single page', async function () {
            const pdf = await fs.readFile('test/landscape-singlepage.pdf');
            const pageSizes = await readPDFPageSizes(pdf);
            expect(pageSizes).to.deep.equal([new PageSize(842, 595)]);
        });
        it('should read correct page sizes for portrait multi page', async function () {
            const pdf = await fs.readFile('test/portrait-multipage.pdf');
            const pageSizes = await readPDFPageSizes(pdf);
            expect(pageSizes).to.deep.equal([
                new PageSize(595, 842),
                new PageSize(595, 842),
                new PageSize(595, 842)
            ]);
        });
        it('should read correct page sizes for landscape multi page', async function () {
            const pdf = await fs.readFile('test/landscape-multipage.pdf');
            const pageSizes = await readPDFPageSizes(pdf);
            expect(pageSizes).to.deep.equal([
                new PageSize(842, 595),
                new PageSize(842, 595),
                new PageSize(842, 595)
            ]);
        });
    });
});