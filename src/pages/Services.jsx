import React from 'react'
import '../index.css'

function Services() {
  const services = [
    {
      title: 'SRS Generation',
      desc: 'Create comprehensive SRS documents with sections, diagrams, and acceptance criteria.',
    },
    {
      title: 'Project Scaffolding',
      desc: 'Kickstart new projects with clear requirements, goals, and user stories.',
    },
    {
      title: 'Versioned Revisions',
      desc: 'Iterate on requirements with traceable updates for transparent collaboration.',
    },
    {
      title: 'Export & Sharing',
      desc: 'Share or export your SRS to your preferred formats and tools.',
    },
  ]

  return (
    <main className="lg:max-w-[1100px] w-full mx-auto mt-40 px-6 pb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Syne' }}>
        Our <span className="text-amber-500" style={{ fontFamily: 'adam' }}>Services</span>
      </h1>
      <div className="grid sm:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <p className="text-gray-600" style={{ fontFamily: 'Quicksand' }}>{s.desc}</p>
            {s.title === 'SRS Generation' && (
              <a href="/analyze-repo" className="inline-block mt-3 px-4 py-2 rounded-lg bg-[#303030] text-white hover:rounded-xl transition-all">Analyze GitHub Repo</a>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Services
