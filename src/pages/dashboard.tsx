"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      if (!userData.isLoggedIn) {
        router.push("/login");
        return;
      }
      setUser(userData);
    } catch (e) {
      console.error("Error parsing user data:", e);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">My Profile</h2>
                
                <div className="flex flex-col items-center">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.username} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                      {user.username?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-gray-800">{user.username}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  {user.mobileNo && (
                    <p className="text-gray-600 mt-1">Phone: {user.mobileNo}</p>
                  )}
                  
                  <div className="mt-6 w-full">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">My Learning</h2>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-800">Guitar Basics</h3>
                    <p className="text-gray-600 text-sm mt-1">Progress: 60%</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-800">Piano Fundamentals</h3>
                    <p className="text-gray-600 text-sm mt-1">Progress: 30%</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-800">Music Theory</h3>
                    <p className="text-gray-600 text-sm mt-1">Progress: 10%</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link href="/courses" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Browse more courses →
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Completed Guitar Basics - Lesson 5</p>
                      <p className="text-gray-500 text-sm">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Enrolled in Piano Fundamentals</p>
                      <p className="text-gray-500 text-sm">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}