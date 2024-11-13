const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/heros');
const destination = path.resolve(__dirname, 'src/public/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

fs.readdirSync(target)
  .forEach(image => {
    if (image === 'hero-image_2.jpg') {
      // Mobile version
      sharp(`${target}/${image}`)
        .resize(480)  // ukuran untuk mobile
        .toFile(path.resolve(destination, 'hero-image_2-small.jpg'));

      // Desktop version
      sharp(`${target}/${image}`)
        .resize(1200) // ukuran untuk desktop
        .toFile(path.resolve(destination, 'hero-image_2-large.jpg'));
    }
  });