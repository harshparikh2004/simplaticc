// Utilities for fetching and sampling a GitHub repository via REST API
// Works client-side with optional token for higher rate limits

const GH_API_BASE = 'https://api.github.com'

export function parseRepoUrl(input) {
  try {
    const url = new URL(input.trim())
    // Support github.com/{owner}/{repo}[...]
    if (url.hostname !== 'github.com') throw new Error('Not a github.com URL')
    const parts = url.pathname.split('/').filter(Boolean)
    if (parts.length < 2) throw new Error('URL must include owner and repo')
    const [owner, repo] = parts
    return { owner, repo }
  } catch {
    throw new Error('Invalid GitHub repository URL')
  }
}

async function ghFetch(path, token) {
  const res = await fetch(`${GH_API_BASE}${path}`, {
    headers: {
      'Accept': 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`GitHub API ${res.status}: ${text || res.statusText}`)
  }
  return res.json()
}

export async function fetchRepoMeta(owner, repo, token) {
  return ghFetch(`/repos/${owner}/${repo}`, token)
}

export async function fetchRepoLanguages(owner, repo, token) {
  return ghFetch(`/repos/${owner}/${repo}/languages`, token)
}

export async function fetchRepoTree(owner, repo, ref, token) {
  // ref can be a branch name or sha
  return ghFetch(`/repos/${owner}/${repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`, token)
}

export async function fetchFileText(owner, repo, ref, path, token) {
  // Use contents API with raw media type to support auth and CORS
  const url = `${GH_API_BASE}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(ref)}`
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.raw',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`)
  return res.text()
}

export function selectInterestingFiles(tree, maxFiles = 30, maxSize = 120_000) {
  if (!tree || !Array.isArray(tree.tree)) return []
  const exts = new Set(['.md', '.js', '.jsx', '.ts', '.tsx', '.json', '.py', '.rb', '.go', '.java', '.cs', '.php', '.rs', '.kt', '.mjs', '.cjs', '.yml', '.yaml'])
  const deprioritizeDirs = [/node_modules\//, /dist\//, /build\//, /\.next\//, /\.git\//]

  const candidates = tree.tree.filter(n => n.type === 'blob' && (!n.size || n.size <= maxSize))
    .filter(n => exts.has(extname(n.path)) || /readme/i.test(n.path) || /(package\.json|requirements\.txt|pom\.xml|build\.gradle|Cargo\.toml)$/.test(n.path))
    .filter(n => !deprioritizeDirs.some(re => re.test(n.path)))

  // Rank: README/package/configs first, then src files by depth (shallower first)
  const score = (p) => {
    let s = 0
    if (/readme/i.test(p)) s += 100
    if (/package\.json$/.test(p)) s += 90
    if (/(requirements\.txt|pyproject\.toml)$/.test(p)) s += 80
    if (/(pom\.xml|build\.gradle)$/.test(p)) s += 70
    if (/(Cargo\.toml)$/.test(p)) s += 70
    const depth = p.split('/').length
    s += Math.max(0, 20 - depth)
    if (/test|spec/i.test(p)) s += 5
    return s
  }

  return candidates
    .sort((a,b) => score(b.path) - score(a.path))
    .slice(0, maxFiles)
    .map(n => n.path)
}

function extname(p) {
  const i = p.lastIndexOf('.')
  return i >= 0 ? p.slice(i) : ''
}
