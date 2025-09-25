import React, { useState } from 'react'
import '../index.css'
import { parseRepoUrl, fetchRepoMeta, fetchRepoLanguages, fetchRepoTree, fetchFileText, selectInterestingFiles } from '../utils/github'
import { buildRepoContext, generateSRSFromRepo, generateTestCasesFromRepo } from '../utils/generateFromRepo'
import toast, { Toaster } from 'react-hot-toast'

export default function AnalyzeRepo() {
  const [repoUrl, setRepoUrl] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [srs, setSrs] = useState('')
  const [tests, setTests] = useState('')
  const [only, setOnly] = useState({ srs: true, tests: true })

  const run = async () => {
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        toast.error('Missing VITE_GEMINI_API_KEY. Please set it to enable generation.')
        return
      }
      setLoading(true)
      setSrs(''); setTests('')
      const { owner, repo } = parseRepoUrl(repoUrl)
      const meta = await fetchRepoMeta(owner, repo, token || undefined)
      const languages = await fetchRepoLanguages(owner, repo, token || undefined)
      const tree = await fetchRepoTree(owner, repo, meta.default_branch, token || undefined)
      const paths = selectInterestingFiles(tree, 28, 150_000)

      const files = []
      for (const p of paths) {
        try {
          const content = await fetchFileText(owner, repo, meta.default_branch, p, token || undefined)
          files.push({ path: p, content })
        } catch (e) {
          console.warn('Skip file', p, e?.message)
        }
      }

      if (files.length === 0) throw new Error('Could not retrieve any files from the repo')

      const context = buildRepoContext({ meta, languages, files })

      if (only.srs) {
        try { setSrs(await generateSRSFromRepo(context)) } catch (e) { toast.error('SRS generation failed'); console.error(e) }
      }
      if (only.tests) {
        try { setTests(await generateTestCasesFromRepo(context)) } catch (e) { toast.error('Test generation failed'); console.error(e) }
      }
      toast.success('Analysis complete')
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
      <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Syne' }}>Analyze GitHub Repository</h1>
      <p className="text-gray-700 mb-6" style={{ fontFamily: 'Quicksand' }}>Enter a GitHub repository URL. Optionally add a GitHub token to increase rate limits. We will fetch and sample the codebase to generate an SRS and test cases.</p>

      <div className="space-y-3 bg-white border rounded-xl p-4 shadow-sm">
        <input className="w-full border rounded-lg p-2" placeholder="https://github.com/owner/repo" value={repoUrl} onChange={e=>setRepoUrl(e.target.value)} disabled={loading} />
        <input className="w-full border rounded-lg p-2" placeholder="Optional: GitHub token (scopes: public_repo)" value={token} onChange={e=>setToken(e.target.value)} disabled={loading} />
        <div className="flex gap-4 items-center">
          <label className="flex gap-2 items-center"><input type="checkbox" checked={only.srs} onChange={e=>setOnly(o=>({...o, srs:e.target.checked}))} /> <span>Generate SRS</span></label>
          <label className="flex gap-2 items-center"><input type="checkbox" checked={only.tests} onChange={e=>setOnly(o=>({...o, tests:e.target.checked}))} /> <span>Generate Test Cases</span></label>
        </div>
        <button onClick={run} disabled={loading || !repoUrl} className="px-5 py-2 rounded-lg bg-[#303030] text-white hover:rounded-xl transition-all">{loading ? 'Analyzing...' : 'Analyze & Generate'}</button>
      </div>

      {(srs || tests) && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <section className="border rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">SRS</h2>
            <div className="prose max-w-none whitespace-pre-wrap text-sm overflow-auto max-h-[60vh]">{srs || '—'}</div>
          </section>
          <section className="border rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Test Cases</h2>
            <div className="prose max-w-none whitespace-pre-wrap text-sm overflow-auto max-h-[60vh]">{tests || '—'}</div>
          </section>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4">Note: API limits apply. For private repos or higher limits, provide a token.</p>
    </main>
  )
}
