// import { useRouter } from 'next/router'
// import { courses } from '@data/courses'
// import Accordion from '@components/Accordion'
// import Link from 'next/link'
// import Image from 'next/image'
// import { motion } from 'framer-motion'
// import { FaClock, FaUsers, FaStar, FaMusic, FaPlay, FaCheck, FaCertificate, FaChalkboardTeacher } from 'react-icons/fa'

// export default function CourseDetail() {
//   const router = useRouter()
//   const { id } = router.query
//   const course = courses.find(c => c.id === id)

//   if (!course) return <div className="py-12 text-center text-white">Course not found.</div>

//   const courseStats = [
//     { icon: FaClock, label: 'Duration', value: course.duration || '8 weeks' },
//     { icon: FaUsers, label: 'Students', value: course.students || '250+' },
//     { icon: FaStar, label: 'Rating', value: course.rating || '4.8' },
//     { icon: FaMusic, label: 'Level', value: course.level || 'Beginner' }
//   ]

//   const features = [
//     'Lifetime access to course materials',
//     'Certificate of completion',
//     'Personalized feedback',
//     'Community access',
//     'Downloadable resources',
//     'Mobile and TV access'
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pb-12">
//       {/* Hero Section */}
//       <div className="relative h-64 md:h-80 lg:h-96 rounded-b-3xl overflow-hidden">
//         <Image 
//           src={course.image} 
//           alt={course.title} 
//           fill 
//           className="object-cover" 
//           priority 
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30" />
        
//         <div className="absolute bottom-6 left-6 right-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="flex items-center gap-2 mb-3">
//               <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold">
//                 {course.level || 'Beginner'} Level
//               </span>
//               <span className="px-3 py-1 bg-green-400 text-gray-900 rounded-full text-sm font-semibold">
//                 {course.category || 'Instrument'}
//               </span>
//             </div>
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
//               {course.title}
//             </h1>
//             <div className="flex items-center gap-4 text-white/80">
//               <div className="flex items-center gap-2">
//                 <FaChalkboardTeacher className="w-4 h-4" />
//                 <span>By {course.instructor}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <FaStar className="w-4 h-4 text-yellow-400" />
//                 <span>{course.rating || '4.8'}</span>
//                 <span className="text-white/60">({course.students || '250'}+ students)</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-3 space-y-8">
//             {/* Course Stats */}
//             <motion.div 
//               className="grid grid-cols-2 md:grid-cols-4 gap-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.6 }}
//             >
//               {courseStats.map((stat, index) => {
//                 const Icon = stat.icon
//                 return (
//                   <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
//                     <Icon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
//                     <div className="text-2xl font-bold text-white">{stat.value}</div>
//                     <div className="text-white/70 text-sm">{stat.label}</div>
//                   </div>
//                 )
//               })}
//             </motion.div>

//             {/* About Course */}
//             <motion.div 
//               className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.6 }}
//             >
//               <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
//                 <FaMusic className="w-6 h-6 text-yellow-400" />
//                 About This Course
//               </h2>
//               <p className="text-white/80 text-lg leading-relaxed mb-4">
//                 {course.description || 'This comprehensive course will take you from absolute basics to confident playing with practical exercises, engaging lessons, and real-world musical applications.'}
//               </p>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//                 <div>
//                   <h3 className="text-white font-semibold mb-3">What You'll Learn</h3>
//                   <ul className="space-y-2">
//                     {[
//                       'Master fundamental techniques and theory',
//                       'Play popular songs and melodies',
//                       'Develop proper practice habits',
//                       'Build confidence in performance',
//                       'Understand musical notation',
//                       'Improvise and create your own music'
//                     ].map((item, index) => (
//                       <li key={index} className="flex items-center gap-3 text-white/80">
//                         <FaCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
//                         <span>{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div>
//                   <h3 className="text-white font-semibold mb-3">Course Features</h3>
//                   <ul className="space-y-2">
//                     {features.map((feature, index) => (
//                       <li key={index} className="flex items-center gap-3 text-white/80">
//                         <FaPlay className="w-3 h-3 text-blue-400 flex-shrink-0" />
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Syllabus */}
//             <motion.div 
//               className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.6 }}
//             >
//               <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                 <FaCertificate className="w-6 h-6 text-yellow-400" />
//                 Course Syllabus
//               </h3>
//               <Accordion items={[
//                 { 
//                   title: 'Module 1: Foundations & Basics', 
//                   content: 'Introduction to the instrument, proper posture and holding techniques, understanding basic music theory, tuning your instrument, playing your first notes and simple exercises.' 
//                 },
//                 { 
//                   title: 'Module 2: Rhythm & Technique', 
//                   content: 'Mastering strumming patterns and picking techniques, understanding timing and metronome practice, chord transitions and finger exercises, developing rhythm and coordination.' 
//                 },
//                 { 
//                   title: 'Module 3: Songs & Application', 
//                   content: 'Learning popular beginner songs, applying techniques to real music, play-along sessions with backing tracks, performance tips and stage presence.' 
//                 },
//                 { 
//                   title: 'Module 4: Advanced Techniques', 
//                   content: 'Exploring advanced chords and scales, improvisation basics, music theory application, developing your unique playing style, recording and self-assessment.' 
//                 },
//                 { 
//                   title: 'Module 5: Performance & Mastery', 
//                   content: 'Preparing for live performance, polishing your skills, building a repertoire, continuing your musical journey, joining the music community.' 
//                 }
//               ]} />
//             </motion.div>

//             {/* Instructor Info */}
//             <motion.div 
//               className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5, duration: 0.6 }}
//             >
//               <h3 className="text-2xl font-bold text-white mb-4">About the Instructor</h3>
//               <div className="flex items-start gap-4">
//                 <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
//                   <FaChalkboardTeacher className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h4 className="text-xl font-semibold text-white">{course.instructor}</h4>
//                   <p className="text-yellow-400 mb-2">Professional Musician & Educator</p>
//                   <p className="text-white/80">
//                     With over 10 years of teaching experience and 15+ years of professional performance, 
//                     {course.instructor} has helped thousands of students start their musical journey. 
//                     Specializing in making complex concepts accessible to beginners.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1 space-y-6">
//             <motion.div 
//               className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl sticky top-24"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.6, duration: 0.6 }}
//             >
//               <div className="text-center mb-6">
//                 <div className="flex items-baseline justify-center gap-2 mb-4">
//                   <span className="text-4xl font-extrabold text-gray-900">₹{course.discountPrice ?? course.price}</span>
//                   {course.discountPrice && (
//                     <span className="text-gray-700 line-through text-xl">₹{course.price}</span>
//                   )}
//                 </div>
//                 {course.discountPrice && (
//                   <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block">
//                     Save ₹{course.price - course.discountPrice}
//                   </div>
//                 )}
//               </div>

//               <Link 
//                 href={`/enroll?course=${course.id}`} 
//                 className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg mb-4"
//               >
//                 <FaPlay className="w-5 h-5" />
//                 Enroll Now
//               </Link>

//               <div className="text-center text-gray-700 text-sm">
//                 <p>30-day money-back guarantee</p>
//                 <p>Lifetime access</p>
//               </div>

//               <div className="mt-6 space-y-3">
//                 <div className="flex items-center justify-between text-gray-700">
//                   <span>Course level:</span>
//                   <span className="font-semibold">{course.level || 'Beginner'}</span>
//                 </div>
//                 <div className="flex items-center justify-between text-gray-700">
//                   <span>Duration:</span>
//                   <span className="font-semibold">{course.duration || '8 weeks'}</span>
//                 </div>
//                 <div className="flex items-center justify-between text-gray-700">
//                   <span>Lessons:</span>
//                   <span className="font-semibold">{course.lessons || '40+'}</span>
//                 </div>
//                 <div className="flex items-center justify-between text-gray-700">
//                   <span>Certificate:</span>
//                   <span className="font-semibold">Included</span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Quick Info Card */}
//             <motion.div 
//               className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.7, duration: 0.6 }}
//             >
//               <h4 className="text-white font-semibold mb-4">This Course Includes</h4>
//               <ul className="space-y-3">
//                 {[
//                   '40+ on-demand video lessons',
//                   'Downloadable practice materials',
//                   'Certificate of completion',
//                   'Full lifetime access',
//                   'Access on mobile and TV',
//                   'Community support'
//                 ].map((item, index) => (
//                   <li key={index} className="flex items-center gap-3 text-white/80 text-sm">
//                     <FaCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useRouter } from 'next/router'
import { courses } from '@data/courses'
import Accordion from '@components/Accordion'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaClock, FaUsers, FaStar, FaMusic, FaPlay, FaCheck, FaCertificate, FaChalkboardTeacher } from 'react-icons/fa'

export default function CourseDetail() {
  const router = useRouter()
  const { id } = router.query
  const course = courses.find(c => c.id === id)

  if (!course) return <div className="py-12 text-center text-white">Course not found.</div>

  const courseStats = [
    { icon: FaClock, label: 'Duration', value: course.duration || '8 weeks' },
    { icon: FaUsers, label: 'Students', value: course.students || '250+' },
    { icon: FaStar, label: 'Rating', value: course.rating || '4.8' },
    { icon: FaMusic, label: 'Level', value: course.level || 'Beginner' }
  ]

  const features = [
    'Lifetime access to course materials',
    'Certificate of completion',
    'Personalized feedback',
    'Community access',
    'Downloadable resources',
    'Mobile and TV access'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pb-12">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 rounded-b-3xl overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title} 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold">
                {course.level || 'Beginner'} Level
              </span>
              <span className="px-3 py-1 bg-green-400 text-gray-900 rounded-full text-sm font-semibold">
                {course.category || 'Instrument'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {course.title}
            </h1>
            <div className="flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <FaChalkboardTeacher className="w-4 h-4" />
                <span>By {course.instructor}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="w-4 h-4 text-yellow-400" />
                <span>{course.rating || '4.8'}</span>
                <span className="text-white/60">({course.students || '250'}+ students)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Course Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {courseStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                    <Icon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>

            {/* About Course */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FaMusic className="w-6 h-6 text-yellow-400" />
                About This Course
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                {course.description || 'This comprehensive course will take you from absolute basics to confident playing with practical exercises, engaging lessons, and real-world musical applications.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {[
                      'Master fundamental techniques and theory',
                      'Play popular songs and melodies',
                      'Develop proper practice habits',
                      'Build confidence in performance',
                      'Understand musical notation',
                      'Improvise and create your own music'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-white/80">
                        <FaCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Course Features</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-white/80">
                        <FaPlay className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Syllabus */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaCertificate className="w-6 h-6 text-yellow-400" />
                Course Syllabus
              </h3>
              <Accordion items={[
                { 
                  title: 'Module 1: Foundations & Basics', 
                  content: 'Introduction to the instrument, proper posture and holding techniques, understanding basic music theory, tuning your instrument, playing your first notes and simple exercises.' 
                },
                { 
                  title: 'Module 2: Rhythm & Technique', 
                  content: 'Mastering strumming patterns and picking techniques, understanding timing and metronome practice, chord transitions and finger exercises, developing rhythm and coordination.' 
                },
                { 
                  title: 'Module 3: Songs & Application', 
                  content: 'Learning popular beginner songs, applying techniques to real music, play-along sessions with backing tracks, performance tips and stage presence.' 
                },
                { 
                  title: 'Module 4: Advanced Techniques', 
                  content: 'Exploring advanced chords and scales, improvisation basics, music theory application, developing your unique playing style, recording and self-assessment.' 
                },
                { 
                  title: 'Module 5: Performance & Mastery', 
                  content: 'Preparing for live performance, polishing your skills, building a repertoire, continuing your musical journey, joining the music community.' 
                }
              ]} />
            </motion.div>

            {/* Instructor Info */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">About the Instructor</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <FaChalkboardTeacher className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">{course.instructor}</h4>
                  <p className="text-yellow-400 mb-2">Professional Musician & Educator</p>
                  <p className="text-white/80">
                    With over 10 years of teaching experience and 15+ years of professional performance, 
                    {course.instructor} has helped thousands of students start their musical journey. 
                    Specializing in making complex concepts accessible to beginners.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Fixed Position */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Enrollment Card */}
              <motion.div 
                className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-4xl font-extrabold text-gray-900">₹{course.discountPrice ?? course.price}</span>
                    {course.discountPrice && (
                      <span className="text-gray-700 line-through text-xl">₹{course.price}</span>
                    )}
                  </div>
                  {course.discountPrice && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block">
                      Save ₹{course.price - course.discountPrice}
                    </div>
                  )}
                </div>

                <Link 
                  href={`/enroll?course=${course.id}`} 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg mb-4"
                >
                  <FaPlay className="w-5 h-5" />
                  Enroll Now
                </Link>

                <div className="text-center text-gray-700 text-sm mb-4">
                  <p>30-day money-back guarantee</p>
                  <p>Lifetime access</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Course level:</span>
                    <span className="font-semibold">{course.level || 'Beginner'}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Duration:</span>
                    <span className="font-semibold">{course.duration || '8 weeks'}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Lessons:</span>
                    <span className="font-semibold">{course.lessons || '40+'}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Certificate:</span>
                    <span className="font-semibold">Included</span>
                  </div>
                </div>
              </motion.div>

              {/* Course Includes Card */}
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <h4 className="text-white font-semibold mb-4">This Course Includes</h4>
                <ul className="space-y-3">
                  {[
                    '40+ on-demand video lessons',
                    'Downloadable practice materials',
                    'Certificate of completion',
                    'Full lifetime access',
                    'Access on mobile and TV',
                    'Community support'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80 text-sm">
                      <FaCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}