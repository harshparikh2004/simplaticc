// Filter out non-text/binary files and merge all repo content for analysis
const BINARY_EXTENSIONS = [
    ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg",
    ".exe", ".dll", ".zip", ".pdf", ".docx", ".xlsx", ".mp4", ".mp3"
];

export function isTextFile(filename) {
    return !BINARY_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext));
}

// Combine selected text files into one large string
export function prepareRepoData(files) {
    // files: [{ name: "src/App.js", content: "..." }, ...]
    return files
        .filter(f => isTextFile(f.name))
        .map(f => `FILE: ${f.name}\n${f.content}`)
        .join("\n\n");
}
