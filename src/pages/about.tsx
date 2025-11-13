import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaUsers, FaMusic, FaGuitar, FaHeadphones, FaStar, FaAward, FaPlay, FaChartLine, FaGlobe, FaHeart } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function About() {
  const router = useRouter();
  const [students, setStudents] = useState(0)
  const [classes, setClasses] = useState(0)
  const [courses, setCourses] = useState(0)

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
    
    animate(1250, setStudents, 1800);
    animate(65, setClasses, 1600);
    animate(15, setCourses, 1400);
  }, [])

  const features = [
    {
      icon: <FaGuitar className="w-8 h-8" />,
      title: "Learn Any Instrument",
      description: "Structured learning paths for guitar, ukulele, piano, and more",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Live Interactive Classes",
      description: "Real-time sessions with expert instructors and peer collaboration",
      gradient: "from-blue-500 to-cyan-500"
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

  const handleStartJourney = () => {
    router.push('/register');
  }

  const handleWatchDemo = () => {
    router.push('/demo');
  }

  const handleStartFreeTrial = () => {
    router.push('/register');
  }

  const handleBookDemo = () => {
    router.push('/demo');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            We Make <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Music</span> 
            <br />Accessible to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Everyone</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transforming music education through innovative technology, expert mentorship, 
            and a passionate community of learners and creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleStartJourney}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              <FaPlay className="w-4 h-4" />
              Start Your Journey
            </button>
            <button 
              onClick={handleWatchDemo}
              className="group border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
            >
              <FaHeadphones className="w-4 h-4" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section - Moved Up and Smaller Cards */}
      <section className="relative -mt-16 py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center group p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-500 border border-gray-100">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {students}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Students</div>
              <p className="text-sm text-gray-600">Transforming lives through music</p>
            </div>
            <div className="text-center group p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-500 border border-gray-100">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-cyan-600 mb-2">
                {classes}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Live Classes</div>
              <p className="text-sm text-gray-600">Interactive learning experiences</p>
            </div>
            <div className="text-center group p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-500 border border-gray-100">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2">
                {courses}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Expert Courses</div>
              <p className="text-sm text-gray-600">Comprehensive learning paths</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Reduced Gap */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?auto=format&fit=crop&w=1000&q=80" 
                  alt="Music Learning Experience" 
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaMusic className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">5.0</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Story</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                MusicKatta was born from a simple belief: everyone deserves the joy of making music. 
                We're revolutionizing music education by combining cutting-edge technology with 
                time-tested teaching methods.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our platform brings together the best of both worlds - the personal touch of 
                expert instructors and the scalability of digital learning. Whether you're picking 
                up an instrument for the first time or refining advanced techniques, we're here 
                to guide your musical journey.
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
                <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                  <div className="text-2xl font-bold text-orange-600">50+</div>
                  <div className="text-gray-600">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">MusicKatta</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've reimagined music education for the digital age with features designed 
              to accelerate your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
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
      <section className="relative py-20 overflow-hidden">
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
            Join thousands of students who have discovered their musical potential with MusicKatta. 
            Your journey to musical mastery starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleStartFreeTrial}
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 border-2 border-yellow-400"
            >
              <FaPlay className="w-4 h-4" />
              Start Free Trial
            </button>
            <button 
              onClick={handleBookDemo}
              className="bg-transparent text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-3 border-2 border-white backdrop-blur-sm"
            >
              <FaHeadphones className="w-4 h-4" />
              Book Demo Class
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}