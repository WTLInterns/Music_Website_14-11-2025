"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { FaGoogle } from "react-icons/fa";

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

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Background and overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/60 to-violet-900/70" />

      <div className="relative z-10">
        <Navbar />
      </div>

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

      <div className="relative z-10 mt-4 sm:mt-8 lg:mt-10 container mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-10">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
          {/* Left promo panel */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-indigo-700/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-700/80 to-purple-700/80" />
            <div className="relative h-full p-6 sm:p-8 flex flex-col justify-center items-center text-white">
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3 text-center">Welcome Back</h3>
              <p className="text-white/80 text-center max-w-sm text-sm sm:text-base">
                Sign in to access your courses, track progress, and join live classes.
              </p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="bg-white p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-start gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6">
              <span className="text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1 text-sm sm:text-base">Login</span>
              <Link href="/register" className="text-gray-500 hover:text-indigo-600 hover:border-indigo-600 pb-1 border-b-2 border-transparent text-sm sm:text-base">Register</Link>
              <button onClick={() => router.push('/')} className="ml-auto text-gray-400 hover:text-gray-600 text-lg sm:text-xl" aria-label="Close">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Login with Phone Number</label>
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
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white font-medium py-2 sm:py-2.5 rounded-lg transition-colors text-sm sm:text-base ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isLoading ? 'Logging in...' : 'Sign in'}
              </button>
              <div className="text-sm text-gray-600 text-center">
                <Link href="/forgot-password" className="hover:text-indigo-600">Forgot password?</Link>
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
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaGoogle className="w-5 h-5" />
                {isGoogleLoading ? 'Connecting...' : 'Sign in with Google'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}