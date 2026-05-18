import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function NouveauClientPage() {
  const navigate = useNavigate()
  const [nom, setNom] = useState('')
  const [ville, setVille] = useState('')
  const [telephone, setTelephone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: err } = await supabase
      .from('clients')
      .insert({ nom, ville: ville || null, telephone: telephone || null })
    if (err) {
      setError(err.message)
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  const inputClass = "bg-[#1E1E1E] border border-[#333] focus:border-[#00C96B] text-white font-montserrat text-base px-4 h-14 outline-none transition-colors w-full"
  const labelClass = "font-unbounded text-white text-xs tracking-wider"

  return (
    <div className="min-h-screen bg-[#0A0A0A] max-w-md mx-auto">
      <div className="flex items-center gap-4 px-4 h-14 border-b border-[#1E1E1E] sticky top-0 bg-[#0A0A0A] z-10">
        <button onClick={() => navigate(-1)} className="text-white p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="font-unbounded text-white text-sm font-bold tracking-wider">NOUVEAU CLIENT</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className={labelClass}>NOM DU CLIENT *</label>
          <input
            type="text"
            value={nom}
            onChange={e => setNom(e.target.value)}
            required
            className={inputClass}
            placeholder="Ex: Bar Le Refuge"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>VILLE</label>
          <input
            type="text"
            value={ville}
            onChange={e => setVille(e.target.value)}
            className={inputClass}
            placeholder="Ex: Cotonou"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>TÉLÉPHONE</label>
          <input
            type="tel"
            value={telephone}
            onChange={e => setTelephone(e.target.value)}
            className={inputClass}
            placeholder="Ex: +229 XX XX XX XX"
          />
        </div>

        {error && (
          <p className="font-montserrat text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#00C96B] text-black font-unbounded font-bold text-sm tracking-wider h-14 mt-4 disabled:opacity-50 transition-opacity"
        >
          {loading ? 'ENREGISTREMENT...' : 'ENREGISTRER'}
        </button>
      </form>
    </div>
  )
}
