import React, { useState, useEffect } from 'react'
import '../index.css'
import {
  parseRepoUrl,
  fetchRepoMeta,
  fetchRepoLanguages,
  fetchRepoTree,
  selectInterestingFiles
} from '../utils/github'
import toast, { Toaster } from 'react-hot-toast'
import LoaderOverlay from '../components/LoaderOverlay'

export default function AnalyzeRepo() {
  const [repoUrl, setRepoUrl] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [output, setOutput] = useState('')
  const [geminiOutput, setGeminiOutput] = useState('') // 🧠 NEW: Gemini-generated SRS
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)

  useEffect(() => {
    if (loading && remainingTime > 0) {
      const interval = setInterval(() => setRemainingTime(t => Math.max(t - 1, 0)), 1000)
      return () => clearInterval(interval)
    }
  }, [loading, remainingTime])

  // 🧠 Existing offline Ollama workflow (unchanged)
  const run = async () => {
    try {
      setLoading(true)
      setOutput('')
      setStreaming(false)
      setEstimatedTime(0)
      setRemainingTime(0)

      const { owner, repo } = parseRepoUrl(repoUrl)
      const meta = await fetchRepoMeta(owner, repo, token || undefined)
      const languages = await fetchRepoLanguages(owner, repo, token || undefined)
      const tree = await fetchRepoTree(owner, repo, meta.default_branch, token || undefined)
      const paths = selectInterestingFiles(tree, 28, 150_000)

      if (paths.length === 0) throw new Error('No files found in repo.')

      const estimatedSeconds = Math.ceil(paths.length * 0.3)
      setEstimatedTime(estimatedSeconds)
      setRemainingTime(estimatedSeconds)
      await new Promise((r) => setTimeout(r, 700))

      setLoading(false)
      setStreaming(true)

      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoName: repo,
          owner,
          fileList: paths.map((p) => ({
            name: p,
            extension: p.split('.').pop(),
            folder: p.includes('/') ? p.split('/').slice(0, -1).join('/') : '',
          })),
          languages,
          defaultBranch: meta.default_branch,
        }),
      })

      if (!response.ok) throw new Error('Backend failed to process request')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setOutput(prev => prev + chunk)
      }

      setStreaming(false)
      toast.success('Repository analysis complete ✅')
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Failed to analyze repository')
      setLoading(false)
      setStreaming(false)
    }
  }

  // 🧩 NEW: Online Gemini SRS generation
  const generateGeminiSRS = async () => {
    try {
      if (!repoUrl) return toast.error('Enter a valid GitHub repository URL first.')

      const { owner, repo } = parseRepoUrl(repoUrl)
      toast.loading('Fetching repository context...', { id: 'gemini' })

      const response = await fetch('http://localhost:5000/generateSRSOnline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoOwner: owner,
          repoName: repo,
          authToken: token || null,
          projectTitle: repo,
          projectDescription: `Automatically generated SRS for the repository ${repo}.`,
          techStack: 'Auto-detected from repository metadata',
          diagramTypes: ['Use Case', 'ERD', 'DFD', 'Class Diagram', 'Activity Diagram']
        })
      })

      toast.dismiss('gemini')
      if (!response.ok) throw new Error('Gemini API request failed.')

      const data = await response.json()
      setGeminiOutput(data.srs)
      toast.success('Gemini SRS generated successfully ✅')
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Failed to generate SRS via Gemini')
    }
  }

  return (
    <main className="relative lg:max-w-[1100px] w-full mx-auto mt-40 px-6 pb-24">
      <Toaster />
      <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Syne' }}>
        Analyze GitHub Repository
      </h1>

      <p className="text-gray-700 mb-6" style={{ fontFamily: 'Quicksand' }}>
        Enter a GitHub repository URL. Add a GitHub token to increase rate limits.
        You can analyze the repo locally (Ollama) or generate a formal IEEE 830 SRS using Gemini online.
      </p>

      <div className="space-y-3 bg-white border rounded-xl p-4 shadow-sm relative">
        <input
          className="w-full border rounded-lg p-2"
          placeholder="https://github.com/owner/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={loading || streaming}
        />
        <input
          className="w-full border rounded-lg p-2"
          placeholder="GitHub token (scopes: public_repo)"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          disabled={loading || streaming}
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={run}
            disabled={loading || streaming || !repoUrl}
            className="flex-1 px-5 py-2 rounded-lg bg-[#303030] text-white hover:rounded-xl transition-all"
          >
            {loading ? 'Preparing...' : streaming ? 'Analyzing...' : 'Analyze Repository (Offline)'}
          </button>

          {/* 🧠 NEW BUTTON for Gemini */}
          <button
            onClick={generateGeminiSRS}
            disabled={loading || streaming || !repoUrl}
            className="flex-1 px-5 py-2 rounded-lg bg-[#0b5ed7] text-white hover:rounded-xl transition-all"
          >
            Generate SRS (Online Gemini)
          </button>
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-8" style={{ fontFamily: 'Quicksand' }}>
        *You can generate the GitHub token from your GitHub account settings under Developer Settings in Personal Access Tokens.
      </p>

      {output && (
        <section className="border rounded-xl bg-white p-4 shadow-sm mt-8">
          <h2 className="text-xl font-semibold mb-2">Offline Model Output (Ollama)</h2>
          <div className="prose max-w-none whitespace-pre-wrap text-sm overflow-auto max-h-[70vh]">
            {output}
          </div>
        </section>
      )}

      {geminiOutput && (
        <section className="border rounded-xl bg-white p-4 shadow-sm mt-8">
          <h2 className="text-xl font-semibold mb-2">Online Gemini SRS Output</h2>
          <div className="prose max-w-none whitespace-pre-wrap text-sm overflow-auto max-h-[70vh]">
            {geminiOutput}
          </div>
        </section>
      )}

      <LoaderOverlay
        isActive={loading}
        title="Analyzing your GitHub Repository..."
        subtitle={`Estimated time: ${remainingTime > 0
          ? `${remainingTime}s remaining`
          : estimatedTime
            ? 'Finalizing setup...'
            : 'Preparing repository structure...'}`}
      />
    </main>
  )
}


