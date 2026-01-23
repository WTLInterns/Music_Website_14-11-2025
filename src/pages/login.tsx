"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaMusic, FaUsers, FaChalkboardTeacher, FaTimes } from "react-icons/fa";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Add success state

  // Check if user is already logged in
  useEffect(() => {
    // Check for Google auth errors
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get("error");
    if (errorParam) {
      setError("Google authentication failed. Please try again.");
    }
    
    // Check for Google auth error in localStorage
    const googleAuthError = localStorage.getItem("googleAuthError");
    if (googleAuthError) {
      setError("Google authentication failed. Please try again.");
      localStorage.removeItem("googleAuthError");
    }
    
    // Check for registration success message
    const registrationSuccess = localStorage.getItem("registrationSuccess");
    if (registrationSuccess) {
      setSuccess(localStorage.getItem("registrationMessage") || "Account created successfully!");
      localStorage.removeItem("registrationSuccess");
      localStorage.removeItem("registrationMessage");
    }
    
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.isLoggedIn) {
          setIsLoggedIn(true);
          setUser(userData);
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  const handleGoogleLogin = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://api.ddhavalmulay.com/auth/google";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://api.ddhavalmulay.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store user data in localStorage (including authToken from backend)
      const userData = {
        email: data.email,
        name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        profile: data.profile || null,
        isLoggedIn: true,
        loginMethod: "email",
        authToken: data.authToken || null,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      if (data.authToken) {
        localStorage.setItem("authToken", data.authToken);
      }
      
      // Redirect to home page
      router.push("/");
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    }
  };

  const handleClose = () => {
    router.push("/");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem('mk_user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 font-oswald">
      {/* Main Login Container - SMALLER SIZE */}
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-white min-h-[500px]">
          
          {/* Left Side - Branding & Features */}
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-6 lg:p-8">
            <div className="relative z-10 h-full flex flex-col justify-center text-white">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <FaMusic className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Muziik Katta</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Welcome Back!
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                Access your courses, track progress, and join OffLine Classes.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <FaChalkboardTeacher className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Mentor-led</h3>
                    <p className="text-blue-100 text-xs">Guided by experienced instructors</p>
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
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/courses"
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 text-white font-semibold border border-white/30 text-center text-sm"
                >
                  Explore Courses
                </Link>
                <Link 
                  href="/live-classes"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold text-center text-sm"
                >
                  Join OffLine Classes
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white p-6 lg:p-8 flex flex-col justify-center relative">
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
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLoggedIn ? "Welcome Back!" : "Sign in"}
                </h2>
                {!isLoggedIn && (
                  <p className="text-gray-600 text-sm">
                    Don&#39;t have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                      Sign up
                    </Link>
                  </p>
                )}
              </div>

              {isLoggedIn && user ? (
                // Show user profile when logged in
                <div className="text-center">
                  <div className="flex flex-col items-center">
                    {user.profile ? (
                      <Image 
                        src={user.profile} 
                        alt={user.name} 
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg border-4 border-white">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-800">Welcome Back!</h3>
                    <h4 className="text-lg font-semibold text-gray-700 mt-1">{user.name}</h4>
                    <p className="text-gray-600 text-sm mb-6">{user.email}</p>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 w-full">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-sm font-medium text-green-800">
                          You are logged in with Google
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 w-full">
                      <Link 
                        href="/"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold"
                      >
                        Go to Home Page
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg transition-all duration-300 font-semibold"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Show login form when not logged in
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                  
                  {/* Success Message */}
                  {success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-600 text-sm">{success}</p>
                    </div>
                  )}
                  
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="your@email.com"
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
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  
                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full text-white font-semibold py-3 rounded-lg transition-all duration-200 text-sm bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Sign in
                  </button>
                  
                  {/* Forgot Password */}
                  <div className="text-center">
                    <Link 
                      href="/forgot-password" 
                      className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  
                  {/* Divider */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-3 bg-white text-gray-500 font-semibold">Or continue with</span>
                    </div>
                  </div>
                  
                  {/* Google Sign-In Button */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 text-sm font-semibold text-gray-700 shadow-sm hover:shadow-md"
                    onClick={handleGoogleLogin}
                  >
                    <>
                      <FaGoogle className="w-4 h-4 text-red-500" />
                      Sign in with Google
                    </>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}