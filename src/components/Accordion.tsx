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
        <div key={idx} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <button
            className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <span className="font-black text-gray-900">
              {(it.title && it.title.trim().length > 0) ? it.title : `Lesson ${idx + 1}`}
            </span>
            <span className="text-gray-500 font-black">{openIndex === idx ? '−' : '+'}</span>
          </button>
          {openIndex === idx && (
            <div className="px-5 pb-5 text-gray-700">
              <p className="leading-relaxed">{it.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
