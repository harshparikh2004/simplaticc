import React, { useState } from 'react'
import '../index.css'
import {
  parseRepoUrl,
  fetchRepoMeta,
  fetchRepoLanguages,
  fetchRepoTree,
  fetchFileText,
  selectInterestingFiles
} from '../utils/github'
import toast, { Toaster } from 'react-hot-toast'

export default function AnalyzeRepo() {
  const [repoUrl, setRepoUrl] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState('')

  const run = async () => {
    try {
      setLoading(true)
      setOutput('')

      const { owner, repo } = parseRepoUrl(repoUrl)
      const meta = await fetchRepoMeta(owner, repo, token || undefined)
      const languages = await fetchRepoLanguages(owner, repo, token || undefined)
      const tree = await fetchRepoTree(owner, repo, meta.default_branch, token || undefined)
      const paths = selectInterestingFiles(tree, 28, 150_000)

      const files = []
      for (const p of paths) {
        try {
          const content = await fetchFileText(owner, repo, meta.default_branch, p, token || undefined)
          files.push({ name: p, content })
        } catch (e) {
          console.warn('Skipping file:', p, e?.message)
        }
      }

      if (files.length === 0) throw new Error('No readable files found in repo.')

      // ✅ Stream response from backend
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files })
      })

      if (!response.ok) throw new Error('Backend failed to process request')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let text = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        text += chunk
        setOutput(prev => prev + chunk) // live update
      }

      toast.success('Repository analysis complete ✅')
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Failed to analyze repository')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="lg:max-w-[1100px] w-full mx-auto mt-40 px-6 pb-24">
      <Toaster />
      <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Syne' }}>
        Analyze GitHub Repository
      </h1>

      <p className="text-gray-700 mb-6" style={{ fontFamily: 'Quicksand' }}>
        Enter a GitHub repository URL. Optionally add a GitHub token to increase rate limits.
        We’ll fetch and sample the codebase to generate structured documentation using your local Ollama model.
      </p>

      <div className="space-y-3 bg-white border rounded-xl p-4 shadow-sm">
        <input
          className="w-full border rounded-lg p-2"
          placeholder="https://github.com/owner/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={loading}
        />
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Optional: GitHub token (scopes: public_repo)"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={run}
          disabled={loading || !repoUrl}
          className="px-5 py-2 rounded-lg bg-[#303030] text-white hover:rounded-xl transition-all"
        >
          {loading ? 'Analyzing...' : 'Analyze Repository'}
        </button>
      </div>

      {output && (
        <section className="border rounded-xl bg-white p-4 shadow-sm mt-8">
          <h2 className="text-xl font-semibold mb-2">AI Output</h2>
          <div className="prose max-w-none whitespace-pre-wrap text-sm overflow-auto max-h-[70vh]">
            {output}
          </div>
        </section>
      )}

      <p className="text-xs text-gray-500 mt-4">
        Note: Make sure your <code>Ollama</code> server and Node backend
        (<code>http://localhost:5000</code>) are running before analysis.
      </p>
    </main>
  )
}
