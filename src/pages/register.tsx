
"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle, FaMusic, FaTimes } from "react-icons/fa";

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.isLoggedIn) {
          // Show success message and redirect to home page
          localStorage.setItem("registrationSuccess", "true");
          localStorage.setItem("registrationMessage", "Account created successfully! Redirecting to home page...");
          router.push("/");
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, [router]);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'https://api.ddhavalmulay.com/auth/google';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!firstName || !lastName || !email || !mobileNo || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("https://api.ddhavalmulay.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobile: mobileNo,
          password
        }),
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
          : "Registration failed. Please try again.";
        setError(data?.message || `Registration failed (${response.status}). ${statusText}`);
        return;
      }

      // Store success message in localStorage to show on success page
      localStorage.setItem("registrationSuccess", "true");
      localStorage.setItem("registrationMessage", "Account created successfully! You can now access all features of Muziik Katta.");

      // Redirect to success page
      router.push("/register/success");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-oswald">
      {/* Main Register Container - REDUCED HEIGHT */}
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-white min-h-[450px]"> {/* Reduced from 500px to 450px */}
          
          {/* Left Side - Branding & Image */}
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-6 lg:p-8">
            <div className="relative z-10 h-full flex flex-col justify-center text-white">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-4"> {/* Reduced margin */}
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <FaMusic className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Muziik Katta</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Join Our Community!
              </h1>
              
              {/* Image replacing the text and features */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                <Image 
                  src="/images/music4.png" 
                  alt="Music Learning Community"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
                {/* Overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
              </div>

           
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="bg-white p-6 lg:p-8 flex flex-col justify-center relative">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Close register form"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            <div className="max-w-md w-full mx-auto">
              {/* Header */}
              <div className="text-center mb-4"> {/* Reduced margin */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3"> {/* Reduced spacing */}
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
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

                {/* Phone Field */}
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

                {/* Password Fields - SIDE BY SIDE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full text-white font-semibold py-3 rounded-lg transition-all duration-200 text-sm ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-3"> {/* Reduced margin */}
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
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-200 text-sm font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
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
                      <FaGoogle className="w-4 h-4 text-red-500" />
                      Sign up with Google
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