export async function generateSRSFromRepo(contextChunks) {
  const MODEL = 'mistral:7b-instruct';
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
You are an expert software analyst. Generate the SRS Section for this part of the project context.
Focus on:
- Functional & Non-functional requirements
- Key modules and interactions
- Design assumptions

Part ${i + 1} Context:
${chunk}
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
