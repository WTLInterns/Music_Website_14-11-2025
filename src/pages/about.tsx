import Image from 'next/image'
import { useEffect, useState, useRef, type FormEvent } from 'react'
import { FaUsers, FaMusic, FaGuitar, FaHeadphones, FaStar, FaAward, FaPlay, FaChartLine, FaGlobe, FaHeart, FaTimes } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function About() {
  const router = useRouter();
  const [students, setStudents] = useState(0)
  const [classes, setClasses] = useState(0)
  const [courses, setCourses] = useState(0)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [isBookDemoModalOpen, setIsBookDemoModalOpen] = useState(false)
  const [inquiryType, setInquiryType] = useState<'demo' | 'offline'>('demo')
  const [bookDemoFullName, setBookDemoFullName] = useState('')
  const [bookDemoMobile, setBookDemoMobile] = useState('')
  const [bookDemoInstrument, setBookDemoInstrument] = useState('')
  const [bookDemoError, setBookDemoError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const animate = (target: number, setter: (n: number) => void, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 20);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 20);
    }
    
    animate(5000, setStudents, 1800);
    animate(15, setClasses, 1600);
    animate(5, setCourses, 1400);
  }, [])

  useEffect(() => {
    if (!isBookDemoModalOpen && !isDemoModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBookDemoModalOpen(false);
        setIsDemoModalOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isBookDemoModalOpen, isDemoModalOpen])

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

    // Copy the current value of the ref to a variable to use in cleanup
    const videoElement = videoRef.current;

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [])

  const handleStartJourney = () => {
    router.push('/courses');
  }

  const handlePlayVideo = () => {
    setIsDemoModalOpen(true);
  }

  const handleStartFreeTrial = () => {
    router.push('/register');
  }

  const handleBookDemo = () => {
    setBookDemoError(null);
    setInquiryType('demo');
    setIsBookDemoModalOpen(true);
  }

  const handleOfflineClasses = () => {
    setBookDemoError(null);
    setInquiryType('offline');
    setIsBookDemoModalOpen(true);
  }

  const handleSubmitBookDemo = (e: FormEvent) => {
    e.preventDefault();
    setBookDemoError(null);

    const fullName = bookDemoFullName.trim();
    const mobile = bookDemoMobile.trim();
    const instrument = bookDemoInstrument.trim();

    if (!fullName) {
      setBookDemoError('Please enter your full name.')
      return;
    }

    const digitsOnly = mobile.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setBookDemoError('Please enter a valid mobile number.')
      return;
    }

    if (!instrument) {
      setBookDemoError('Please select an instrument type.')
      return;
    }

    const phone = inquiryType === 'offline' ? '919712926885' : '919527243062';
    const heading = inquiryType === 'offline' ? 'Offline Classes' : 'Book Demo Class';
    const message = `${encodeURIComponent(heading)}%0AFull Name: ${encodeURIComponent(fullName)}%0AMobile: ${encodeURIComponent(digitsOnly)}%0AInstrument: ${encodeURIComponent(instrument)}`;
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    setIsBookDemoModalOpen(false);
  }

  const features = [
    {
      icon: <FaGuitar className="w-8 h-8" />,
      title: "Learn Any Instrument",
      description: "Structured learning paths for guitar, ukulele, piano, and more",
      gradient: "from-purple-500 to-pink-500"
    },
    
    {
      icon: <FaHeadphones className="w-8 h-8" />,
      title: "Personalized Feedback",
      description: "Customized guidance and progress tracking for every student",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Progress Analytics",
      description: "Track your improvement with detailed analytics and insights",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{animationDelay: '4s'}}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 left-1/3 w-4 h-4 text-purple-400 animate-float text-3xl">♪</div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 text-pink-400 animate-bounceIcon text-2xl" style={{animationDelay: '1s'}}>♫</div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 text-yellow-400 animate-swing text-xl" style={{animationDelay: '2s'}}>♪</div>
        
        <div className="relative z-10 text-center font-oswald px-4 max-w-6xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We Make <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 inline-block"
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >Music</motion.span> 
            <br />Accessible to <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 inline-block"
              whileHover={{ scale: 1.1, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >Everyone</motion.span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming music education through innovative technology, expert mentorship, 
            and a passionate community of learners and creators.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button 
              onClick={handleStartJourney}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 ripple"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FaPlay className="w-4 h-4" />
              Start Your Journey
            </motion.button>
            <motion.button 
              onClick={handlePlayVideo}
              className="group border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-3 hover-lift"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <FaHeadphones className="w-4 h-4" />
              Watch Demo
            </motion.button>
          </div>
        </div>
      </section>

      {/* Stats Section - Moved Up and Smaller Cards */}
      <section className="relative -mt-16 py-8 bg-white font-oswald">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              className="text-center group p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-500 border border-gray-100 hover-lift"
              whileHover={{ scale: 1.05, rotate: 1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.div 
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {students}+
              </motion.div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Trainded Students</div>
              <p className="text-sm text-gray-600">Transforming lives through music</p>
            </motion.div>
            <motion.div 
              className="text-center group p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-500 border border-gray-100 hover-lift"
              whileHover={{ scale: 1.05, rotate: -1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.div 
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-cyan-600 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {classes}+
              </motion.div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Years Of Experience</div>
              <p className="text-sm text-gray-600">  Trusted experience shaping skilled and confident musicians.
</p>
            </motion.div>
            <motion.div 
              className="text-center group p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-500 border border-gray-100 hover-lift"
              whileHover={{ scale: 1.05, rotate: 1 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.div 
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                {courses}+
              </motion.div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Professional Training For Instruments</div>
              <p className="text-sm text-gray-600">  Learn instruments step by step with expert guidance and practical sessions.
</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section - Reduced Gap */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white font-oswald">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/2]">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay={isVideoVisible}
                  muted={false}
                  loop
                  playsInline
                  controls
                >
                  <source src="/images/acheivement/vedio.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                {!isVideoVisible && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="text-white text-center">
                      <FaPlay className="w-8 h-8 mx-auto mb-2 opacity-70" />
                      <p className="text-sm">Scroll to play</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Floating elements */}
              {/* <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaMusic className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">5.0</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                About <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 via-orange-600 to-red-600">Muziik Katta</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Muziik Katta is a dedicated music academy where passion meets professional training. Founded and led by Dhavval Mulay, an experienced and certified music educator, the academy offers structured and high-quality training in guitar, ukulele, keyboard, and vocals.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At Muziik Katta, students of all age groups are guided through a well-planned curriculum that focuses on strong fundamentals, practical skills, and performance confidence. With Dhavval Mulay&#39;s years of teaching and stage experience, students receive personalized attention and professional guidance to help them grow as confident musicians.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you are a beginner or looking to refine your musical skills, Muziik Katta provides a supportive, creative, and disciplined learning environment where music truly comes alive. 🎶
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                  <div className="text-gray-600">Practical Focus</div>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-gray-600">Access</div>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                  <div className="text-2xl font-bold text-green-600">1-on-1</div>
                  <div className="text-gray-600">Mentorship</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Muziik Katta Section */}
      <section className="py-16 bg-white font-oswald">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why <span className="relative inline-block group">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 via-orange-600 to-red-600 relative z-10">Muziik Katta</span>
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2 opacity-70 animate-wavy"></span>
              </span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&#39;ve reimagined music education for the digital age with features designed 
              to accelerate your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="group relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with music1.jpg Background */}
      <section className="relative py-20 overflow-hidden font-oswald">
        <div className="absolute inset-0">
          <Image 
            src="/images/music1.jpg" 
            alt="Music Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create <span className="text-yellow-300">Beautiful Music</span>?
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who have discovered their musical potential with Muziik Katta. 
            Your journey to musical mastery starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* <button 
              onClick={handleStartFreeTrial}
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 border-2 border-yellow-400"
            >
              <FaPlay className="w-4 h-4" />
              Start Free Trial
            </button> */}
            <button 
              onClick={handleBookDemo}
              className="bg-yellow-400 text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-3 border-2 border-white backdrop-blur-sm"
            >
              <FaHeadphones className="w-4 h-4" />
              Book Demo Class
            </button>
          </div>
        </div>
      </section>

      {/* Book Demo Class Modal */}
      <AnimatePresence>
        {isBookDemoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsBookDemoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm rounded-full p-3 text-gray-600 hover:bg-white/20 hover:text-gray-900 transition-all duration-300 border border-white/20"
                onClick={() => setIsBookDemoModalOpen(false)}
                aria-label="Close book demo modal"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8 font-oswald">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {inquiryType === 'offline' ? (
                    <>
                      Offline <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Classes</span>
                    </>
                  ) : (
                    <>
                      Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Demo Class</span>
                    </>
                  )}
                </h3>
                <p className="text-gray-600 mt-2">
                  Fill the details below and we’ll open WhatsApp with your request.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmitBookDemo}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      value={bookDemoFullName}
                      onChange={(e) => setBookDemoFullName(e.target.value)}
                      type="text"
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition text-black"
                      placeholder="Enter your full name"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile</label>
                    <input
                      value={bookDemoMobile}
                      onChange={(e) => setBookDemoMobile(e.target.value)}
                      type="tel"
                      inputMode="numeric"
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition text-black"
                      placeholder="Enter your mobile number"
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Instrument Type</label>
                    <select
                      value={bookDemoInstrument}
                      onChange={(e) => setBookDemoInstrument(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition bg-white text-black"
                    >
                      <option value="">Select an option</option>
                      <option value="Guitar">Guitar</option>
                      <option value="Ukulele">Ukulele</option>
                      <option value="Keyboard">Keyboard</option>
                      <option value="Vocal Training">Vocal Training</option>
                      <option value="Music Theory">Music Theory</option>
                      <option value="Flute">Flute</option>
                    </select>
                  </div>

                  {bookDemoError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {bookDemoError}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg"
                    >
                      Submit on WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBookDemoModalOpen(false)}
                      className="flex-1 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Video Modal */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setIsDemoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-sm rounded-full p-3 text-gray-600 hover:bg-white/20 hover:text-gray-900 transition-all duration-300 border border-white/20"
                onClick={() => setIsDemoModalOpen(false)}
                aria-label="Close demo modal"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              {/* Demo Video */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900">
                <video
                  className="w-full h-full object-cover"
                  src="/images/acheivement/demo video.mp4"
                  autoPlay
                  muted={false}
                  loop
                  playsInline
                  controls
                />
                
                {/* Video Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">Muziik Katta Demo</h3>
                  <p className="text-gray-300 text-sm mt-1">Experience our teaching approach</p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-5 mb-3 flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg"
                  onClick={() => {
                    setIsDemoModalOpen(false)
                    router.push('/courses')
                  }}
                >
                  <FaPlay className="w-4 h-4" />
                  Start Learning Journey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                  onClick={() => {
                    setIsDemoModalOpen(false)
                    handleOfflineClasses()
                  }}
                >
                  <FaUsers className="w-4 h-4" />
                  Offline Classes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* End of Final CTA */}
    </div>
  )
}