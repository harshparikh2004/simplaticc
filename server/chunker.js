const tiktoken = require("js-tiktoken");
const enc = tiktoken.encodingForModel("gpt-3.5-turbo");

function chunkText(text, maxTokens = 2500) {
    const tokens = enc.encode(text);
    const chunks = [];
    for (let i = 0; i < tokens.length; i += maxTokens) {
        chunks.push(enc.decode(tokens.slice(i, i + maxTokens)));
    }
    return chunks;
}

module.exports = { chunkText };
