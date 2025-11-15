"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaMusic, FaUsers, FaChalkboardTeacher, FaTimes } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    if (typeof window !== "undefined") {
      window.location.href = "http://localhost:8085/auth/google";
    }
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
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
                <span className="text-xl font-bold">MusicKatta</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Welcome Back!
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                Access your courses, track progress, and join live classes.
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
                  Join Live Classes
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h2>
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>

              <form className="space-y-4">
                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
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
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {/* Login Button */}
                <button
                  type="button"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}