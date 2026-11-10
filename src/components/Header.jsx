const SEKMELER = [
  { id: 'pano', ad: 'Pano' },
  { id: 'istatistik', ad: 'İstatistik' },
]

export default function Header({ sekme, setSekme, onYeni }) {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2.5 shrink-0">
          <img src="/favicon.svg" alt="" className="size-8" />
          <span className="font-semibold text-slate-900 hidden sm:inline">Staj Başvuru Panosu</span>
        </div>

        <nav className="flex gap-1 bg-slate-100 rounded-lg p-1" aria-label="Sayfalar">
          {SEKMELER.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSekme(s.id)}
              aria-current={sekme === s.id ? 'page' : undefined}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                sekme === s.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s.ad}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={onYeni}
          aria-label="Yeni başvuru ekle"
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 sm:px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span aria-hidden="true" className="text-lg leading-none">+</span>
          <span>
            <span className="hidden sm:inline">Yeni </span>Başvuru
          </span>
        </button>
      </div>
    </header>
  )
}
