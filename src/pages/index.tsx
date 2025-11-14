import Link from 'next/link'
import { motion } from 'framer-motion'
import About from './about'
import CoursesPage from './courses'
import LiveClasses from './live-classes'
import Contact from './contact'
import Image from 'next/image'
import { FaMusic, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaClock, FaGraduationCap, FaUsers, FaAward, FaHeart, FaStar } from 'react-icons/fa'

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
              className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold leading-tight mb-4 tracking-wide"
            >
              <span className="text-white font-extrabold">Feel the Music.</span>{' '}
              <span className="text-white font-extrabold">Learn the Art.</span>{' '}
              <span className="text-red-500 font-black">Join MusicKatta.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl font-oswald font-medium tracking-wide"
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
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-oswald font-bold text-lg transition-all duration-300 transform hover:scale-105 text-center tracking-wide uppercase"
              >
                Explore Courses
              </Link>
              <Link 
                href="#live" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-oswald font-bold text-lg transition-all duration-300 transform hover:scale-105 text-center tracking-wide uppercase"
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
                  className="eq-bar animate-equalize bg-red-500 hover:animate-beat cursor-pointer" 
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
                  <h3 className={`font-oswald font-black text-2xl mb-3 bg-gradient-to-r ${f.gradient} bg-clip-text text-transparent tracking-wide uppercase`}>
                    {f.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-base font-oswald font-medium">
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

      {/* Footer Section */}
      <motion.footer 
        className="relative mt-20 bg-gradient-to-br from-white via-blue-50/80 to-purple-50/80 text-gray-800 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Lighter Gradient Orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-full blur-3xl animate-blob" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-yellow-50/40 to-orange-50/40 rounded-full blur-3xl animate-blob" style={{animationDelay: '4s'}}></div>
          
          {/* Swimming Guitar Images */}
          <motion.div
            className="absolute top-10 left-10 w-16 h-16 opacity-8"
            animate={{
              x: [0, 150, 300, 200, 0],
              y: [0, -80, 100, 150, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaMusic className="w-full h-full text-purple-400" />
          </motion.div>
          
          <motion.div
            className="absolute top-32 right-20 w-20 h-20 opacity-10"
            animate={{
              x: [0, -120, -240, -120, 0],
              y: [0, 120, -60, 180, 0],
              rotate: [0, -90, -180, -270, -360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            <FaMusic className="w-full h-full text-blue-400" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-20 left-1/4 w-14 h-14 opacity-6"
            animate={{
              x: [0, 180, -90, 270, 0],
              y: [0, -150, 120, -90, 0],
              rotate: [0, 180, 90, 270, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6
            }}
          >
            <FaMusic className="w-full h-full text-pink-400" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-40 right-1/3 w-18 h-18 opacity-12"
            animate={{
              x: [0, -200, 150, -75, 0],
              y: [0, 100, -130, 200, 0],
              rotate: [0, 45, 135, 225, 360],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 9
            }}
          >
            <FaMusic className="w-full h-full text-green-400" />
          </motion.div>

          {/* Additional Swimming Icons */}
          <motion.div
            className="absolute top-1/3 left-1/5 w-12 h-12 opacity-8"
            animate={{
              x: [0, 100, -50, 150, 0],
              y: [0, -60, 80, -40, 0],
              rotate: [0, 120, 240, 360],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <FaUsers className="w-full h-full text-indigo-400" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/3 right-1/5 w-16 h-16 opacity-10"
            animate={{
              x: [0, -80, 120, -160, 0],
              y: [0, 90, -70, 110, 0],
              rotate: [0, -60, -120, -180, -360],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          >
            <FaGraduationCap className="w-full h-full text-teal-400" />
          </motion.div>

          {/* Musical Notes Floating */}
          <motion.div
            className="absolute top-1/4 left-1/3 text-4xl text-purple-300/15"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ♪
          </motion.div>
          
          <motion.div
            className="absolute top-3/4 right-1/4 text-5xl text-blue-300/15"
            animate={{
              y: [0, -40, 0],
              rotate: [0, -20, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            ♫
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/3 left-1/5 text-3xl text-pink-300/15"
            animate={{
              y: [0, -35, 0],
              x: [0, 15, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          >
            ♪
          </motion.div>
          
          <motion.div
            className="absolute top-1/2 right-1/6 text-4xl text-yellow-300/15"
            animate={{
              y: [0, -25, 0],
              x: [0, -20, 20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            ♫
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          {/* Footer Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl mb-6 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaMusic className="text-white text-3xl" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-oswald font-black mb-4 tracking-wide">
              <span className="bg-gradient-to-r from-red-500 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                MusicKatta
              </span>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto font-oswald font-semibold">
              <span className="text-purple-600 font-bold">Feel the Music.</span>{' '}
              <span className="text-blue-600 font-bold">Learn the Art.</span>{' '}
              <span className="text-pink-600 font-bold">Join the community</span>{' '}
              <span className="text-gray-700 font-medium">of passionate musicians.</span>
            </p>
          </motion.div>

          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Our Impact */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-oswald font-black mb-4 flex items-center gap-2 tracking-wide">
                <FaAward className="text-yellow-500" />
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent uppercase">
                  Our Impact
                </span>
              </h3>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-white/95 rounded-lg hover:bg-white transition-colors shadow-md border border-white/50"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaUsers className="text-blue-500" />
                  <div>
                    <div className="font-bold text-lg text-gray-800">1,250+</div>
                    <div className="text-gray-600 text-sm">Happy Students</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-white/95 rounded-lg hover:bg-white transition-colors shadow-md border border-white/50"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaGraduationCap className="text-green-500" />
                  <div>
                    <div className="font-bold text-lg text-gray-800">15+</div>
                    <div className="text-gray-600 text-sm">Expert Courses</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-white/95 rounded-lg hover:bg-white transition-colors shadow-md border border-white/50"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaClock className="text-purple-500" />
                  <div>
                    <div className="font-bold text-lg text-gray-800">24/7</div>
                    <div className="text-gray-600 text-sm">Learning Access</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-oswald font-black mb-4 tracking-wide">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent uppercase">
                  Quick Links
                </span>
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'About Us', href: '#about' },
                  { name: 'Courses', href: '#courses' },
                  { name: 'Live Classes', href: '#live' },
                  { name: 'Contact', href: '#contact' },
                  { name: 'Student Portal', href: '/dashboard' }
                ].map((link, index) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href={link.href}
                      className="block text-gray-600 hover:text-blue-600 transition-colors py-1 hover:bg-blue-50 px-2 rounded font-medium"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Popular Courses */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-xl font-oswald font-black mb-4 tracking-wide">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent uppercase">
                  Popular Courses
                </span>
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Guitar Mastery', rating: 4.9 },
                  { name: 'Piano Fundamentals', rating: 4.8 },
                  { name: 'Vocal Training', rating: 4.9 },
                  { name: 'Music Production', rating: 4.7 },
                  { name: 'Song Writing', rating: 4.8 },
                  { name: 'Music Theory', rating: 4.6 }
                ].map((course, index) => (
                  <motion.div
                    key={course.name}
                    className="flex items-center justify-between text-gray-600 hover:text-purple-600 transition-colors py-1 hover:bg-purple-50 px-2 rounded"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-sm font-medium">{course.name}</span>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-xs" />
                      <span className="text-xs font-bold text-gray-800">{course.rating}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact & Social */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-oswald font-black mb-4 tracking-wide">
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent uppercase">
                  Get In Touch
                </span>
              </h3>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaPhone className="text-green-500" />
                  <span className="text-sm font-medium">+1 (555) 123-MUSIC</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaEnvelope className="text-blue-500" />
                  <span className="text-sm font-medium">hello@musickatta.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaMapMarkerAlt className="text-red-500" />
                  <span className="text-sm font-medium">Music City, Harmony Street</span>
                </motion.div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <h4 className="text-lg font-oswald font-black mb-3 tracking-wide">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent uppercase">
                    Follow Our Journey
                  </span>
                </h4>
                <div className="flex gap-3">
                  {[
                    { icon: FaFacebook, color: 'text-blue-500', href: '#' },
                    { icon: FaTwitter, color: 'text-sky-400', href: '#' },
                    { icon: FaInstagram, color: 'text-pink-500', href: '#' },
                    { icon: FaYoutube, color: 'text-red-500', href: '#' },
                    { icon: FaLinkedin, color: 'text-blue-600', href: '#' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-white/95 rounded-lg flex items-center justify-center ${social.color} hover:bg-white transition-colors shadow-md border border-white/50`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <social.icon className="text-lg" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div 
            className="border-t border-gray-200/50 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-700 flex items-center gap-2 font-oswald font-semibold">
                © {new Date().getFullYear()}{' '}
                <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent font-black">
                  MusicKatta
                </span>
                . All rights reserved. Made with <FaHeart className="text-red-500 animate-pulse" /> for{' '}
                <span className="text-purple-600 font-bold">music lovers</span>.
              </p>
              <div className="flex gap-6 text-sm text-gray-600">
                <Link href="/privacy" className="hover:text-purple-600 transition-colors font-oswald font-semibold hover:bg-purple-50 px-2 py-1 rounded">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-blue-600 transition-colors font-oswald font-semibold hover:bg-blue-50 px-2 py-1 rounded">Terms of Service</Link>
                <Link href="/support" className="hover:text-green-600 transition-colors font-oswald font-semibold hover:bg-green-50 px-2 py-1 rounded">Support</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>

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