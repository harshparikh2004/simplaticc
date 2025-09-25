import pako from 'pako';

function encode6bit(b) {
    if (b < 10) return String.fromCharCode(48 + b); // 0–9
    b -= 10;
    if (b < 26) return String.fromCharCode(65 + b); // A–Z
    b -= 26;
    if (b < 26) return String.fromCharCode(97 + b); // a–z
    b -= 26;
    if (b === 0) return '-';
    if (b === 1) return '_';
    return '?';
}

function append3bytes(b1, b2, b3) {
    const c1 = b1 >> 2;
    const c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
    const c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
    const c4 = b3 & 0x3F;
    return (
        encode6bit(c1 & 0x3F) +
        encode6bit(c2 & 0x3F) +
        encode6bit(c3 & 0x3F) +
        encode6bit(c4 & 0x3F)
    );
}

export const encodePlantUML = (text) => {
    const deflated = pako.deflate(text, { level: 9 });
    let result = '';
    for (let i = 0; i < deflated.length; i += 3) {
        if (i + 2 === deflated.length) {
            result += append3bytes(deflated[i], deflated[i + 1], 0);
        } else if (i + 1 === deflated.length) {
            result += append3bytes(deflated[i], 0, 0);
        } else {
            result += append3bytes(deflated[i], deflated[i + 1], deflated[i + 2]);
        }
    }
    return result;
};
