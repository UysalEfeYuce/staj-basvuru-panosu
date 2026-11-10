// Uygulama genelinde kullanılan sabitler

export const DEPOLAMA_ANAHTARI = 'staj-panosu'
export const SEMA_SURUMU = 1

// Sütunlar soldan sağa bu sırayla gösterilir.
// Tailwind sınıfları tam yazılmalı ki derleyici bunları bulabilsin.
export const DURUMLAR = [
  {
    id: 'basvurulacak',
    ad: 'Başvurulacak',
    nokta: 'bg-slate-400',
    rozet: 'bg-slate-100 text-slate-700',
    serit: 'border-t-slate-400',
  },
  {
    id: 'basvuruldu',
    ad: 'Başvuruldu',
    nokta: 'bg-sky-500',
    rozet: 'bg-sky-100 text-sky-800',
    serit: 'border-t-sky-500',
  },
  {
    id: 'mulakat',
    ad: 'Mülakat',
    nokta: 'bg-amber-500',
    rozet: 'bg-amber-100 text-amber-800',
    serit: 'border-t-amber-500',
  },
  {
    id: 'teklif',
    ad: 'Teklif',
    nokta: 'bg-emerald-500',
    rozet: 'bg-emerald-100 text-emerald-800',
    serit: 'border-t-emerald-500',
  },
  {
    id: 'ret',
    ad: 'Ret',
    nokta: 'bg-rose-500',
    rozet: 'bg-rose-100 text-rose-800',
    serit: 'border-t-rose-500',
  },
]

export const DURUM_IDLERI = DURUMLAR.map((d) => d.id)

export const durumBilgisi = (id) => DURUMLAR.find((d) => d.id === id) ?? DURUMLAR[0]

// Son başvuru tarihine bu kadar gün (veya daha az) kaldıysa uyarı gösterilir
export const YAKLASAN_GUN_ESIGI = 3
