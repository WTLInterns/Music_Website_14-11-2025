import { useState, ReactNode } from 'react'

type Tab = { key: string; label: string; content: ReactNode }

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key)
  return (
    <div>
      <div className="flex gap-2 border-b border-white/10">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2 rounded-t-md transition ${
              active === t.key ? 'tab-active' : 'tab-idle'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="card p-5 mt-3">
        {tabs.find(t => t.key === active)?.content}
      </div>
    </div>
  )
}
