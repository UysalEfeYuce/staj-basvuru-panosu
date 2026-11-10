import { kisaTarih } from '../utils/tarih.js'

// Kütüphanesiz, CSS ile çizilen çubuk grafik
export default function HaftalikGrafik({ haftalar }) {
  const enCok = Math.max(...haftalar.map((h) => h.sayi), 1)
  const toplam = haftalar.reduce((t, h) => t + h.sayi, 0)

  return (
    <figure className="mt-5">
      <div
        className="flex h-44 items-end gap-2 sm:gap-3 border-b border-slate-200"
        role="img"
        aria-label={`Son 8 haftada toplam ${toplam} başvuru`}
      >
        {haftalar.map((h, i) => {
          const sonHafta = i === haftalar.length - 1
          return (
            <div key={h.baslangic} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <span className="text-xs font-medium tabular-nums text-slate-600">
                {h.sayi > 0 ? h.sayi : ''}
              </span>
              <div
                className={`w-full max-w-10 rounded-t-md ${sonHafta ? 'bg-indigo-600' : 'bg-indigo-300'}`}
                style={{ height: `${(h.sayi / enCok) * 100}%`, minHeight: h.sayi > 0 ? 4 : 0 }}
                title={`${kisaTarih(h.baslangic)} haftası: ${h.sayi} başvuru`}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex gap-2 sm:gap-3">
        {haftalar.map((h, i) => (
          <span key={h.baslangic} className="flex-1 text-center text-[10px] sm:text-xs text-slate-500">
            {i === haftalar.length - 1 ? 'Bu hafta' : kisaTarih(h.baslangic)}
          </span>
        ))}
      </div>
    </figure>
  )
}
