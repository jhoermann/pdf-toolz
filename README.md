# pdf-toolz
NodeJS PDF utilities. Requires NodeJS 7+ due to *async/await* support

## Installation

> npm install mz pdf-toolz


### Install external dependencys
* ImageMagick => needed for PDF2Image
* pdftk => needed for SplitCombine

> sudo apt install imagemagick

> sudo apt install pdftk

An Error will be thrown if they are not present.


## Usage

### Reading PDF page sizes

```js
const fs = require('mz/fs');
const {readPDFPageSizes} = require('pdf-toolz/PageSizes');

async function readPageSizes() {
    const pdf = await fs.readFile('test/portrait-singlepage.pdf');
    const pageSizes = await pdfPageSizes(pdf);
    console.log(pageSizes); // [PageSize(842, 595)]);
}

readPageSizes()
```

### Converting PDF to image

```js
const fs = require('mz/fs');
const {pdfToImage} = require('pdf-toolz/PDF2Image');

async function exportPageImages() {
    const pdf = await fs.readFile('test/portrait-singlepage.pdf');
    const img = await pdfToImage(pdf, 'png', 400 /* dpi */);
    // Export the page image
    await fs.writeFile("image.png", img);
}

exportPageImages()
```

### Splitting a PDF into pages (i.e. one PDF per page)

```js
const fs = require('mz/fs');
const {splitPDF} = require('pdf-toolz/SplitCombine');

async function splitPDFIntoPages() {
    const pdf = await fs.readFile('test/portrait-multipage.pdf');
    const pages = await splitPDF(pdf);
    // Export the page images
    await fs.writeFile("page-1.pdf", pages[0]);
    await fs.writeFile("page-2.pdf", pages[1]);
    await fs.writeFile("page-3.pdf", pages[2]);
}

splitPDFIntoPages()
```

### Combining (appending/joining/concatenating) multiple PDFs into one

```js
const fs = require('mz/fs');
const {combinePDF} = require('pdf-toolz/SplitCombine');

async function combinePDFs() {
    // Read two PDFs to be combined
    const pdf1 = await fs.readFile('test/portrait-singlepage.pdf');
    const pdf2 = await fs.readFile('test/landscape-singlepage.pdf');
    const combined = await combinePDF([pdf1, pdf2]);
    // Write output file
    await fs.writeFile('combined.pdf', combined);
}

combinePDFs()
```


## Testing

> npm test
