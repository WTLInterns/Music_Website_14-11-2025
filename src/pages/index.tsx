import Link from 'next/link'
import { useEffect, useState, useRef, useContext, createContext } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

import About from './about'
import CoursesPage from './courses'
import LiveClasses from './live-classes'
import Contact from './contact'
import Image from 'next/image'

import { FaMusic, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaClock, FaGraduationCap, FaUsers, FaAward, FaHeart, FaStar, FaWhatsapp, FaPlay } from 'react-icons/fa'

// Video context for managing sequential playback
const VideoContext = createContext<{
  currentPlayingIndex: number | null
  setCurrentPlayingIndex: (index: number | null) => void
}>({
  currentPlayingIndex: null,
  setCurrentPlayingIndex: () => {}
})

// Student Video Player Component
function StudentVideoPlayer({ src, title, index, totalVideos }: { 
  src: string; 
  title: string; 
  index: number; 
  totalVideos: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const { currentPlayingIndex, setCurrentPlayingIndex } = useContext(VideoContext)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible
          setIsVisible(entry.isIntersecting)
          
          // When this video becomes visible and no video is playing, start this one
          if (entry.isIntersecting && !wasVisible && currentPlayingIndex === null) {
            console.log(`Video ${index} became visible, starting playback`)
            setCurrentPlayingIndex(index)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    // Capture the video element to use in cleanup
    const videoElement = videoRef.current;
    
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement)
      }
    }
  }, [isVisible, currentPlayingIndex, index, setCurrentPlayingIndex])

  useEffect(() => {
    if (videoRef.current) {
      if (currentPlayingIndex === index && isVisible) {
        // This video should be playing
        console.log(`Playing video ${index}`)
        videoRef.current.play().catch(error => {
          console.log('Autoplay was prevented:', error)
        })
        setIsPlaying(true)
      } else {
        // This video should not be playing
        console.log(`Pausing video ${index}`)
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        setIsPlaying(false)
      }
    }
  }, [currentPlayingIndex, index, isVisible])

  const handlePlay = () => {
    if (videoRef.current) {
      if (currentPlayingIndex === index) {
        // Stop this video
        videoRef.current.pause()
        setCurrentPlayingIndex(null)
        setIsPlaying(false)
      } else {
        // Play this video, stop others
        setCurrentPlayingIndex(index)
        setIsPlaying(true)
      }
    }
  }

  return (
    <motion.div 
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={handlePlay}
    >
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-gray-900">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={src}
          muted={false}
          loop
          playsInline
          preload="metadata"
        />
        
        {/* Overlay when not playing */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div 
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center text-white">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2"
                >
                  <FaPlay className="w-5 h-5 ml-1" />
                </motion.div>
                <p className="text-xs font-medium opacity-80">Click to play</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playing indicator */}
        {isPlaying && (
          <motion.div 
            className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Playing
          </motion.div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-white font-semibold text-sm">{title}</h3>
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  
  const [isHeroHover, setIsHeroHover] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const mouseXSpring = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const mouseYSpring = useSpring(mouseY, { stiffness: 120, damping: 20 })
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ['-2%', '2%'])
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ['-2%', '2%'])
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['35%', '65%'])
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['25%', '55%'])
  const textX = useTransform(mouseXSpring, [-0.5, 0.5], ['-10px', '10px'])
  const textY = useTransform(mouseYSpring, [-0.5, 0.5], ['-8px', '8px'])
  
  const achievementImages = [
    { name: 'Parth', image: '/images/acheivement/images1.jpeg' },
    { name: 'Aroosh', image: '/images/acheivement/images2.jpeg' },
    { name: 'Nimit', image: '/images/acheivement/images3.jpeg' },
    { name: 'Kiana', image: '/images/acheivement/images4.jpeg' },
    { name: 'Saathvik', image: '/images/acheivement/images5.jpeg' },
    { name: 'Harishith', image: '/images/acheivement/images6.jpeg' },
    { name: 'Sharanya', image: '/images/acheivement/images7.jpeg' },
    { name: 'Sunil', image: '/images/acheivement/images8.jpeg' },
  ]

  const testimonials = [
    {
      name: 'Atul Dixit',
      role: 'Guitar Student',
      content:
        'Learning with Ddhawal sir has been a wonderful experience—he is warm, considerate, and consistently patient, which makes lessons comfortable and motivating. His knowledge and talent really show in the way he explains concepts clearly and helps correct mistakes without rushing. Strongly recommending Muziik Katta to anyone who wants to learn Guitar, Flute, Keyboard, or Ukulele with the right guidance.',
    },
    {
      name: 'Abhishek Ushekwar',
      role: 'Guitar Servicing at Muziik Katta',
      content:
        "Got my guitar strung and serviced at Muziik Katta and I couldn’t be happier with the experience. Mr. Dhaval is extremely polite, professional, and clearly knows his craft inside out. He handled my guitar with great care and gave it a fresh new life — it sounds and feels fantastic now! What stood out the most was his attention to detail and the genuine passion he brings to his work. On top of that, the pricing was very reasonable, especially considering the high quality of service. Highly recommend Muziik Katta to anyone looking for trustworthy and expert guitar servicing.",
    },
    {
      name: 'Praraji Chopde',
      role: 'Music Student',
      content:
        'An amazing music teacher! Very patient, knowledgeable, and passionate about teaching. Lessons are always enjoyable, well-structured, and motivating. I’ve learned so much and gained confidence because of their guidance. Highly recommend to anyone who wants to truly enjoy learning music!',
    },
    {
      name: 'Prateek Dongre',
      role: 'Guitar Student',
      content:
        'I’ve been taking guitar classes here for a while, and it’s been a fantastic experience! The teaching style is patient, easy to follow, and really helps build confidence. I’ve noticed huge improvements in my playing and understanding of music. Highly recommended for anyone who wants to learn guitar the right way!',
    },
    {
      name: 'Ajay Mohite',
      role: "Parent – Piano Student",
      content:
        "We are very happy with our daughter's piano learning experience at Muziik Katta, Kharadi. Dhawal Mulay Sir teaches with great patience and ensures each concept is understood clearly. He maintains a perfect balance of discipline and encouragement during class. Our daughter looks forward to every session and has developed a genuine interest in music. Thank you for nurturing her talent so well!",
    },
    {
      name:'Sagar Jadhav',
      role:'Guitar Student',
      content:'We live near Kharadi and I was looking kid’s music classes in Kharadi for my 6 year girl. She is very shy but after joining Muziik Katta, she become confident and learn ukulele fast. I really thank to teacher who is very kind. Other kids learn keyboard and flute also. This is very best music classes in Kharadi with very neat class. Even I’m planning to join guitar classes near me soon. It’s best place for both kids and parents to learn music'
    },
    {
      name:'MAHESH X!',
      role:'',
      content:'Im really glad to give a feedback for Muziik Katta. Its a very nice experience for me as I learning to play guitar. Dhaval Sir is very polite and He is really expert in musical instruments like Guitar, Keyboard, Yuko leli and Flute. So I will surely recommend them who interested to learn the musical instruments. 5 Stars from me'
    },
    {
      name:'Kiran Marsale',
      role:'',
      content:'No doubt...Sir is having very large experience and expertise in instruments playing and teaching. For Guitar there is a very well organised course on Udemy as well for beginners. Along with this he is very Kind and Supportive!!'
    },
    {
      name:'Payas Pawar',
      role:'',
      content:'An excellent music class with passionate instructors and a warm, encouraging atmosphere. Whether you’re just starting out or looking to take your skills to the next level, this class has something for everyone. Flexible scheduling, personalised instruction, and great attention to detail make it a standout choice'
    },
    {
      name:'Rishabh Richhariya',
      role:'',
      content:'I’ve thoroughly enjoyed the guitar music class and want to express my appreciation for the overall experience. The structure of the lessons has been well-paced, balancing technical skill-building with creativity. Whether it’s learning chords, fingerstyle techniques, or music theory, each topic is presented clearly and in a way that builds confidence.'
    },
    {
      name:'vedant Dharme',
      role:'',
      content:'The guitar practice sessions at Muziik Katta are exceptionally beneficial! They work on enhancing techniques, developing finger motions, and generating self confidence. The interactive method keeps students interested even when learning new skills. Those sessions are perfect for beginners and experienced players attempting to hone their skills!'
    },
    {
      name:'Janhavi Kedare',
      role:'',
      content:'Muziik Katta is the best music school in Kharadi! Their guitar classes near me are top-notch, and the instructors are incredibly patient and skilled. Highly recommend for anyone seeking quality music education in the area. thanks dhawal sir. Best music school.'
    },
    {
      name:'Srinath',
      role:'',
      content:'Dhaval is a great teacher. I\'m able to gain confidence while learning the guitar and hoping that I\'ll be able to play full songs one day.'
    },
    {
      name:'Rajashri Dandge',
      role:'',
      content:'Muziik Katta is the precise place for new guitarists! The step-by-step guidance makes learning easy, even for people with no experience. The instructors consciousness on basics like strumming, chords, and rhythm earlier than transferring to superior techniques. The amusing and interactive method continues. Extraordinarily endorsed for beginners.'
    },
    {
      name:'Vishakha Suryawanshi',
      role:'',
      content:'Enrolled my daughter in kids music classes in Kharadi at Muziik Katta. The friendly atmosphere and skilled teachers have boosted her confidence and musical abilities. Highly recommended for young learners and all age.'
    },
    {
      name:'Pranay Ghanwat',
      role:'',
      content:'Muziik Katta stands proud as one of the top music classes in Pune! The teachers are enormously experienced, and the curriculum is designed for all ability ranges. The ecosystem is motivating, making it an awesome vicinity to examine. Whether you\'re into guitar, keyboard, or vocals, this school offers exceptional schooling.'
    },
    {
      name:'Saransh Kathal',
      role:'',
      content:'One of the best teacher you can ever find, always compassionate and immensely talented, hats off and bow to the best music \'guru\' I have ever had in my life.'
    },
    {
      name:'Akash Subbannavar',
      role:'',
      content:'Looking for music classes near you? Muziik Katta in Kharadi offers a wide range of instruments and experienced teachers. Thanks sir. My child loves the engaging environment and has shown great progress.'
    },
    {
      name:'Kedar Gadilkar',
      role:'',
      content:'Dhaval sir, is very kind, supportive and very dedicated with respect to the teaching skils and support to students. I am very satisfied with my daughter\'s over all progress in Guitar 🎸 Thanks sir.'
    },
    {
      name:'namra sagri',
      role:'',
      content:'I\'m currently taking guitar lessons with Dhaval Sir, and it\'s been an amazing experience. The lessons are clear, engaging, and tailored to my learning style. Sir is patient, encouraging, and really knows how to explain concepts in a way that\'s easy to understand. I\'ve already noticed improvements in my playing and look forward to each class!'
    },

  ]

  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [testimonialDirection, setTestimonialDirection] = useState<1 | -1>(1)

  useEffect(() => {
    if (testimonials.length <= 1) return
    const id = setInterval(() => {
      setTestimonialDirection(1)
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(id)
  }, [testimonials.length])

  const [isMobileHero, setIsMobileHero] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(max-width: 768px)')
    const apply = () => setIsMobileHero(mq.matches)

    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <div className="w-full">
      {/* Home Section - Full Width */}
      <section
        id="home"
        className="anchor-section relative overflow-hidden w-full min-h-[90vh]"
        onMouseEnter={() => setIsHeroHover(true)}
        onMouseMove={(e) => {
          if (isMobileHero) return
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
          const px = (e.clientX - rect.left) / rect.width - 0.5
          const py = (e.clientY - rect.top) / rect.height - 0.5
          mouseX.set(px)
          mouseY.set(py)
        }}
        onMouseLeave={() => {
          setIsHeroHover(false)
          mouseX.set(0)
          mouseY.set(0)
        }}
      >
        {/* Background Image with Next.js Image component */}
        <motion.div className="absolute inset-0 w-full h-[90vh]" style={isMobileHero ? undefined : ({ x: bgX, y: bgY } as any)}>
          <Image
            src="/images/music2.jpg"
            alt="Music Background"
            fill
            className="object-cover w-full object-[55%_center] md:object-center"
            priority
          />
          <div className="absolute inset-0 hero-overlay opacity-0 md:opacity-100" />
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            ['--x' as any]: glowX,
            ['--y' as any]: glowY,
            background:
              'radial-gradient(520px circle at var(--x) var(--y), rgba(255,255,255,0.16), rgba(0,0,0,0) 62%)',
          } as any}
          animate={{ opacity: isHeroHover ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        <motion.div
          className="absolute pointer-events-none w-2.5 h-2.5 rounded-full bg-white/80 shadow-[0_0_0_6px_rgba(255,255,255,0.12),0_0_22px_rgba(255,255,255,0.28)] -translate-x-1/2 -translate-y-1/2"
          style={{ left: glowX, top: glowY } as any}
          animate={{ opacity: isHeroHover ? 1 : 0, scale: isHeroHover ? 1 : 0.7 }}
          transition={{ duration: 0.18 }}
        />
        
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
          <motion.div className="px-8 md:px-16 lg:px-24 py-16 md:py-24 text-left max-w-2xl" style={{ x: textX, y: textY }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-oswald font-bold leading-tight mb-4 tracking-wide"
            >
              <span className="text-black md:text-white font-extrabold">Feel the Music.</span>{' '}
              <span className="text-black md:text-white font-extrabold">Learn the Art.</span>{' '}
              <span className="bg-gradient-to-b from-yellow-500 via-orange-600 to-red-600 bg-clip-text text-transparent font-black">Join Muziik Katta.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white md:text-gray-200 mb-8 leading-relaxed max-w-xl font-oswald font-medium tracking-wide"
            >
              Premium courses and OffLine Classes with a modern, performance-first curriculum.
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
              {/* <Link 
                href="#live" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-oswald font-bold text-lg transition-all duration-300 transform hover:scale-105 text-center tracking-wide uppercase"
              >
                Join OffLine Classes
              </Link> */}
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
          </motion.div>
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

      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
          <div className="relative w-full max-w-sm aspect-[5/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 group">
            <Image
              src="/images/acheivement/owner.jpeg"
              alt="Dhavval Mulay - Music Educator"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="w-full">
            <p className="text-sm font-oswald font-semibold uppercase tracking-[0.25em] text-red-500 mb-2">
              About Me
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-oswald font-black text-gray-900 mb-4 leading-tight">
              Dhavval Mulay
            </h2>
            <p className="text-sm md:text-base font-oswald font-semibold text-gray-500 mb-6">
              Guitarist, Singer & Trinity-Certified Music Educator
            </p>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed font-oswald font-medium">
              <p>
                Dhavval Mulay is a passionate guitarist and singer with over 15 years of experience in music education.
                He has successfully trained more than 5,000 students, inspiring learners of all ages to discover their musical potential.
              </p>
              <p>
                A Trinity-certified music educator, Dhavval Mulay has worked with reputed institutions such as Lexicon International School and
                HDFC School, Pune, bringing structured, high-quality music education into academic environments.
              </p>
              <p>
                He specializes in teaching guitar, keyboard, ukulele, and vocals, blending strong technical foundations with creativity and
                performance-oriented training. Known for his engaging teaching style and deep musical knowledge, Dhavval Mulay continues to
                shape confident musicians and performers year after year.
              </p>
            </div>
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

      <section className="w-full bg-gray-50 py-16 font-oswald">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <FaAward className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-oswald font-black tracking-wide text-gray-900">
                  Achievements by students
                </h2>
                <p className="text-sm md:text-base text-gray-600 font-oswald font-medium">
                  Celebrating real performances and milestones from our Muziik Katta family.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-oswald">
            {achievementImages.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => {
                  setSelectedImageIndex(index);
                  setModalOpen(true);
                }}
              >
                <div className="relative w-full h-60 md:h-72 rounded-3xl overflow-hidden shadow-md group-hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={achievement.image}
                    alt={achievement.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                    <div>
                      <p className="text-[11px] md:text-xs uppercase tracking-[0.18em] font-semibold text-gray-200">
                        Student Achievement
                      </p>
                      <p className="text-sm md:text-base font-bold leading-tight">
                        {achievement.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full text-[10px] md:text-xs backdrop-blur-sm border border-white/20">
                      <FaStar className="text-yellow-300 w-3 h-3" />
                      <span className="font-semibold">Featured</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal for displaying larger images */}
          {modalOpen && selectedImageIndex !== null && (
            <div 
              className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
              onClick={() => setModalOpen(false)}
            >
              <div 
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10 hover:bg-black/70 transition-colors"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="flex justify-center">
                  <Image
                    src={achievementImages[selectedImageIndex].image}
                    alt={`Student achievement ${selectedImageIndex + 1}`}
                    width={800}
                    height={600}
                    className="object-contain max-h-[80vh]"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        
      </section>

      <VideoContext.Provider value={{ currentPlayingIndex, setCurrentPlayingIndex }}>
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white font-oswald">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Performances</span>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Watch our talented students showcase their musical journey and achievements
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { id: 1, src: '/images/acheivement/studentvideo1.mp4', title: 'Guitar Performance' },
                { id: 2, src: '/images/acheivement/studentvideo2.mp4', title: 'Guitar Performance' },
                { id: 3, src: '/images/acheivement/studentvideo3.mp4', title: 'Guitar Performance' },
                { id: 4, src: '/images/acheivement/studentvideo4.mp4', title: 'Keyboard Performance' },
                { id: 5, src: '/images/acheivement/studentvideo5.mp4', title: 'Guitar Performance' },
                { id: 6, src: '/images/acheivement/studentvideo6.mp4', title: 'Guitar Performance' }


              ].map((video, index) => (
                <StudentVideoPlayer 
                  key={video.id}
                  src={video.src}
                  title={video.title}
                  index={index}
                  totalVideos={4}
                />
              ))}
            </div>
          </div>
        </section>
      </VideoContext.Provider>

      {/* OffLine Classes Section - Full Width */}
      <section id="live" className="anchor-section w-full font-oswald">
        <LiveClasses />
      </section>

      {/* <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center">
            <p className="text-xs md:text-sm font-oswald font-semibold uppercase tracking-[0.25em] text-gray-500 mb-1">
              Voices of Muziik Katta
            </p>
            <h2 className="text-2xl md:text-3xl font-oswald font-black text-gray-900 mb-2">
              EXCELLENT
            </h2>
            <div className="flex items-center justify-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className="w-5 h-5 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs md:text-sm font-oswald text-gray-600 mb-2">
              Based on 158 reviews
            </p>
            <p className="text-sm md:text-base font-oswald font-semibold tracking-wide">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </p>
          </div>
          <div className="relative">
            <motion.div
              key={testimonialIndex}
              className="relative"
              initial={{ opacity: 0, x: testimonialDirection > 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleTestimonials.map((item, index) => (
                  <motion.div
                    key={item.name + index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="relative bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-oswald font-bold text-sm">
                        {item.name
                          .split(' ')
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="text-sm md:text-base font-oswald font-semibold text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-xs md:text-xs font-oswald text-gray-500">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                      <span className="text-xs font-oswald font-semibold text-gray-600 ml-1">5.0</span>
                    </div>

                    <p className="text-sm md:text-[15px] leading-relaxed text-gray-700 font-oswald flex-1">
                      {item.content}
                    </p>
                  </motion.div>
                ))}
              </div>

              {testimonials.length > 3 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setTestimonialIndex((prev) => {
                        setTestimonialDirection(-1)
                        return (prev - 1 + testimonials.length) % testimonials.length
                      })
                    }

                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-gray-700 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous testimonials</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setTestimonialIndex((prev) => {
                        setTestimonialDirection(1)
                        return (prev + 1) % testimonials.length
                      })
                    }

                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-gray-700 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next testimonials</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section> */}


      <section className="w-full bg-white py-9">
  <div className="max-w-7xl mx-auto px-4">
    <div className="mb-10 text-center">
      {/* <p className="text-xs md:text-sm font-oswald font-semibold uppercase tracking-[0.25em] text-gray-500 mb-1">
        Voices of Muziik Katta
      </p> */}
      <h2 className="text-2xl md:text-3xl font-oswald font-black text-gray-900 mb-2">
        Google Reviews
      </h2>
      <div className="flex items-center justify-center gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className="w-5 h-5 text-yellow-400" />
        ))}
      </div>
      <p className="text-xs md:text-sm font-oswald text-gray-600 mb-2">
        Based on 161 reviews
      </p>
      <p className="text-lg md:text-xl font-oswald font-semibold tracking-wide">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </p>
    </div>

    <div className="relative h-[320px] md:h-[300px] overflow-hidden">
      <motion.div
        key={testimonials[testimonialIndex]?.name}
        initial={{ opacity: 0, x: testimonialDirection > 0 ? 80 : -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-oswald font-bold text-sm">
              {testimonials[testimonialIndex]?.name
                ?.split(' ')
                ?.filter(Boolean)
                ?.slice(0, 2)
                ?.map(part => part[0])
                ?.join('')}
            </div>
            <div>
              <p className="text-base md:text-lg font-oswald font-semibold text-gray-900">
                {testimonials[testimonialIndex]?.name}
              </p>
              <p className="text-xs md:text-sm font-oswald text-gray-500">
                {testimonials[testimonialIndex]?.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="w-4 h-4 text-yellow-400" />
            ))}
            <span className="text-xs font-oswald font-semibold text-gray-600 ml-1">
              5.0
            </span>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-gray-700 font-oswald flex-1">
            {testimonials[testimonialIndex]?.content}
          </p>
        </div>
      </motion.div>

      {testimonials.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => {
              setTestimonialDirection(-1)
              setTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
            }}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-gray-700 hover:bg-gray-50"
          >
            <span className="sr-only">Previous testimonial</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => {
              setTestimonialDirection(1)
              setTestimonialIndex(prev => (prev + 1) % testimonials.length)
            }}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center text-gray-700 hover:bg-gray-50"
          >
            <span className="sr-only">Next testimonial</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </div>
  </div>
</section>

      {/* Contact Section - Full Width */}
      <section id="contact" className="anchor-section w-full font-oswald">
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
        <div className="absolute inset-0 pointer-events-none overflow-hidden font-oswald">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 font-oswald">
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
              <span className="bg-gradient-to-b from-yellow-500 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Muziik Katta
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10 mb-12">
            
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
                    <div className="font-bold text-lg text-gray-800">5000+</div>
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
                    <div className="text-gray-600 text-sm">Years Of Experience</div>
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
                  // { name: 'OffLine Classes', href: '#live' },
                  { name: 'Contact', href: '#contact' },
                  // { name: 'Student Portal', href: '/dashboard' }
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
                  Highlights                </span>
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Guitar Fundamentals', rating: 4.9 },
                  { name: 'Keyboard Techniques', rating: 4.8 },
                  { name: 'Vocal Training', rating: 4.9 },
                  { name: 'Music Theory', rating: 4.7 },
                  { name: 'Ukulele Training', rating: 4.6 }
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
                  className="flex items-start gap-3 text-gray-600 hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaPhone className="text-green-500" />
                  <span className="text-sm font-medium break-words">+91 9712926885</span>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-3 text-gray-600 hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaEnvelope className="text-blue-500" />
                  <span className="text-sm font-medium break-words">dhavalmulay@gmail.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-3 text-gray-600 hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaMapMarkerAlt className="text-red-500" />
                  <span className="text-sm font-medium break-words leading-relaxed">Sagar Plot no.17 Parashar hsg soc Nr down town Langstone, Kharadi, Pune, Maharashtra 411014</span>
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
                    { icon: FaFacebook, color: 'text-blue-500', href: 'https://www.facebook.com/share/1GhBhhajRR/' },
                    // { icon: FaTwitter, color: 'text-sky-400', href: '#' },
                    { icon: FaInstagram, color: 'text-pink-500', href: 'https://www.instagram.com/dhavvalmulay?igsh=bDBxMjN3a2w1djl6' },
                    { icon: FaYoutube, color: 'text-red-500', href: 'https://youtube.com/@ddhavalmulay?si=0MmXb4ZlVs-4XfLq' },
                    // { icon: FaLinkedin, color: 'text-blue-600', href: '#' }
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
              <p className="text-gray-700 flex flex-wrap items-center justify-center md:justify-start gap-2 font-oswald font-semibold text-center md:text-left">
                {new Date().getFullYear()}{' '}
                <span className="bg-gradient-to-b from-yellow-500 via-orange-600 to-red-600 bg-clip-text text-transparent font-black">
                  Muziik Katta
                </span>
                . All rights reserved. Made with <FaHeart className="text-red-500 animate-pulse" /> for{' '}
                <span className="text-purple-600 font-bold">music lovers</span>.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-gray-600">
                <Link href="/privacy-policy" className="hover:text-purple-600 transition-colors font-oswald font-semibold hover:bg-purple-50 px-2 py-1 rounded">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-blue-600 transition-colors font-oswald font-semibold hover:bg-blue-50 px-2 py-1 rounded">Terms & Conditions</Link>
                <Link href="/refund-policy" className="hover:text-blue-600 transition-colors font-oswald font-semibold hover:bg-blue-50 px-2 py-1 rounded">Refund Policy</Link>
                <Link href="/disclaimer" className="hover:text-blue-600 transition-colors font-oswald font-semibold hover:bg-blue-50 px-2 py-1 rounded">Disclaimer</Link>

                {/* <Link href="/support" className="hover:text-green-600 transition-colors font-oswald font-semibold hover:bg-green-50 px-2 py-1 rounded">Support</Link> */}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/919712926885" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 md:bottom-8 md:right-8"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
      </a>

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