

// import { motion } from 'framer-motion'
// import { FaMusic } from 'react-icons/fa'
// import Image from 'next/image'

// export default function LiveClasses() {
//   return (
//     <div className="py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div 
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <motion.h1 
//             className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6 }}
//           >
//             Live Classes
//           </motion.h1>
//           <motion.p 
//             className="text-lg text-gray-600 max-w-2xl mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//           >
//             Join upcoming live sessions and explore past classes.
//           </motion.p>
//         </motion.div>

//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Main Content - Video and Gallery */}
//           <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
//             <h3 className="font-bold text-xl text-gray-800 mb-4">Live Session Preview</h3>
//             <div className="aspect-video bg-black/5 border-2 border-gray-200 rounded-xl overflow-hidden shadow-inner">
//               <iframe
//                 className="w-full h-full rounded-lg"
//                 src="https://www.youtube.com/embed/ScMzIvxBSi4"
//                 title="Live Class Preview"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 allowFullScreen
//               />
//             </div>
            
//             <h3 className="font-bold text-xl text-gray-800 mt-8 mb-4">Class Gallery</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//               {[1,2,3,4,5,6].map(i => (
//                 <motion.div 
//                   key={i} 
//                   className="relative h-28 rounded-xl overflow-hidden group bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 shadow-md"
//                   whileHover={{ scale: 1.05, y: -5 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="absolute inset-0 grid place-content-center text-gray-400 font-medium">Thumbnail {i}</div>
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 grid place-content-center">
//                     <div className="h-12 w-12 rounded-full bg-white text-black grid place-content-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
//                       <span className="text-lg">▶</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Upcoming Classes Sidebar with Background Image */}
//           <div className="relative rounded-2xl p-6 shadow-lg border border-white/20 overflow-hidden min-h-[500px]">
//             {/* Full Width & Height Background Image */}
//             <div className="absolute inset-0 w-full h-full">
//               <Image 
//                 src="/images/music3.png" 
//                 alt="Music Background"
//                 fill
//                 className="object-cover w-full h-full"
//               />
//               {/* Overlay for better readability */}
//               <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
//             </div>

//             {/* Content */}
//             <div className="relative z-20 h-full flex flex-col">
//               <h3 className="font-bold text-xl text-white mb-6">Upcoming Classes</h3>
//               <div className="space-y-4 mb-8 flex-grow">
//                 {[
//                   {title:'Strumming Mastery', date:'Sat 7 PM', color: 'from-black-800 '},
//                   {title:'Ukulele Jam', date:'Sun 5 PM', color: 'from-black-800'}
//                 ].map((c, i) => (
//                   <motion.div 
//                     key={i}
//                     className="p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow-md transition-all duration-300"
//                     whileHover={{ scale: 1.02, x: 5 }}
//                   >
//                     <div className={`font-semibold bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
//                       {c.title}
//                     </div>
//                     <div className="text-white/90 text-sm mt-1">{c.date}</div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Animated Music Icons */}
//               <div className="flex justify-center space-x-6">
//                 <motion.div
//                   animate={{
//                     y: [0, -10, 0],
//                     rotate: [0, 5, -5, 0],
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                   className="text-white"
//                 >
//                   <FaMusic className="w-6 h-6" />
//                 </motion.div>
//                 <motion.div
//                   animate={{
//                     y: [0, -15, 0],
//                     rotate: [0, -5, 5, 0],
//                   }}
//                   transition={{
//                     duration: 2.5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: 0.5
//                   }}
//                   className="text-white"
//                 >
//                   <FaMusic className="w-6 h-6" />
//                 </motion.div>
//                 <motion.div
//                   animate={{
//                     y: [0, -8, 0],
//                     rotate: [0, 8, -8, 0],
//                   }}
//                   transition={{
//                     duration: 3.5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: 1
//                   }}
//                   className="text-white"
//                 >
//                   <FaMusic className="w-6 h-6" />
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { motion } from 'framer-motion'
import { FaMusic, FaPlay } from 'react-icons/fa'
import Image from 'next/image'

export default function LiveClasses() {
  const galleryImages = [
    { id: 1, title: 'Guitar Masterclass', image: '/images/guitar-lesson.jpg' },
    { id: 2, title: 'Piano Session', image: '/images/piano-lesson.jpg' },
    { id: 3, title: 'Drum Workshop', image: '/images/drum-lesson.jpg' },
    { id: 4, title: 'Violin Class', image: '/images/violin-lesson.jpg' },
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
            Live Classes
          </motion.h1>
          <motion.p 
            className="text-base text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Join upcoming live sessions and explore past classes.
          </motion.p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content - Video and Gallery */}
          <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Live Session Preview</h3>
            <div className="aspect-video bg-black/5 border border-gray-200 rounded-lg overflow-hidden shadow-inner">
              <iframe
                className="w-full h-full rounded-md"
                src="https://www.youtube.com/embed/ScMzIvxBSi4"
                title="Live Class Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
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
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 grid place-content-center">
                    <div className="text-center text-white">
                      <div className="h-8 w-8 rounded-full bg-white/90 text-black grid place-content-center shadow transform group-hover:scale-110 transition-transform duration-300 mx-auto mb-1">
                        <FaPlay className="w-3 h-3" />
                      </div>
                      <div className="text-xs">Watch</div>
                    </div>
                  </div>
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
              <h3 className="font-bold text-lg text-white mb-4">Upcoming Classes</h3>
              <div className="space-y-3 mb-6 flex-grow">
                {[
                  {title:'Strumming Mastery', date:'Sat 7 PM', color: 'from-purple-300 to-pink-300'},
                  {title:'Ukulele Jam', date:'Sun 5 PM', color: 'from-blue-300 to-cyan-300'}
                ].map((c, i) => (
                  <motion.div 
                    key={i}
                    className="p-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm hover:shadow transition-all duration-300"
                    whileHover={{ scale: 1.01, x: 3 }}
                  >
                    <div className={`font-semibold text-sm bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                      {c.title}
                    </div>
                    <div className="text-white/90 text-xs mt-1">{c.date}</div>
                  </motion.div>
                ))}
              </div>

              {/* Animated Music Icons */}
              <div className="flex justify-center space-x-4">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-white"
                >
                  <FaMusic className="w-5 h-5" />
                </motion.div>
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="text-white"
                >
                  <FaMusic className="w-5 h-5" />
                </motion.div>
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="text-white"
                >
                  <FaMusic className="w-5 h-5" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}