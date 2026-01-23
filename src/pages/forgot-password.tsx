"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("https://api.ddhavalmulay.com/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
          : "Failed to send reset link. Please check your email and try again.";
        setError(data?.message || `Request failed (${response.status}). ${statusText}`);
        return;
      }

      setSuccessMessage("Password reset link sent to your email. Please check your inbox.");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Background and overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/60 to-violet-900/70" />


      <div className="relative z-10 mt-4 sm:mt-8 lg:mt-10 container mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-10">
        <div className="mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl">
          {/* Form panel */}
          <div className="bg-white p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
              <button onClick={() => router.push('/')} className="text-gray-400 hover:text-gray-600 text-lg" aria-label="Close">✕</button>
            </div>

            <p className="text-gray-600 mb-6">
              Enter your email address and we&#39;ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <div className="text-center text-sm text-gray-600">
                <Link href="/login" className="hover:text-indigo-600">Back to Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}