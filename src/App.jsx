import { useState } from 'react'
import Header from './components/Header.jsx'
import BasvuruFormu from './components/BasvuruFormu.jsx'
import PanoSayfasi from './pages/PanoSayfasi.jsx'
import IstatistikSayfasi from './pages/IstatistikSayfasi.jsx'

export default function App() {
  const [sekme, setSekme] = useState('pano')
  // null: form kapalı, { mod: 'ekle' } veya { mod: 'duzenle', basvuru }
  const [form, setForm] = useState(null)

  return (
    <div className="min-h-dvh flex flex-col">
      <Header sekme={sekme} setSekme={setSekme} onYeni={() => setForm({ mod: 'ekle' })} />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-5">
        {sekme === 'pano' ? (
          <PanoSayfasi
            onDuzenle={(basvuru) => setForm({ mod: 'duzenle', basvuru })}
            onYeni={() => setForm({ mod: 'ekle' })}
          />
        ) : (
          <IstatistikSayfasi onPanoyaGit={() => setSekme('pano')} />
        )}
      </main>

      <footer className="text-center text-xs text-slate-400 py-4">
        Veriler yalnızca bu tarayıcıda (LocalStorage) saklanır.
      </footer>

      {form && (
        <BasvuruFormu
          key={form.basvuru?.id ?? 'yeni'}
          basvuru={form.mod === 'duzenle' ? form.basvuru : null}
          onKapat={() => setForm(null)}
        />
      )}
    </div>
  )
}
