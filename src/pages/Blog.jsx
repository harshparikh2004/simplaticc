import React from 'react'
import '../index.css'

export default function Blog() {
  return (
    <main className="lg:max-w-[1100px] w-full mx-auto mt-40 px-6 pb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Syne' }}>Blog</h1>
      <p className="text-lg text-gray-700" style={{ fontFamily: 'Quicksand' }}>
        Insights, updates, and best practices from the Simplatic team.
      </p>
    </main>
  )
}
