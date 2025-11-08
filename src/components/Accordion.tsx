import { useState } from 'react'

export default function Accordion({
  items,
}: {
  items: { title: string; content: string }[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={idx} className="card overflow-hidden">
          <button
            className="w-full text-left px-5 py-4 flex items-center justify-between"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <span className="font-semibold">{it.title}</span>
            <span className="text-white/50">{openIndex === idx ? '−' : '+'}</span>
          </button>
          {openIndex === idx && (
            <div className="px-5 pb-5 text-white/80">
              <p>{it.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
