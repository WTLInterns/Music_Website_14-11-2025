import Link from 'next/link'
import { FaYoutube, FaInstagram } from 'react-icons/fa'
import { useState, FormEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLogin, setIsLogin] = useState(true) // Toggle between login and signup
  const [mobileNo, setMobileNo] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [loginError, setLoginError] = useState("")
  const [signupError, setSignupError] = useState("")
  const [signupSuccess, setSignupSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoginError("")
    if (!mobileNo || !password) {
      setLoginError("Please enter phone number and password")
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:8085/auth/login1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Backend expects 'mobile' not 'mobileNo'
        body: JSON.stringify({ mobile: mobileNo, password }),
      })

      let data: any
      try {
        data = await response.json()
      } catch (err) {
        data = { message: "Unable to parse server response" }
      }

      if (!response.ok) {
        const statusText = response.status === 500
          ? "Server error at the moment. Please try again in a minute."
          : "Please check your credentials and try again."
        setLoginError(data?.message || `Login failed (${response.status}). ${statusText}`)
        return
      }

      // Build user object for app usage
      const userId = data?.userId || data?.user?.id || data?.user?.userId || data?.id
      const user = {
        userId: userId ?? null,
        username: data?.username || data?.user?.username || mobileNo,
        email: data?.email || data?.user?.email || "",
        mobileNo,
        role: (data?.role || data?.user?.role || "USER").toUpperCase(),
        profilePicture: data?.profilePicture || data?.user?.profilePicture || "",
        address: data?.address || data?.user?.address || "",
        token: data?.token || data?.accessToken || "",
        isLoggedIn: true,
      }

      // Store in localStorage only
      localStorage.setItem("user", JSON.stringify(user))
      if (userId) {
        localStorage.setItem("userId", String(userId))
      }

      // Update state
      setIsLoggedIn(true)
      setUser(user)

      // Close modal and redirect to home
      setShowAuthModal(false)
      router.push("/")
    } catch (err) {
      setLoginError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSignupError("")
    setSignupSuccess("")

    // Validation
    if (!firstName || !lastName || !email || !mobileNo || !password || !confirmPassword) {
      setSignupError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setSignupError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setSignupError("Password must be at least 6 characters")
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:8085/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobile: mobileNo,
          password
        }),
      })

      let data: any
      try {
        data = await response.json()
      } catch (err) {
        data = { message: "Unable to parse server response" }
      }

      if (!response.ok) {
        const statusText = response.status === 500
          ? "Server error at the moment. Please try again in a minute."
          : "Registration failed. Please try again."
        setSignupError(data?.message || `Registration failed (${response.status}). ${statusText}`)
        return
      }

      // Show success message and switch to login form
      setSignupSuccess("Account created successfully! Please log in.")
      setIsLogin(true)
      
      // Clear form fields
      setFirstName("")
      setLastName("")
      setEmail("")
      setMobileNo("")
      setPassword("")
      setConfirmPassword("")
    } catch (err) {
      setSignupError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:8085/auth/google/login'
  }

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

  const toggleAuthForm = () => {
    setIsLogin(!isLogin)
    // Clear errors when switching forms
    setLoginError("")
    setSignupError("")
    setSignupSuccess("")
  }

  // Close modal when clicking outside
  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowAuthModal(false)
    }
  }

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
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold">
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
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link 
                        href="/courses" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        My Learning
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Show login button when not logged in
              <button 
                onClick={() => {
                  setShowAuthModal(true)
                  setIsLogin(true) // Reset to login form when opening modal
                }}
                className="hidden md:block bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            )}
            
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
              {isLoggedIn && user ? (
                <>
                  <Link href="/dashboard" className="nav-link">My Profile</Link>
                  <Link href="/courses" className="nav-link">My Learning</Link>
                  <button 
                    onClick={handleLogout}
                    className="nav-link text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    setShowAuthModal(true)
                    setIsLogin(true) // Reset to login form when opening modal
                  }}
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition-colors mt-2"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        )}
      </div>

      {/* Authentication Modal - Centered in the middle of the page */}
      {!isLoggedIn && showAuthModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleModalClose}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
            {/* Form Side */}
            <div className="flex-1 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Toggle Buttons */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                    isLogin 
                      ? 'bg-white shadow-sm font-medium text-gray-800' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                    !isLogin 
                      ? 'bg-white shadow-sm font-medium text-gray-800' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Content with Smooth Transition */}
              <div className="transition-all duration-300 ease-in-out">
                {isLogin ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Login with Phone Number</label>
                      <input
                        type="tel"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your 10-digit number"
                        pattern="\d{10}"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    {loginError && <p className="text-sm text-red-600">{loginError}</p>}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors ${
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {isLoading ? 'Logging in...' : 'Sign in'}
                    </button>
                    <div className="text-sm text-gray-600 text-center">
                      <button 
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Don't have an account? Sign up
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    {/* Google Sign-In Button */}
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors font-medium text-gray-700"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Sign in with Google
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your 10-digit number"
                        pattern="\d{10}"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    {signupError && <p className="text-sm text-red-600">{signupError}</p>}
                    {signupSuccess && <p className="text-sm text-green-600">{signupSuccess}</p>}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors ${
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <div className="text-sm text-gray-600 text-center">
                      <button 
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Already have an account? Log in
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    {/* Google Sign-In Button */}
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors font-medium text-gray-700"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Sign up with Google
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Image Side */}
            <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-brand-500 to-purple-600 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                <h3 className="text-3xl font-bold mb-4 text-center">
                  {isLogin ? 'Welcome Back!' : 'Join Our Community'}
                </h3>
                <p className="text-center text-brand-100 max-w-md">
                  {isLogin 
                    ? 'Access your courses, track progress, and join live classes.' 
                    : 'Start your musical journey with expert instructors and a supportive community.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}