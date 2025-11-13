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
              <div className="relative h-12 w-32 rounded-lg overflow-hidden">
                <Image 
                  src="/images/music1.jpg" 
                  alt="MusicKatta Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-white/80 hover:text-white relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-pink-500 after:transition-all hover:after:w-full transition-colors duration-200"
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
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.username} 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {user.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
                <div className="relative" ref={profileDropdownRef}>
                  <button 
                    onClick={toggleProfileDropdown}
                    className="flex items-center gap-1 text-white focus:outline-none"
                  >
                    <span className="font-medium">{user.username}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link 
                        href="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link 
                        href="/courses" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        My Learning
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
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
                className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Login
              </Link>
            )}
            
            <a className="text-white/80 hover:text-white transition-colors" href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube className="h-5 w-5 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] hover:scale-110 transition-transform" />
            </a>
            <a className="text-white/80 hover:text-white transition-colors" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
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
                  <Link href="/dashboard" className="text-white/80 hover:text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setOpen(false)}>
                    My Profile
                  </Link>
                  <Link href="/courses" className="text-white/80 hover:text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setOpen(false)}>
                    My Learning
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout()
                      setOpen(false)
                    }}
                    className="text-white/80 hover:text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors text-left"
                  >
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