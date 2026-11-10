import { useBasvurular } from '../context/BasvuruContext.jsx'
import { DURUMLAR, YAKLASAN_GUN_ESIGI } from '../utils/sabitler.js'
import { kisaTarih, sonTarihDurumu } from '../utils/tarih.js'

// Yalnızca http(s) bağlantılarını tıklanabilir yap (javascript: vb. engellenir)
const guvenliLink = (link) => (/^https?:\/\//i.test(link) ? link : null)

export default function BasvuruKarti({ basvuru, onDuzenle }) {
  const { durumDegistir, sil } = useBasvurular()
  const { sirket, pozisyon, durum, basvuruTarihi, sonTarih, notlar } = basvuru

  // Son tarih uyarısı yalnızca henüz başvurulmamış kartlarda anlamlı
  const uyari = durum === 'basvurulacak' ? sonTarihDurumu(sonTarih, YAKLASAN_GUN_ESIGI) : null
  const link = guvenliLink(basvuru.link)

  const silOnayla = () => {
    if (window.confirm(`"${sirket} – ${pozisyon}" başvurusu silinsin mi?`)) sil(basvuru.id)
  }

  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-3 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex items-start gap-2">
        <button
          type="button"
          onClick={() => onDuzenle(basvuru)}
          className="min-w-0 flex-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
        >
          <h3 className="truncate font-semibold text-slate-900">{sirket}</h3>
          <p className="truncate text-sm text-slate-600">{pozisyon}</p>
        </button>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title="İlanı aç"
            aria-label={`${sirket} ilanını yeni sekmede aç`}
            className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
              <path d="M11 3a1 1 0 1 0 0 2h2.59l-6.3 6.29a1 1 0 1 0 1.42 1.42L15 6.41V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z" />
              <path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z" />
            </svg>
          </a>
        )}
      </div>

      {(uyari || basvuruTarihi || (durum === 'basvurulacak' && sonTarih)) && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          {uyari && (
            <span
              className={`rounded-full px-2 py-0.5 font-medium ${
                uyari.tur === 'gecti' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {uyari.metin}
            </span>
          )}
          {durum === 'basvurulacak' && sonTarih && (
            <span className="text-slate-500">Son: {kisaTarih(sonTarih)}</span>
          )}
          {durum !== 'basvurulacak' && basvuruTarihi && (
            <span className="text-slate-500">Başvuru: {kisaTarih(basvuruTarihi)}</span>
          )}
        </div>
      )}

      {notlar && <p className="mt-2 line-clamp-2 text-xs text-slate-500">{notlar}</p>}

      <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-2.5">
        <select
          value={durum}
          onChange={(e) => durumDegistir(basvuru.id, e.target.value)}
          aria-label={`${sirket} başvurusunun durumu`}
          className="min-w-0 flex-1 rounded-md border border-slate-200 bg-slate-50 py-1 pl-2 pr-6 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
        >
          {DURUMLAR.map((d) => (
            <option key={d.id} value={d.id}>
              {d.ad}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onDuzenle(basvuru)}
          title="Düzenle"
          aria-label={`${sirket} başvurusunu düzenle`}
          className="shrink-0 rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
            <path d="M13.59 3.59a2 2 0 0 1 2.82 2.82l-8.5 8.5a1 1 0 0 1-.46.26l-3.2.8a.5.5 0 0 1-.61-.6l.8-3.21a1 1 0 0 1 .26-.46l8.5-8.5Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={silOnayla}
          title="Sil"
          aria-label={`${sirket} başvurusunu sil`}
          className="shrink-0 rounded-md p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.44c-.8.08-1.58.18-2.37.3a.75.75 0 1 0 .23 1.49l.15-.03.8 10.35A2.75 2.75 0 0 0 7.55 19h4.9a2.75 2.75 0 0 0 2.74-2.7l.8-10.35.15.03a.75.75 0 1 0 .23-1.49c-.79-.12-1.58-.22-2.37-.3v-.44A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.67.03 2.5.08v-.33c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.33C8.33 4.03 9.16 4 10 4Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </article>
  )
}
