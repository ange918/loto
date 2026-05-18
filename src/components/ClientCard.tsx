import { useNavigate } from 'react-router-dom'
import { Client } from '../lib/types'

export default function ClientCard({ client }: { client: Client }) {
  const navigate = useNavigate()

  return (
    <div
      className="bg-[#1E1E1E] p-4"
      style={{ borderLeft: '3px solid #00C96B' }}
    >
      <div className="mb-3">
        <p className="font-unbounded text-white font-semibold text-sm leading-tight">{client.nom}</p>
        <p className="font-montserrat text-[#888] text-xs mt-1">
          {[client.ville, client.telephone].filter(Boolean).join(' · ')}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/inventaire/${client.id}`)}
          className="flex-1 bg-[#00C96B] text-black font-unbounded text-xs font-bold tracking-wider h-10"
        >
          COMPTER
        </button>
        <button
          onClick={() => navigate(`/historique/${client.id}`)}
          className="flex-1 border border-[#555] text-[#aaa] font-unbounded text-xs tracking-wider h-10"
        >
          HISTORIQUE
        </button>
      </div>
    </div>
  )
}
