const crypto = require('crypto');
const Canvas = require('canvas');
const fs = require('fs');
const HSLtoRGB = require('./HSLtoRGB');

// console.log(crypto.getHashes());

let text, size = 420;

const targetDirPath = './assets';
if (!fs.existsSync(targetDirPath)) {
	fs.mkdirSync(targetDirPath);
}
const files = fs.readdirSync(targetDirPath);
if (!files.length) {
	text = 'sample1';

} else {
	let i = Number(files.slice(-1)[0].match(/\d+/));
	text = `sample${i + 1}`;
}

function generateColor(str) {
    let H = parseInt('0x'+str.slice(0, 3)) * (360 / 4095);
    let S = 65 - parseInt('0x'+str.slice(3, 5)) * (20 / 255);
    let L = 75 - parseInt('0x'+str.slice(5)) * (20 / 255);

    return HSLtoRGB(H, S, L);
};

function generateIcon(str, size) {
    const hash = crypto.createHash('sha1').update(str).digest('hex');
    const canvas = Canvas.createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    const targetStr = hash.slice(0, 28);
    const rgb = generateColor(hash.slice(-7));
    let x = 0, y = 0, col = 1, block = size / 7;

    for (const elm of targetStr) {
        const isDrawing = elm.charCodeAt() % 2 == 0;
        ctx.fillStyle = isDrawing ? `rgb(${rgb.join(',')})` : 'rgb(255, 255, 255)';
        ctx.fillRect(x, y, block, block);
        if (col < 4) {
            ctx.fillRect(size - block * col, y, block, block);
        }
    
        if (y < (size - block)) {
            y += block;
    
        } else {
            y = 0;
            x += block;
            col += 1;
        }
    }
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`./assets/${text}.png`, buffer);
};
generateIcon(text, size);
