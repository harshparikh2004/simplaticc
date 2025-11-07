export async function generateSRSFromRepo(contextChunks) {
  const MODEL = 'phi3:mini';
  const chunkLimit = 3000;

  // If contextChunks is a long string, split it
  const chunks = [];
  for (let i = 0; i < contextChunks.length; i += chunkLimit) {
    chunks.push(contextChunks.slice(i, i + chunkLimit));
  }

  console.log(`🧾 Generating partial SRS sections (${chunks.length} parts)...`);

  const partialSRS = [];

  for (const [i, chunk] of chunks.entries()) {
    const prompt = `
You are a professional software analyst. Analyze the following **source code chunk**
from a larger GitHub project. Summarize only what can be inferred from this chunk:
- What functionality does this code implement?
- Which files or components are involved?
- Any UI, API, or logic hints?

Avoid assumptions beyond this chunk. Focus on clear, factual description.

### Code Chunk:
${context}
`;
    const result = await callOllama(MODEL, prompt);
    partialSRS.push(`\n\n## Part ${i + 1} SRS\n${result}`);
  }

  // Combine partial SRS sections into final summarized SRS
  const mergePrompt = `
Combine the following partial SRS sections into a single, cohesive IEEE-style Software Requirements Specification document.

${partialSRS.join('\n')}
`;

  console.log("🧩 Merging partial SRS sections...");
  const finalSRS = await callOllama(MODEL, mergePrompt);
  return finalSRS;
}
