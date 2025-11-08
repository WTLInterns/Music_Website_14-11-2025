import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getCurrentUser, isLoggedIn, register, login } from '@lib/auth'

export default function EnrollPage() {
  const router = useRouter()
  const { course } = router.query
  const [mode, setMode] = useState<'register' | 'login'>('register')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isLoggedIn() && typeof course === 'string') {
      router.replace(`/payment?course=${course}`)
    }
  }, [course, router])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (mode === 'register') {
        register(name || 'Student', email, password)
      } else {
        login(email)
      }
      if (typeof course === 'string') router.push(`/payment?course=${course}`)
      else router.push('/courses')
    } catch (e) {
      // no-op in demo
    }
  }

  return (
    <div className="py-12 max-w-md">
      <h1 className="section-title">{mode === 'register' ? 'Register' : 'Login'} to Enroll</h1>
      <p className="section-subtitle mt-2">Create your account to continue to secure payment.</p>

      <form className="card p-6 mt-6 space-y-4" onSubmit={onSubmit}>
        {mode === 'register' && (
          <div>
            <label className="text-sm text-white/70">Name</label>
            <input className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
          </div>
        )}
        <div>
          <label className="text-sm text-white/70">Email</label>
          <input type="email" className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
        <div>
          <label className="text-sm text-white/70">Password</label>
          <input type="password" className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        <button className="btn btn-primary w-full">{mode === 'register' ? 'Register & Continue' : 'Login & Continue'}</button>
        <button type="button" className="w-full text-white/70 hover:text-white text-sm" onClick={() => setMode(mode === 'register' ? 'login' : 'register')}>
          {mode === 'register' ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  )
}
