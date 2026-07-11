const fs = require('fs');
const path = require('path');

// Read PNG dimensions
const filepath = path.join(__dirname, '../public/images/partner_logos.png');
const buffer = fs.readFileSync(filepath);

const width = buffer.readUInt32BE(16);
const height = buffer.readUInt32BE(20);

console.log(`${width}x${height}`);
