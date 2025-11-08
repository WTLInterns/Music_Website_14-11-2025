import Link from 'next/link'
import { FaYoutube, FaInstagram } from 'react-icons/fa'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 glass bg-gradient-to-b from-black/40 to-black/10">
      <div className="container-px mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-brand-600 grid place-content-center font-black">MK</div>
              <span className="text-lg font-black tracking-wide">MusicKatta</span>
            </Link>
            <nav className="hidden md:flex items-center gap-5">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/courses', label: 'Courses' },
                { href: '/live-classes', label: 'Live Classes' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="nav-link relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-brand-500 after:to-pink-500 after:transition-all hover:after:w-full">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a className="nav-link" href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube className="h-5 w-5 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] hover:scale-110 transition-transform" />
            </a>
            <a className="nav-link" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram className="h-5 w-5 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] hover:scale-110 transition-transform" />
            </a>
            <button className="md:hidden ml-2 p-2 rounded bg-white/5 border border-white/10" onClick={() => setOpen(!open)} aria-label="Menu">
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white mb-1" />
              <div className="w-5 h-0.5 bg-white" />
            </button>
          </div>
        </div>
        {open && (
          <nav className="md:hidden pb-4">
            <div className="mt-2 grid gap-2">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/about" className="nav-link">About Us</Link>
              <Link href="/courses" className="nav-link">Courses</Link>
              <Link href="/live-classes" className="nav-link">Live Classes</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
