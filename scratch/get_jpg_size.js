const fs = require('fs');
const path = require('path');

function getJpegSize(filepath) {
  const buffer = fs.readFileSync(filepath);
  let i = 2; // skip SOI marker
  while (i < buffer.length) {
    const marker = buffer.readUInt16BE(i);
    i += 2;
    if (marker === 0xFFD8) continue; // SOI
    if (marker === 0xFFD9 || marker === 0xFFDA) break; // EOI, SOS
    const length = buffer.readUInt16BE(i);
    if (marker >= 0xFFC0 && marker <= 0xFFC3) {
      const height = buffer.readUInt16BE(i + 3);
      const width = buffer.readUInt16BE(i + 5);
      return { width, height };
    }
    i += length;
  }
  return null;
}

const filepath = path.join(__dirname, '../public/images/partner_logos.jpg');
console.log(getJpegSize(filepath));
