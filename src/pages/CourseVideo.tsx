"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FaPlay, FaClock, FaUser, FaStar, FaMusic, FaCheckCircle, FaBook, FaCertificate } from "react-icons/fa";

const COURSE_TITLES: Record<string, string> = {
  "guitar-basics": "Guitar Basics",
  "piano-fundamentals": "Piano Fundamentals",
  "music-theory": "Music Theory Essentials",
};

const COURSE_DESCRIPTIONS: Record<string, string> = {
  "guitar-basics": "Master the fundamentals of guitar playing with step-by-step lessons covering chords, strumming, and your first songs.",
  "piano-fundamentals": "Learn piano from scratch with proper technique, music reading, and beautiful melodies.",
  "music-theory": "Understand the language of music with comprehensive theory lessons that will transform your playing.",
};

export default function CourseVideoPage() {
  const router = useRouter();
  const { course: courseFromQuery } = router.query as { course?: string };

  const [courseId, setCourseId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState(0);

  useEffect(() => {
    // Prefer query param if present (coming from success page), else fallback to localStorage
    if (courseFromQuery && typeof courseFromQuery === "string") {
      setCourseId(courseFromQuery);
      if (typeof window !== "undefined") {
        localStorage.setItem("enrolledCourse", courseFromQuery);
      }
      return;
    }

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("enrolledCourse");
      if (stored) setCourseId(stored);
    }
  }, [courseFromQuery]);

  const courseTitle = courseId ? COURSE_TITLES[courseId] ?? "Your Course" : "Your Course";
  const courseDescription = courseId ? COURSE_DESCRIPTIONS[courseId] ?? "Start your musical journey with expert guidance." : "Start your musical journey with expert guidance.";

  const mainVideos = [
    {
      id: "main-1",
      title: "Getting Started: Introduction & Basics",
      description: "Learn the fundamental concepts and setup for your instrument",
      duration: "15:30",
      videoUrl: "https://www.youtube.com/embed/5x2rG3tGZ1I",
      completed: true
    },
    {
      id: "main-2", 
      title: "Core Techniques & Practice Methods",
      description: "Master essential techniques with guided practice sessions",
      duration: "22:15",
      videoUrl: "https://www.youtube.com/embed/2Z1W9o3lK0E",
      completed: false
    },
    {
      id: "main-3",
      title: "Building Your First Song",
      description: "Apply your skills to play a complete musical piece",
      duration: "18:45",
      videoUrl: "https://www.youtube.com/embed/jx2y3T3N1lQ",
      completed: false
    }
  ];

  const relatedVideos = [
    {
      id: "rel-1",
      title: "How to Tune Your Instrument Perfectly",
      videoUrl: "https://www.youtube.com/embed/5x2rG3tGZ1I",
      duration: "8:20"
    },
    {
      id: "rel-2",
      title: "Essential Practice Routines",
      videoUrl: "https://www.youtube.com/embed/2Z1W9o3lK0E", 
      duration: "12:45"
    },
    {
      id: "rel-3",
      title: "Common Beginner Mistakes & Solutions",
      videoUrl: "https://www.youtube.com/embed/jx2y3T3N1lQ",
      duration: "14:30"
    }
  ];

  const courseFeatures = [
    { icon: FaClock, text: "8+ Hours of Content", subtext: "Comprehensive learning" },
    { icon: FaUser, text: "Expert Instructor", subtext: "Professional guidance" },
    { icon: FaCertificate, text: "Certificate", subtext: "Upon completion" },
    { icon: FaBook, text: "Downloadable Resources", subtext: "Practice materials" }
  ];

  if (!courseId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMusic className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No Course Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn&#39;t detect a purchased course. Please enroll in a course to start learning.
          </p>
          <button
            onClick={() => router.push("/courses")}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Browse Courses
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{courseTitle}</h1>
              <p className="text-gray-600 max-w-2xl">{courseDescription}</p>
            </div>
            <button
              onClick={() => router.push("/#")}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Course Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {courseFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{feature.text}</h3>
                  <p className="text-gray-500 text-xs">{feature.subtext}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Main Course Videos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <FaPlay className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Course Videos</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mainVideos.map((video, index) => (
              <motion.div
                key={video.id}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedVideo === index ? 'ring-2 ring-indigo-500' : 'hover:shadow-xl'
                }`}
                onClick={() => setSelectedVideo(index)}
              >
                <div className="aspect-video bg-black relative">
                  <iframe
                    src={video.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={video.title}
                  />
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  {video.completed && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white p-1 rounded-full">
                      <FaCheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight">{video.title}</h3>
                    {video.completed && (
                      <span className="flex items-center gap-1 text-green-600 text-xs whitespace-nowrap ml-2">
                        <FaCheckCircle className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Course Progress & Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-7xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progress Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Course Completion</span>
                    <span className="font-semibold text-indigo-600">33%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">1/3</div>
                    <div className="text-sm text-gray-600">Videos Watched</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">2h</div>
                    <div className="text-sm text-gray-600">Time Spent</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Info Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">About This Course</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaStar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Beginner Friendly</div>
                    <div className="text-gray-600 text-sm">No prior experience needed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaClock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Self-Paced Learning</div>
                    <div className="text-gray-600 text-sm">Learn at your own speed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaCertificate className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Certificate Ready</div>
                    <div className="text-gray-600 text-sm">Available upon completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Related Videos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <FaMusic className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Related Videos</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedVideos.map((video) => (
              <motion.article
                key={video.id}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video bg-black relative">
                  <iframe
                    src={video.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={video.title}
                  />
                  <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm">
                    Complementary content to enhance your learning experience and build additional skills.
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}