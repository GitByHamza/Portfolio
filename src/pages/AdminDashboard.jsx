import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ThemeToggle from '@/components/ThemeToggle'

const isAdmin = (session) => session?.user?.app_metadata?.portfolio_admin === true

export default function AdminDashboard() {
 const [session, setSession] = useState(null)
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [error, setError] = useState('')
 const [busy, setBusy] = useState(false)
 const [messages, setMessages] = useState([])
 const [loading, setLoading] = useState(false)
 useEffect(() => {
  let active = true
  supabase.auth.getSession().then(({ data }) => { if (active && isAdmin(data.session)) setSession(data.session) })
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, next) => { if (active) setSession(isAdmin(next) ? next : null) })
  return () => { active = false; subscription.unsubscribe() }
 }, [])
 useEffect(() => {
  if (!session) { setMessages([]); return }
  let active = true
  setLoading(true)
  supabase.from('messages').select('id,created_at,name,email,country,message').order('created_at', { ascending: false }).then(({ data, error: failure }) => {
   if (!active) return
   if (failure) setError('Messages could not load. Verify the admin role and database policies.')
   else setMessages(data || [])
   setLoading(false)
  })
  return () => { active = false }
 }, [session])
 async function signIn(event) {
  event.preventDefault(); setBusy(true); setError('')
  try {
   const { data, error: failure } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
   if (failure || !isAdmin(data.session)) {
    await supabase.auth.signOut()
    setError('Sign-in failed or this account does not have portfolio admin access.')
   } else { setSession(data.session); setPassword('') }
  } catch { setError('Sign-in is unavailable. Please try again.') }
  finally { setBusy(false) }
 }
 async function signOut() { await supabase.auth.signOut(); setSession(null); setMessages([]) }
 return <main id="page-content" className="min-h-screen max-w-6xl mx-auto px-5 sm:px-8 py-12 space-y-8">
  <header className="flex items-center justify-between gap-4"><a href="/" className="underline">← Portfolio</a><ThemeToggle /></header>
  <h1 className="font-display text-5xl">{session ? 'Client enquiries' : 'Admin sign-in'}</h1>
  {error && <p role="alert" className="text-red-700 dark:text-red-400">{error}</p>}
  {!session ? <form onSubmit={signIn} className="max-w-md space-y-5">
   <p className="font-serif text-lg">Use your authorized Supabase account.</p>
   <label className="block space-y-2"><span>Email</span><input type="email" name="email" autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} required className="w-full p-3 border border-black/20 dark:border-white/20 bg-transparent" /></label>
   <label className="block space-y-2"><span>Password</span><input type="password" name="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required className="w-full p-3 border border-black/20 dark:border-white/20 bg-transparent" /></label>
   <button disabled={busy} className="btn-outline disabled:opacity-50">{busy ? 'Signing in…' : 'Sign in'}</button>
  </form> : <>
   <button onClick={signOut} className="btn-outline">Sign out</button>
   {loading ? <p role="status">Loading enquiries…</p> : messages.length === 0 ? <p>No enquiries to display.</p> : <ul className="divide-y divide-black/15 dark:divide-white/15">{messages.map(message => <li key={message.id} className="py-6 space-y-3">
    <h2 className="text-xl font-semibold">{message.name}</h2><a className="underline" href={'mailto:' + message.email}>{message.email}</a>
    <p>{message.country}</p><p className="whitespace-pre-wrap">{message.message}</p><time dateTime={message.created_at} className="text-sm text-[#575652] dark:text-[#C5C4BE]">{new Date(message.created_at).toLocaleString()}</time>
   </li>)}</ul>}
  </>}
 </main>
}
