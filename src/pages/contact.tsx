export default function Contact() {
  const whatsappNumber = '1234567890' // replace with your number
  const message = encodeURIComponent('Hi! I would like to know more about MusicKatta courses.')
  const waLink = `https://wa.me/${whatsappNumber}?text=${message}`

  return (
    <div className="py-12 max-w-4xl">
      <h1 className="section-title">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <form className="card p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm text-white/70">Name</label>
            <input className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2" placeholder="Your Name" />
          </div>
          <div>
            <label className="text-sm text-white/70">Email</label>
            <input type="email" className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm text-white/70">Message</label>
            <textarea className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 h-28" placeholder="How can we help?" />
          </div>
          <button className="btn btn-primary w-full">Submit</button>
        </form>

        <div className="card p-6">
          <h3 className="font-bold mb-2">WhatsApp</h3>
          <p className="text-white/70">Prefer chatting on WhatsApp? Click below to start.</p>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-outline mt-4 inline-flex">Open WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
