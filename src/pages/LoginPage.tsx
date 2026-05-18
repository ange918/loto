import { useState, FormEvent } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="font-unbounded text-[#00C96B] text-2xl font-bold text-center mb-10 tracking-wider">
          INVENTAIRE PRO
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-unbounded text-white text-xs tracking-wider">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="bg-[#1E1E1E] border border-[#333] focus:border-[#00C96B] text-white font-montserrat text-base px-4 h-14 outline-none transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-unbounded text-white text-xs tracking-wider">MOT DE PASSE</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="bg-[#1E1E1E] border border-[#333] focus:border-[#00C96B] text-white font-montserrat text-base px-4 h-14 outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-montserrat text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#00C96B] text-black font-unbounded font-bold text-sm tracking-wider h-14 mt-2 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'CONNEXION...' : 'SE CONNECTER'}
          </button>
        </form>
      </div>
    </div>
  )
}
