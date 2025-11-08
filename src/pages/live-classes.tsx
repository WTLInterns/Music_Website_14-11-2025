export default function LiveClasses() {
  return (
    <div className="py-12">
      <h1 className="section-title">Live Classes</h1>
      <p className="section-subtitle mt-2">Join upcoming live sessions and explore past classes.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-5 bg-music-waves bg-cover">
          <h3 className="font-bold mb-2">Embed Video</h3>
          <div className="aspect-video bg-black/40 border border-white/10 rounded-md overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ScMzIvxBSi4"
              title="Live Class Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <h3 className="font-bold mt-6 mb-2">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="relative h-28 rounded-md overflow-hidden group bg-white/5 border border-white/10">
                <div className="absolute inset-0 grid place-content-center text-white/50">Thumbnail {i}</div>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition grid place-content-center">
                  <div className="h-10 w-10 rounded-full bg-white/80 text-black grid place-content-center">▶</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5 shadow-glow">
          <h3 className="font-bold mb-3">Upcoming Classes</h3>
          <div className="space-y-3">
            {[{title:'Strumming Mastery', date:'Sat 7 PM'}, {title:'Ukulele Jam', date:'Sun 5 PM'}].map((c, i) => (
              <div key={i} className="p-3 rounded bg-white/5 border border-white/10">
                <div className="font-semibold">{c.title}</div>
                <div className="text-white/70 text-sm">{c.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
