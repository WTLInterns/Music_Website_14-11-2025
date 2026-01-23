import { motion } from 'framer-motion'
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaMusic, FaHeadphones, FaGuitar } from 'react-icons/fa'
import { GiPianoKeys, GiDrumKit } from 'react-icons/gi'
import Image from 'next/image'

export default function Contact() {
  const whatsappNumber = '1234567890'
  const message = encodeURIComponent('Hi! I would like to know more about Muziik Katta courses.')
  const waLink = `https://wa.me/${whatsappNumber}?text=${message}`

  const floatingIcons = [
    { icon: FaMusic, delay: 0, duration: 6 },
    { icon: FaGuitar, delay: 1, duration: 5 },
    { icon: GiPianoKeys, delay: 2, duration: 7 },
    { icon: GiDrumKit, delay: 3, duration: 6 },
    { icon: FaHeadphones, delay: 4, duration: 5 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/90 to-purple-50/90 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Lighter Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-yellow-50/15 to-orange-50/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        
        {/* Swimming Guitar Images */}
        <motion.div
          className="absolute top-10 left-10 w-16 h-16 opacity-10"
          animate={{
            x: [0, 100, 200, 150, 0],
            y: [0, -50, 50, 100, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaGuitar className="w-full h-full text-purple-400" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-20 w-20 h-20 opacity-15"
          animate={{
            x: [0, -80, -160, -80, 0],
            y: [0, 80, -40, 120, 0],
            rotate: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <FaGuitar className="w-full h-full text-blue-400" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-1/4 w-14 h-14 opacity-12"
          animate={{
            x: [0, 120, -60, 180, 0],
            y: [0, -100, 80, -60, 0],
            rotate: [0, 180, 90, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          <FaGuitar className="w-full h-full text-pink-400" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 right-1/3 w-18 h-18 opacity-8"
          animate={{
            x: [0, -150, 100, -50, 0],
            y: [0, 70, -90, 140, 0],
            rotate: [0, 45, 135, 225, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        >
          <FaGuitar className="w-full h-full text-green-400" />
        </motion.div>

        {/* Enhanced Floating Music Icons */}
        {floatingIcons.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              className="absolute text-gray-300/15"
              initial={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50 
              }}
              animate={{
                x: [null, Math.random() * 300 - 150, Math.random() * 200 - 100],
                y: [null, Math.random() * 300 - 150, Math.random() * 200 - 100],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: item.duration + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay
              }}
              style={{
                left: `${15 + index * 18}%`,
                top: `${15 + (index % 4) * 20}%`,
              }}
            >
              <Icon className="w-12 h-12 md:w-16 md:h-16" />
            </motion.div>
          )
        })}
        
        {/* Musical Notes Floating */}
        <motion.div
          className="absolute top-1/4 left-1/3 text-4xl text-purple-200/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ♪
        </motion.div>
        
        <motion.div
          className="absolute top-3/4 right-1/4 text-5xl text-blue-200/20"
          animate={{
            y: [0, -30, 0],
            rotate: [0, -15, 15, 0],
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
        
        <motion.div
          className="absolute bottom-1/3 left-1/5 text-3xl text-pink-200/20"
          animate={{
            y: [0, -25, 0],
            x: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          ♪
        </motion.div>
      </div>

      <div className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Let&#39;s <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Connect</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Ready to start your musical journey? We&#39;re here to guide you every step of the way.
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Contact Information - Left Side */}
            <motion.div 
              className="lg:col-span-2 space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: FaWhatsapp,
                    title: "WhatsApp Chat",
                    description: "Quick responses",
                    detail: "+91 9712926885",
                    color: "from-green-500 to-emerald-600",
                    link: waLink
                  },
                  {
                    icon: FaEnvelope,
                    title: "Email Us",
                    description: "Detailed inquiries",
                    detail: "dhavalmulay@gmail.com",
                    color: "from-blue-500 to-cyan-600",
                    link: "mailto:dhavalmulay@gmail.com"
                  },
                  {
                    icon: FaPhone,
                    title: "Call Us",
                    description: "Direct conversation",
                    detail: "+91 9712926885",
                    color: "from-purple-500 to-pink-600",
                    link: "tel:+919876543210"
                  },
                  {
                    icon: FaMapMarkerAlt,
                    title: "Muziik katta Google profile",
                    description: "In-person sessions",
                    detail: "Pune, India",
                    color: "from-orange-500 to-red-600",
                    link: "https://share.google/62pxZRnEEOjP9zKI9"
                  }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target={item.link.includes('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="block group"
                    whileHover={{ scale: 1.02, x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-4 hover:bg-white transition-all duration-500 group-hover:border-purple-400/50 shadow-lg hover:shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <item.icon className="text-white text-lg" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-800 font-semibold text-base">{item.title}</h3>
                          <p className="text-gray-600 text-xs">{item.description}</p>
                          <p className="text-gray-800 font-medium text-sm">{item.detail}</p>
                        </div>
                        <div className="text-gray-400 group-hover:text-purple-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Google Maps below Visit Studio */}
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1891.1500946410624!2d73.94112333846192!3d18.560500338339768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c38689d82965%3A0xd2b2c0a4b99d9861!2sMuziik%20Katta!5e0!3m2!1sen!2sin!4v1768365277774!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-2xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                  <p className="text-gray-600 text-sm">We typically respond within 2 hours</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Full Name</label>
                      <input 
                        className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Email Address</label>
                      <input 
                        type="email"
                        className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Subject</label>
                    <input 
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm"
                      placeholder="What brings you here?"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Your Message</label>
                    <textarea 
                      className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 h-28 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none text-sm"
                      placeholder="Tell us about your musical aspirations..."
                    />
                  </div>

                  <motion.button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPaperPlane className="text-lg" />
                    Send Your Message
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}