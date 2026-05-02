/* eslint-disable @typescript-eslint/no-require-imports */
// Generate PWA icons for CredBusiness
// Run: node public/icons/generate-icons.js

const fs = require('fs');
const path = require('path');

function createSVG(size, maskable = false) {
  const padding = maskable ? size * 0.1 : 0;
  const iconSize = size - padding * 2;
  const cx = size / 2;
  const cy = size / 2;
  const fontSize = Math.round(iconSize * 0.3);
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00A650"/>
      <stop offset="58%" stop-color="#008D58"/>
      <stop offset="100%" stop-color="#0F2F2A"/>
    </linearGradient>
  </defs>
  ${maskable
    ? `<rect width="${size}" height="${size}" fill="url(#bg)" rx="${size * 0.2}"/>`
    : `<rect width="${size}" height="${size}" fill="url(#bg)" rx="${size * 0.22}"/>`
  }
  <text x="${cx}" y="${cy + fontSize * 0.28}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="800">CB</text>
</svg>`;
}

const sizes = [192, 512];
const variants = [false, true]; // normal, maskable

for (const size of sizes) {
  for (const maskable of variants) {
    const filename = maskable ? `icon-maskable-${size}.svg` : `icon-${size}.svg`;
    const svg = createSVG(size, maskable);
    fs.writeFileSync(path.join(__dirname, filename), svg);
    console.log(`Created ${filename}`);
  }
}

console.log('\nNote: For production, convert SVGs to PNG using a tool like Sharp or Inkscape.');
console.log('For now, update manifest.json to reference .svg files or convert manually.');
