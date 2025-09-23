import React from 'react'
import '../index.css'

function About() {
  return (
    <main className="lg:max-w-[1100px] w-full mx-auto mt-40 px-6 pb-16">
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Syne' }}>
          About <span className="text-amber-500" style={{ fontFamily: 'adam' }}>Simplatic</span>
        </h1>
        <p className="text-lg leading-relaxed text-gray-700" style={{ fontFamily: 'Quicksand' }}>
          Simplatic streamlines the creation of Software Requirement Specification (SRS) documents for students and teams. 
          By combining modern tooling with automation, it helps you move from idea to a structured, professional SRS quickly 
          and consistently.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Structured Output</h2>
            <p className="text-gray-600" style={{ fontFamily: 'Quicksand' }}>
              Generate sections such as scope, use cases, diagrams, and acceptance criteria using a guided workflow.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Collaboration Ready</h2>
            <p className="text-gray-600" style={{ fontFamily: 'Quicksand' }}>
              Works smoothly alongside shared docs and project tooling so teams can iterate with confidence.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Student Friendly</h2>
            <p className="text-gray-600" style={{ fontFamily: 'Quicksand' }}>
              Clear guidance and templates help you learn best-practice SRS structure while delivering great results.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
