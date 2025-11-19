export type User = {
  id: string
  name: string
  email: string
}

const LS_USER_KEY = 'mk_user'
const LS_PURCHASES_KEY = 'mk_purchases' // map of userId -> string[] courseIds

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null

  // Primary source: internal mk_user used by demo auth/purchases
  const rawInternal = localStorage.getItem(LS_USER_KEY)
  if (rawInternal) {
    try {
      return JSON.parse(rawInternal) as User
    } catch {
      // fall through and try unified user object
    }
  }

  // Fallback: unified `user` object set by real login flows (email / Google)
  const rawUnified = localStorage.getItem('user')
  if (!rawUnified) return null

  try {
    const unified = JSON.parse(rawUnified) as {
      email?: string
      name?: string
      isLoggedIn?: boolean
    }

    if (!unified?.isLoggedIn || !unified.email) return null

    const user: User = {
      id: unified.email, // stable id based on email
      name: unified.name || unified.email.split('@')[0] || 'Student',
      email: unified.email,
    }

    // Persist so subsequent calls use mk_user directly
    try {
      localStorage.setItem(LS_USER_KEY, JSON.stringify(user))
    } catch {
      // ignore storage errors; user object is still usable in-memory
    }

    return user
  } catch {
    return null
  }
}

export function isLoggedIn(): boolean {
  return !!getCurrentUser()
}

export function register(name: string, email: string, password: string): User {
  // password is not used/stored in this demo; real app would hash & store securely
  const user: User = { id: crypto.randomUUID(), name, email }
  localStorage.setItem(LS_USER_KEY, JSON.stringify(user))
  // ensure purchases container exists
  const purch = getAllPurchases()
  if (!purch[user.id]) {
    purch[user.id] = []
    localStorage.setItem(LS_PURCHASES_KEY, JSON.stringify(purch))
  }
  return user
}

export function login(email: string): User {
  // demo login by email only. If no user present, create a placeholder.
  const existing = getCurrentUser()
  if (existing && existing.email === email) return existing
  const user: User = existing ?? { id: crypto.randomUUID(), name: email.split('@')[0] || 'Student', email }
  localStorage.setItem(LS_USER_KEY, JSON.stringify(user))
  const purch = getAllPurchases()
  if (!purch[user.id]) {
    purch[user.id] = []
    localStorage.setItem(LS_PURCHASES_KEY, JSON.stringify(purch))
  }
  return user
}

export function logout() {
  if (typeof window === 'undefined') return
  // Clear both internal and unified user representations
  try {
    localStorage.removeItem(LS_USER_KEY)
    localStorage.removeItem('user')
  } catch {
    // ignore storage errors
  }
}

export function getAllPurchases(): Record<string, string[]> {
  if (typeof window === 'undefined') return {}
  const raw = localStorage.getItem(LS_PURCHASES_KEY)
  return raw ? (JSON.parse(raw) as Record<string, string[]>) : {}
}

export function getUserPurchases(userId: string): string[] {
  const all = getAllPurchases()
  return all[userId] ?? []
}

export function addPurchase(courseId: string) {
  const user = getCurrentUser()
  if (!user) return
  const all = getAllPurchases()
  const list = new Set(all[user.id] ?? [])
  list.add(courseId)
  all[user.id] = Array.from(list)
  localStorage.setItem(LS_PURCHASES_KEY, JSON.stringify(all))
}
