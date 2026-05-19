import { useNavigate, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isDashboard = location.pathname === '/'
  const isProduits = location.pathname === '/produits'

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#141414] border-t border-[#333] flex items-center justify-around h-16 max-w-md mx-auto z-50">
      <button
        onClick={() => navigate('/')}
        className="flex flex-col items-center gap-1 px-6"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isDashboard ? '#00C96B' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className={`font-unbounded text-[9px] tracking-wider ${isDashboard ? 'text-[#00C96B]' : 'text-[#666]'}`}>
          DASHBOARD
        </span>
      </button>

      <button
        onClick={() => navigate('/clients/nouveau')}
        className="w-12 h-12 rounded-full bg-[#00C96B] flex items-center justify-center shadow-lg -mt-4"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <button
        onClick={() => navigate('/produits')}
        className="flex flex-col items-center gap-1 px-6"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isProduits ? '#00C96B' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <span className={`font-unbounded text-[9px] tracking-wider ${isProduits ? 'text-[#00C96B]' : 'text-[#666]'}`}>
          CATALOGUE
        </span>
      </button>
    </nav>
  )
}
