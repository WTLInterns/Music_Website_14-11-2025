import { motion } from 'framer-motion'
import { FaMusic, FaPlay, FaClock, FaCalendarAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function LiveClasses() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true);
            if (videoRef.current) {
              videoRef.current.play().catch((error) => {
                console.log('Autoplay was prevented:', error);
              });
            }
          } else {
            setIsVideoVisible(false);
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }
        });
      },
      {
        threshold: 0.5, // Video is considered visible when 50% is in view
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Capture the video element to use in cleanup
    const videoElement = videoRef.current;
    
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  const galleryImages = [
    { id: 1, title: 'Guitar Class', image: '/images/guitar-lesson.jpg' },
    { id: 2, title: 'Keyboard Class', image: '/images/piano-lesson.jpg' },
    { id: 3, title: 'Ukulele Class', image: '/images/drum-lesson.jpg' },
    { id: 4, title: 'Flute Class', image: '/images/violin-lesson.jpg' },
    { id: 5, title: 'Vocal Training', image: '/images/vocal-lesson.jpg' },
    { id: 6, title: 'Music Theory', image: '/images/music-theory.jpg' }
  ]

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Offline Classes
          </motion.h1>
          <motion.p 
            className="text-base text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
Join upcoming offline sessions and connect with the world through music.          </motion.p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content - Video and Gallery */}
          <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Demo Session Preview</h3>
            <div className="aspect-video bg-black/5 border border-gray-200 rounded-lg overflow-hidden shadow-inner relative">
              <video
                ref={videoRef}
                className="w-full h-full rounded-md object-cover"
                src="/images/acheivement/demo video.mp4"
                autoPlay={isVideoVisible}
                muted={false}
                loop
                playsInline
                controls
              />
              {!isVideoVisible && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="text-white text-center">
                    <FaPlay className="w-8 h-8 mx-auto mb-2 opacity-70" />
                    <p className="text-sm">Scroll to play</p>
                  </div>
                </div>
              )}
            </div>
            
            <h3 className="font-bold text-lg text-gray-800 mt-6 mb-3">Class Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryImages.map((item) => (
                <motion.div 
                  key={item.id}
                  className="relative h-24 rounded-lg overflow-hidden group bg-white border border-gray-300 shadow-sm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image Container with Fallback */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                      <FaMusic className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <span className="text-xs font-medium text-gray-700">{item.title}</span>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  {/* <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 grid place-content-center">
                    <div className="text-center text-white">
                      <div className="h-8 w-8 rounded-full bg-white/90 text-black grid place-content-center shadow transform group-hover:scale-110 transition-transform duration-300 mx-auto mb-1">
                        <FaPlay className="w-3 h-3" />
                      </div>
                      <div className="text-xs">Watch</div>
                    </div>
                  </div> */}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Classes Sidebar with Background Image */}
          <div className="relative rounded-xl p-4 shadow-lg border border-white/20 overflow-hidden min-h-[400px]">
            {/* Full Width & Height Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src="/images/music3.png" 
                alt="Music Background"
                fill
                className="object-cover w-full h-full"
              />
              {/* Overlay for better readability */}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col">
              {/* Animated Header */}
              <motion.div 
                className="text-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
              >
                <motion.h3 
                  className="font-bold text-2xl text-white mb-2"
                  animate={{
                    background: [
                      "linear-gradient(to right, #fff, #e0e7ff)",
                      "linear-gradient(to right, #e0e7ff, #c7d2fe)",
                      "linear-gradient(to right, #c7d2fe, #fff)"
                    ],
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Class Timings
                </motion.h3>
                <motion.div 
                  className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "4rem" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </motion.div>

              <div className="space-y-4 mb-6 flex-grow">
                {/* Monday - Saturday Card */}
                <motion.div 
                  className="p-4 rounded-xl bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-md border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  whileHover={{ scale: 1.03, y: -3 }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                          top: `${20 + (i * 15)}%`,
                          left: `${10 + (i * 15)}%`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 2 + i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <motion.div 
                          className="text-xl font-bold text-white flex items-center gap-2"
                          whileHover={{ x: 5 }}
                        >
                          <FaCalendarAlt className="text-green-300" />
                          Monday - Saturday
                        </motion.div>
                        <div className="text-sm text-white/90 font-medium">Regular Classes</div>
                      </motion.div>
                      {/* <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-white font-bold text-lg">M</span>
                      </motion.div> */}
                    </div>
                    
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg p-3 hover:from-yellow-400/30 hover:to-orange-400/30 transition-all duration-300 border border-yellow-400/30"
                        whileHover={{ scale: 1.02, x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg"
                          animate={{
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(251, 191, 36, 0.7)",
                              "0 0 0 10px rgba(251, 191, 36, 0)",
                              "0 0 0 0 rgba(251, 191, 36, 0.7)"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <FaClock className="text-yellow-300 text-sm" />
                          <span className="text-white font-bold text-base">11:00 AM - 1:00 PM</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center gap-3 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-lg p-3 hover:from-orange-400/30 hover:to-red-400/30 transition-all duration-300 border border-orange-400/30"
                        whileHover={{ scale: 1.02, x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-400 shadow-lg"
                          animate={{
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(251, 146, 60, 0.7)",
                              "0 0 0 10px rgba(251, 146, 60, 0)",
                              "0 0 0 0 rgba(251, 146, 60, 0.7)"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <FaClock className="text-orange-300 text-sm" />
                          <span className="text-white font-bold text-base">4:00 PM - 9:00 PM</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Sunday Card */}
                <motion.div 
                  className="p-4 rounded-xl bg-gradient-to-br from-red-500/30 via-pink-500/20 to-purple-500/20 backdrop-blur-md border border-red-400/40 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  whileHover={{ scale: 1.03, y: -3 }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                >
                  {/* Animated Cross Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        rotate: [0, 45, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-20 h-1 bg-red-400"></div>
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        rotate: [90, 135, 90],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-20 h-1 bg-red-400"></div>
                    </motion.div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <motion.div 
                          className="text-xl font-bold text-white flex items-center gap-2"
                          whileHover={{ x: 5 }}
                        >
                          <FaCalendarAlt className="text-red-300" />
                          Sunday
                        </motion.div>
                        <div className="text-sm text-white/90 font-medium">Weekly Off</div>
                      </motion.div>
                      {/* <motion.div 
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 flex items-center justify-center shadow-lg"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <span className="text-white font-bold text-lg">S</span>
                      </motion.div> */}
                    </div>
                    <div className="mt-4">
                      <motion.div 
                        className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full shadow-lg"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          background: [
                            "linear-gradient(to right, #ef4444, #ec4899)",
                            "linear-gradient(to right, #ec4899, #a855f7)",
                            "linear-gradient(to right, #a855f7, #ef4444)"
                          ]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span className="text-white font-bold text-base flex items-center gap-2">
                          <motion.div
                            animate={{
                              rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            ×
                          </motion.div>
                          CLOSED
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Contact Section */}
              {/* <motion.div 
                className="mt-auto space-y-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.button
                  className="w-full py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaPhone className="text-lg" />
                    Contact for Details
                  </span>
                </motion.button>
                
                <motion.div 
                  className="flex justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaEnvelope className="text-white/80 text-lg cursor-pointer" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaPhone className="text-white/80 text-lg cursor-pointer" />
                  </motion.div>
                </motion.div>
              </motion.div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}