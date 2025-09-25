import { genAI } from './geminiClient'

export function buildRepoContext({ meta, languages, files }) {
  const langSummary = languages ? Object.entries(languages).map(([k,v]) => `${k}:${v}`).join(', ') : 'unknown'
  const fileList = files.map(f => `- ${f.path} (${f.content.length} chars)`).join('\n')
  const trimmedFiles = files.map(f => `FILE: ${f.path}\n\n${truncate(f.content, 4000)}`).join('\n\n---\n\n')
  return `Repository: ${meta.full_name}\nDescription: ${meta.description || 'N/A'}\nDefault branch: ${meta.default_branch}\nLanguages: ${langSummary}\n\nImportant files:\n${fileList}\n\nContents (truncated):\n${trimmedFiles}`
}

function truncate(str, max) {
  if (!str) return ''
  return str.length > max ? str.slice(0, max) + `\n... [truncated ${str.length - max} chars]` : str
}

export async function generateTestCasesFromRepo(context) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' })
  const prompt = `You are a senior QA engineer and language-aware test author. Analyze the repository context below and produce:\n\n1) A high-level test plan organized by components/modules and user flows.\n2) A prioritized list of edge cases and negative tests.\n3) Concrete unit test cases with inputs/outputs for critical functions.\n4) Integration/e2e scenarios.\n5) Example test snippets in the dominant language and likely framework (e.g., Jest for JS/TS, PyTest for Python, JUnit for Java, Go test, RSpec, etc.).\n\nGuidelines:\n- Use clear headings and bullet points.\n- When providing sample tests, include runnable code blocks in the detected language.\n- Map test cases to files/functions when you can infer them.\n- Consider configuration, API interactions, and async flows.\n\nContext:\n${context}`
  const res = await model.generateContent(prompt)
  return res.response.text()
}

export async function generateSRSFromRepo(context) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' })
  const prompt = `You are an IEEE SRS expert. Using ONLY the repository context below, derive a comprehensive SRS in Markdown. Infer goals, actors, features, APIs, data models, constraints, and non-functional requirements from code, README, configs, and routes. Be explicit, structured, and avoid placeholders.\n\nContext:\n${context}`
  const res = await model.generateContent(prompt)
  return res.response.text()
}
