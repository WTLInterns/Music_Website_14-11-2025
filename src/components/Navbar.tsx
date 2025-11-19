import Link from 'next/link'
import { FaYoutube, FaInstagram } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (userData.isLoggedIn) {
          setIsLoggedIn(true)
          setUser(userData)
        }
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user")
    localStorage.removeItem("userId")
    
    // Update state
    setIsLoggedIn(false)
    setUser(null)
    setIsProfileDropdownOpen(false)
    
    // Redirect to home
    router.push("/")
  }

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  // Navigation links array
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About Us' },
    { href: '/#courses', label: 'Courses' },
    { href: '/#live', label: 'Live Classes' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-40 glass bg-gradient-to-b from-black/40 to-black/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              {/* Logo Image with increased width */}
              <div className="relative h-12  w-32 rounded-lg overflow-hidden p-8 hover:animate-musicPulse transition-all duration-300">
                <Image 
                  src="/images/music1.jpg" 
                  alt="MusicKatta Logo"
                  fill
                  className="osbject-cover"
                  priority
                />
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-white/80 hover:text-white relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-pink-500 after:transition-all hover:after:w-full transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 font-oswald font-semibold tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn && user ? (
              // Show user profile and options when logged in
              <div className="hidden md:flex items-center gap-3">
                {user.profile ? (
                  <img 
                    src={user.profile} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md text-lg">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
                <div className="relative" ref={profileDropdownRef}>
                  <button 
                    onClick={toggleProfileDropdown}
                    className="flex items-center gap-1 text-white focus:outline-none hover:text-blue-200 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link 
                        href="/" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                      </Link>
                      <Link 
                        href="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                      <Link 
                        href="/courses" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        My Learning
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Show login button when not logged in - REDIRECTS TO SEPARATE LOGIN PAGE
              <Link 
                href="/login"
                className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg btn-glow font-oswald font-bold tracking-wide uppercase"
              >
                Login
              </Link>
            )}
            
            <a className="text-white/80 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1" href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube className="h-5 w-5 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.9)] transition-all duration-300 animate-bounceIcon" />
            </a>
            <a className="text-white/80 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram className="h-5 w-5 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.9)] transition-all duration-300 animate-bounceIcon" />
            </a>
            <button className="md:hidden ml-2 p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110 animate-musicPulse" onClick={() => setOpen(!open)} aria-label="Menu">
              <div className="w-5 h-0.5 bg-white mb-1 transition-all duration-300" />
              <div className="w-5 h-0.5 bg-white mb-1 transition-all duration-300" />
              <div className="w-5 h-0.5 bg-white transition-all duration-300" />
            </button>
          </div>
        </div>
        {open && (
          <nav className="md:hidden pb-4">
            <div className="mt-2 grid gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-white/80 hover:text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn && user ? (
                <>
                  <Link href="/" className="text-white/80 hover:text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors flex items-center" onClick={() => setOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </Link>
                  <Link href="/dashboard" className="text-white/80 hover:text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors flex items-center" onClick={() => setOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </Link>
                  <Link href="/courses" className="text-white/80 hover:text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors flex items-center" onClick={() => setOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    My Learning
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout()
                      setOpen(false)
                    }}
                    className="text-white/80 hover:text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors text-left flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mt-2 text-center"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}