import React, { useState } from 'react'
import '../index.css'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    setSubmitted(true)
  }

  return (
    <main className="lg:max-w-[900px] w-full mx-auto mt-40 px-6 pb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Syne' }}>
        Contact <span className="text-amber-500" style={{ fontFamily: 'adam' }}>Us</span>
      </h1>

      {submitted ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
          Thank you for reaching out! We will get back to you shortly.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={5}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="How can we help?"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2 rounded-lg bg-[#303030] text-white hover:rounded-xl transition-all">
              Send Message
            </button>
          </div>
          <p className="text-sm text-gray-500" style={{ fontFamily: 'Quicksand' }}>
            Prefer email? Write to us at <a className="underline" href="mailto:hello@simplatic.app">hello@simplatic.app</a>.
          </p>
        </form>
      )}
    </main>
  )
}

export default Contact
