
import Link from 'next/link'
import { motion } from 'framer-motion'
import About from './about'
import CoursesPage from './courses'
import LiveClasses from './live-classes'
import Contact from './contact'
import Image from 'next/image'
import { FaMusic } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="w-full">
      {/* Home Section - Full Width */}
      <section id="home" className="anchor-section relative overflow-hidden w-full min-h-[90vh]">
        {/* Background Image with Next.js Image component */}
        <div className="absolute inset-0 w-full h-[90vh]">
          <Image 
            src="/images/music2.jpg" 
            alt="Music Background"
            fill
            className="object-cover w-full"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        
        {/* Animated Music Icon - Top Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 left-8 md:top-12 md:left-12 z-10"
        >
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-red-500 bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-5"
          >
            <FaMusic className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" />
          </motion.div>
        </motion.div>

        {/* Animated Music Icon - Top Right (Bigger) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-8 right-8 md:top-12 md:right-12 z-10"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 5, 0],
              scale: [1, 1.2, 1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-red-500 bg-white/20 backdrop-blur-sm rounded-2xl p-5 md:p-6"
          >
            <FaMusic className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
          </motion.div>
        </motion.div>
        
        {/* Content Container - Aligned to Left */}
        <div className="relative w-full h-full flex items-center pt-20">
          <div className="px-8 md:px-16 lg:px-24 py-16 md:py-24 text-left max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-4xl font-bold leading-tight mb-4"
            >
              <span className="text-white">Feel the Music.</span>{' '}
              <span className="text-white">Learn the Art.</span>{' '}
              <span className="text-red-500">Join MusicKatta.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl"
            >
              Premium courses and live classes with a modern, performance-first curriculum.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href="#courses" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center"
              >
                Explore Courses
              </Link>
              <Link 
                href="#live" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center"
              >
                Join Live Classes
              </Link>
            </motion.div>

            {/* Equalizer bars positioned below buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex items-end justify-start gap-1 h-16"
            >
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="eq-bar animate-equalize bg-red-500" 
                  style={{ 
                    animationDelay: `${i * 0.08}s`,
                    height: `${Math.random() * 40 + 20}px`
                  }} 
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature highlights - Attached directly to image with no gap */}
      <section className="w-full px-4 bg-gray-900 py-0 -mt-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -translate-y-8">
            {[
              { 
                title: 'Mentor-led', 
                desc: 'Guided by experienced musicians and teachers.',
                icon: '🎵',
                gradient: 'from-purple-500 to-pink-500'
              },
              { 
                title: 'Practice-first', 
                desc: 'Real songs, real techniques, real progress.',
                icon: '🎸',
                gradient: 'from-blue-500 to-cyan-500'
              },
              { 
                title: 'Community', 
                desc: 'Supportive peers and live sessions.',
                icon: '👥',
                gradient: 'from-green-500 to-emerald-500'
              },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                className="group relative p-0.5 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Animated gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${f.gradient} animate-pulse group-hover:animate-spin`} />
                
                {/* Shiny overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                {/* Card content */}
                <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 group-hover:border-gray-600/70 transition-all duration-300 h-full">
                  {/* Icon */}
                  <motion.div 
                    className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {f.icon}
                  </motion.div>
                  
                  {/* Title with gradient text */}
                  <h3 className={`font-bold text-2xl mb-3 bg-gradient-to-r ${f.gradient} bg-clip-text text-transparent`}>
                    {f.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-base">
                    {f.desc}
                  </p>
                  
                  {/* Animated bottom border */}
                  <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${f.gradient} group-hover:w-full transition-all duration-500 rounded-full`} />
                  
                  {/* Floating notes animation */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-white/60 text-lg"
                    >
                      ♫
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Full Width */}
      <section id="about" className="anchor-section w-full">
        <About />
      </section>

      {/* Courses Section - Full Width */}
      <section id="courses" className="anchor-section w-full">
        <CoursesPage />
      </section>

      {/* Live Classes Section - Full Width */}
      <section id="live" className="anchor-section w-full">
        <LiveClasses />
      </section>

      {/* Contact Section - Full Width */}
      <section id="contact" className="anchor-section w-full">
        <Contact />
      </section>

      {/* Add custom styles for the animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  )
}