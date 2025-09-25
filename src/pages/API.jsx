import React from 'react'
import '../index.css'

export default function API() {
  return (
    <main className="lg:max-w-[1100px] w-full mx-auto mt-40 px-6 pb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Syne' }}>API</h1>
      <p className="text-lg text-gray-700" style={{ fontFamily: 'Quicksand' }}>
        Programmatic access for generating and managing SRS artifacts.
      </p>
    </main>
  )
}
