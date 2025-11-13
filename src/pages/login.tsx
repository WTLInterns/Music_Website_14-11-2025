"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaMusic, FaUsers, FaChalkboardTeacher, FaTimes } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    // If redirected after successful registration
    if (typeof window !== "undefined") {
      const hasSuccess = localStorage.getItem("registrationSuccess") === "true";
      const msg = localStorage.getItem("registrationMessage") || "Account created successfully! Please log in.";
      if (hasSuccess) {
        setSuccessMessage(msg);
        setShowSuccessMessage(true);
        localStorage.removeItem("registrationSuccess");
        localStorage.removeItem("registrationMessage");
        
        // Auto hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      }
    }

    // Handle Google OAuth callback
    const googleAuth = searchParams.get('googleAuth');
    if (googleAuth === 'success') {
      const userId = searchParams.get('userId');
      const username = searchParams.get('username');
      const email = searchParams.get('email');
      const phone = searchParams.get('phone');
      const role = searchParams.get('role');
      const profilePicture = searchParams.get('profilePicture');

      const user = {
        userId: userId || null,
        username: username || email?.split('@')[0] || '',
        email: email || '',
        mobileNo: phone || '',
        role: role || 'USER',
        profilePicture: profilePicture || '',
        address: '',
        isLoggedIn: true,
      };

      // Store in localStorage only
      localStorage.setItem('user', JSON.stringify(user));
      if (userId) {
        localStorage.setItem('userId', String(userId));
      }

      setSuccessMessage('Successfully logged in with Google!');
      setShowSuccessMessage(true);
      setTimeout(() => router.push('/'), 1500);
    } else if (googleAuth === 'error') {
      const message = searchParams.get('message');
      setError(message || 'Google authentication failed');
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:8085/auth/google/login';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!mobileNo || !password) {
      setError("Please enter phone number and password");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8085/auth/login1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Backend expects 'mobile' not 'mobileNo'
        body: JSON.stringify({ mobile: mobileNo, password }),
      });

      let data: any;
      try {
        data = await response.json();
      } catch (err) {
        data = { message: "Unable to parse server response" };
      }

      if (!response.ok) {
        const statusText = response.status === 500
          ? "Server error at the moment. Please try again in a minute."
          : "Please check your credentials and try again.";
        setError(data?.message || `Login failed (${response.status}). ${statusText}`);
        return;
      }

      // Build user object for app usage
      const userId = data?.userId || data?.user?.id || data?.user?.userId || data?.id;
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
      };

      // Store in localStorage only
      localStorage.setItem("user", JSON.stringify(user));
      if (userId) {
        localStorage.setItem("userId", String(userId));
      }

      router.push("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      {/* Success toast after registration */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-down">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Main Login Container - SMALLER SIZE */}
      <div className="w-full max-w-4xl"> {/* Changed from max-w-6xl to max-w-4xl */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-white min-h-[500px]"> {/* Changed from min-h-[600px] to min-h-[500px] and rounded-3xl to rounded-2xl */}
          
          {/* Left Side - Branding & Features */}
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-6 lg:p-8"> {/* Reduced padding */}
            <div className="relative z-10 h-full flex flex-col justify-center text-white">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6"> {/* Reduced margin */}
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"> {/* Smaller logo */}
                  <FaMusic className="w-5 h-5 text-white" /> {/* Smaller icon */}
                </div>
                <span className="text-xl font-bold">MusicKatta</span> {/* Smaller text */}
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight"> {/* Smaller text and margin */}
                Welcome Back!
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg text-blue-100 mb-6 leading-relaxed"> {/* Smaller text and margin */}
                Access your courses, track progress, and join live classes.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-4 mb-6"> {/* Reduced gap and margin */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"> {/* Smaller circles */}
                    <FaChalkboardTeacher className="w-4 h-4 text-white" /> {/* Smaller icons */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Mentor-led</h3> {/* Smaller text */}
                    <p className="text-blue-100 text-xs">Guided by experienced instructors</p> {/* Smaller text */}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <FaMusic className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Practice-first</h3>
                    <p className="text-blue-100 text-xs">Learn by doing approach</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <FaUsers className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Community</h3>
                    <p className="text-blue-100 text-xs">Learn with peers</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3"> {/* Reduced gap */}
                <Link 
                  href="/courses"
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 text-white font-semibold border border-white/30 text-center text-sm" /* Smaller padding and text */
                >
                  Explore Courses
                </Link>
                <Link 
                  href="/live-classes"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold text-center text-sm" /* Smaller padding and text */
                >
                  Join Live Classes
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white p-6 lg:p-8 flex flex-col justify-center relative"> {/* Reduced padding */}
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Close login form"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            <div className="max-w-md w-full mx-auto">
              {/* Header */}
              <div className="text-center mb-6"> {/* Reduced margin */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h2> {/* Smaller text */}
                <p className="text-gray-600 text-sm"> {/* Smaller text */}
                  Don't have an account?{" "}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4"> {/* Reduced spacing */}
                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm" /* Smaller padding and text */
                    placeholder="Enter your 10-digit number"
                    pattern="\d{10}"
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm" /* Smaller padding and text */
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg"> /* Smaller padding */
                    <p className="text-red-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full text-white font-semibold py-3 rounded-lg transition-all duration-200 text-sm ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  }`} /* Smaller padding and text */
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>

                {/* Forgot Password */}
                <div className="text-center">
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors" /* Smaller text */
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Divider */}
                <div className="relative my-4"> /* Reduced margin */
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs"> /* Smaller text */
                    <span className="px-3 bg-white text-gray-500 font-semibold">Or continue with</span>
                  </div>
                </div>

                {/* Google Sign-In Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 text-sm font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md" /* Smaller padding and text */
                >
                  {isGoogleLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </div>
                  ) : (
                    <>
                      <FaGoogle className="w-4 h-4 text-red-500" /> {/* Smaller icon */}
                      Sign in with Google
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}