import React from 'react'
import '../../index.css'

export default function HelpCenter() {
  return (
    <main className="lg:max-w-[900px] w-full mx-auto mt-40 px-6 pb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Syne' }}>Help Center</h1>
      <p className="text-lg text-gray-700" style={{ fontFamily: 'Quicksand' }}>
        FAQs, troubleshooting, and support resources.
      </p>
    </main>
  )
}
