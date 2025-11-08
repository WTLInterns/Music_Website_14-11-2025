import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="py-0 md:py-0">
      <section className="relative overflow-hidden rounded-2xl mt-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=60')",
          }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative px-6 py-20 md:py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title text-5xl md:text-6xl text-gradient"
          >
            Feel the Music. Learn the Art. Join MusicKatta. 
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle max-w-2xl mx-auto mt-4"
          >
            Premium courses and live classes with a modern, performance-first curriculum.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Link href="/courses" className="btn btn-primary">Explore Courses</Link>
            <Link href="/live-classes" className="btn btn-outline">Join Live Classes</Link>
          </motion.div>

          <div className="mt-10 flex items-end justify-center gap-1 h-16">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="eq-bar animate-equalize" style={{ animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Mentor-led', desc: 'Guided by experienced musicians and teachers.' },
          { title: 'Practice-first', desc: 'Real songs, real techniques, real progress.' },
          { title: 'Community', desc: 'Supportive peers and live sessions.' },
        ].map((f, i) => (
          <motion.div key={i} className="card p-6 notes-bg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <h3 className="font-bold mb-2">{f.title}</h3>
            <p className="text-white/70 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
