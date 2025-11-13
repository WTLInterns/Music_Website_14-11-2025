import { motion } from 'framer-motion'
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaMusic, FaHeadphones, FaGuitar } from 'react-icons/fa'
import { GiPianoKeys, GiDrumKit } from 'react-icons/gi'
import Image from 'next/image'

export default function Contact() {
  const whatsappNumber = '1234567890'
  const message = encodeURIComponent('Hi! I would like to know more about MusicKatta courses.')
  const waLink = `https://wa.me/${whatsappNumber}?text=${message}`

  const floatingIcons = [
    { icon: FaMusic, delay: 0, duration: 6 },
    { icon: FaGuitar, delay: 1, duration: 5 },
    { icon: GiPianoKeys, delay: 2, duration: 7 },
    { icon: GiDrumKit, delay: 3, duration: 6 },
    { icon: FaHeadphones, delay: 4, duration: 5 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-3xl"></div>
        
        {/* Floating Music Icons */}
        {floatingIcons.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={index}
              className="absolute text-gray-400/20"
              initial={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50 
              }}
              animate={{
                x: [null, Math.random() * 200 - 100, Math.random() * 100 - 50],
                y: [null, Math.random() * 200 - 100, Math.random() * 100 - 50],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay
              }}
              style={{
                left: `${20 + index * 15}%`,
                top: `${20 + (index % 3) * 20}%`,
              }}
            >
              <Icon className="w-16 h-16 md:w-24 md:h-24" />
            </motion.div>
          )
        })}
      </div>

      <div className="relative z-10 py-8 px-4">
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
              Let's <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Connect</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Ready to start your musical journey? We're here to guide you every step of the way.
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
                    detail: "+91 12345 67890",
                    color: "from-green-500 to-emerald-600",
                    link: waLink
                  },
                  {
                    icon: FaEnvelope,
                    title: "Email Us",
                    description: "Detailed inquiries",
                    detail: "hello@musickatta.com",
                    color: "from-blue-500 to-cyan-600",
                    link: "mailto:hello@musickatta.com"
                  },
                  {
                    icon: FaPhone,
                    title: "Call Us",
                    description: "Direct conversation",
                    detail: "+91 98765 43210",
                    color: "from-purple-500 to-pink-600",
                    link: "tel:+919876543210"
                  },
                  {
                    icon: FaMapMarkerAlt,
                    title: "Visit Studio",
                    description: "In-person sessions",
                    detail: "Mumbai, India",
                    color: "from-orange-500 to-red-600",
                    link: "#"
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
                    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 hover:bg-white transition-all duration-500 group-hover:border-purple-400/50 shadow-lg hover:shadow-xl">
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

              {/* Image below Visit Studio */}
              <div className="relative w-full h-16 rounded-lg overflow-hidden">
                <Image 
                  src="/images/music5.jpg" 
                  alt="Music Studio"
                  fill
                  className="object-cover rounded-lg"
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
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-2xl">
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