const gm = require('gm');
const {requireNativeExecutableSync} = require('require-native-executable');

requireNativeExecutableSync('gm');

async function pdfToImage (pdfBuf, imgtype = 'jpg', dpi = 200) {
   return new Promise((resolve, reject) => {
      gm(pdfBuf)
         .density(dpi,dpi)
         .quality(95)
         .toBuffer(imgtype, function (err, buffer) {
            if (err) reject('Error generating pdf preview pic: ' + err);
            let img = Buffer.from(buffer, 'binary');
            resolve(img);
         });
   });
}

// test().then(console.log).catch(console.error);

module.exports = {
    pdfToImage: pdfToImage
};
