import Link from 'next/link'
import { FaYoutube, FaInstagram } from 'react-icons/fa'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleLogout = useCallback(() => {
    // Remove user data from localStorage
    localStorage.removeItem("user")
    localStorage.removeItem("userId")
    localStorage.removeItem('mk_user')
    localStorage.removeItem("authToken")
    
    // Update state
    setIsLoggedIn(false)
    setUser(null)
    setIsProfileDropdownOpen(false)
    
    // Redirect to home
    router.push("/")
  }, [router])

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("authToken")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        if (userData.isLoggedIn) {
          setIsLoggedIn(true)
          setUser(userData)

          const validateToken = async () => {
            try {
              if (!userData.email || !storedToken) {
                handleLogout()
                return
              }

              const response = await fetch(`https://api.ddhavalmulay.com/api/users/by-email?email=${encodeURIComponent(userData.email)}`)

              if (!response.ok) {
                handleLogout()
                return
              }

              const backendUser = await response.json()

              if (!backendUser || !backendUser.authToken || backendUser.authToken !== storedToken) {
                handleLogout()
              }
            } catch (error) {
              console.error("Error validating auth token:", error)
              handleLogout()
            }
          }

          validateToken()
        }
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }
  }, [handleLogout])

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

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  // Navigation links array
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About Us' },
    { href: '/#courses', label: 'Courses' },
    { href: '/#live', label: 'OffLine Classes' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-40 glass bg-gradient-to-b from-black/40 to-black/10">
      <div className="w-full px-0">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              {/* Logo Image with increased width */}
              <div className="relative h-12  w-32 rounded-lg overflow-hidden p-8 hover:animate-musicPulse transition-all duration-300">
                <Image 
                  src="/images/music1.jpg" 
                  alt="Muziik Katta Logo"
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
              <div className="hidden md:flex items-center gap-3 font-oswald">
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="group flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-2 py-1.5 pr-3 text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white/25 hover:shadow-[0_0_18px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    aria-haspopup="menu"
                    aria-expanded={isProfileDropdownOpen}
                  >
                    <div className="relative">
                      {user.profile ? (
                        <Image
                          src={user.profile}
                          alt={user.name}
                          width={36}
                          height={36}
                          className="w-9 h-9 rounded-full object-cover border-2 border-white/70 shadow-md"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md text-base">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                      )}
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-gray-900/60 shadow" />
                    </div>

                    <div className="hidden lg:flex flex-col items-start leading-tight">
                      <span className="text-sm font-semibold tracking-wide max-w-[160px] truncate">
                        {user.name || 'User'}
                      </span>
                      <span className="text-[11px] text-white/70 max-w-[180px] truncate">
                        {user.email || ''}
                      </span>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : 'rotate-0'} group-hover:text-blue-200`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 z-50 overflow-hidden">
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-600/10 to-pink-600/10 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          {user.profile ? (
                            <Image
                              src={user.profile}
                              alt={user.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover border border-gray-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow text-lg">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-gray-900 truncate">{user.name || 'User'}</div>
                            <div className="text-xs text-gray-600 truncate">{user.email || ''}</div>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/"
                          className="mx-2 rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          Home
                        </Link>
                        {/* <Link
                          href="/dashboard"
                          className="mx-2 rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </Link> */}
                        <Link
                          href="/my-courses"
                          className="mx-2 rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          My Learning
                        </Link>

                        <div className="my-2 border-t border-gray-200" />

                        <button
                          onClick={handleLogout}
                          className="mx-2 w-[calc(100%-16px)] rounded-xl px-3 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
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
            
            {/* <a className="text-white/80 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1" href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube className="h-5 w-5 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.9)] transition-all duration-300 animate-bounceIcon" />
            </a>
            <a className="text-white/80 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram className="h-5 w-5 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.9)] transition-all duration-300 animate-bounceIcon" />
            </a> */}
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
                  <div className="mx-2 mb-2 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-3">
                    <div className="flex items-center gap-3">
                      {user.profile ? (
                        <Image
                          src={user.profile}
                          alt={user.name}
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-full object-cover border-2 border-white/70"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow text-lg">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-white font-bold font-oswald truncate">{user.name || 'User'}</div>
                        <div className="text-white/70 text-xs truncate">{user.email || ''}</div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/"
                    className="mx-2 text-white/90 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all flex items-center justify-between"
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Home
                    </span>
                    <span className="text-white/40">›</span>
                  </Link>

                  <Link
                    href="/my-courses"
                    className="mx-2 text-white/90 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600/30 to-pink-600/20 hover:from-blue-600/40 hover:to-pink-600/30 transition-all flex items-center justify-between"
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      My Learning
                    </span>
                    <span className="text-white/40">›</span>
                  </Link>

                  <button 
                    onClick={() => {
                      handleLogout()
                      setOpen(false)
                    }}
                    className="mx-2 text-white/90 py-3 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/15 transition-all text-left flex items-center justify-between"
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </span>
                    <span className="text-white/40">›</span>
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