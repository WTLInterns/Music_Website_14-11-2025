"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { FaGoogle } from "react-icons/fa";

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

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:8085/auth/google/login';
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

      // Store success message in localStorage to show on login page
      localStorage.setItem("registrationSuccess", "true");
      localStorage.setItem("registrationMessage", "Account created successfully! Please log in.");

      // Redirect to login page
      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Background and overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/60 to-violet-900/70" />

      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="relative z-10 mt-4 sm:mt-8 lg:mt-10 container mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
          {/* Left promo panel */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-indigo-700/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-700/80 to-purple-700/80" />
            <div className="relative h-full p-6 sm:p-8 flex flex-col justify-center items-center text-white">
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3 text-center">Create Account</h3>
              <p className="text-white/80 text-center max-w-sm text-sm sm:text-base">
                Join our community and start your musical journey today.
              </p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="bg-white p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-start gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6">
              <Link href="/login" className="text-gray-500 hover:text-indigo-600 hover:border-indigo-600 pb-1 border-b-2 border-transparent text-sm sm:text-base">Login</Link>
              <span className="text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1 text-sm sm:text-base">Register</span>
              <button onClick={() => router.push('/')} className="ml-auto text-gray-400 hover:text-gray-600 text-lg sm:text-xl" aria-label="Close">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
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
                    className="w-full rounded-lg border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
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
                  className="w-full rounded-lg border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
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
                  className="w-full rounded-lg border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
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
                  className="w-full rounded-lg border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
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
                  className="w-full rounded-lg border border-gray-300 p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white font-medium py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

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
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaGoogle className="w-5 h-5" />
                {isGoogleLoading ? 'Connecting...' : 'Sign up with Google'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}