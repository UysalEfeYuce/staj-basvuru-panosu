import { DEPOLAMA_ANAHTARI, DURUM_IDLERI, SEMA_SURUMU } from './sabitler.js'

// Eksik ya da hatalı alanları güvenli varsayılanlarla doldurur
function kaydiDuzelt(ham) {
  if (!ham || typeof ham !== 'object') return null
  const sirket = String(ham.sirket ?? '').trim()
  const pozisyon = String(ham.pozisyon ?? '').trim()
  if (!sirket || !pozisyon) return null
  return {
    id: String(ham.id ?? crypto.randomUUID()),
    sirket,
    pozisyon,
    durum: DURUM_IDLERI.includes(ham.durum) ? ham.durum : 'basvurulacak',
    basvuruTarihi: ham.basvuruTarihi || null,
    sonTarih: ham.sonTarih || null,
    link: String(ham.link ?? ''),
    notlar: String(ham.notlar ?? ''),
    olusturma: ham.olusturma || new Date().toISOString(),
  }
}

export function basvurulariOku() {
  try {
    const metin = localStorage.getItem(DEPOLAMA_ANAHTARI)
    if (!metin) return []
    const veri = JSON.parse(metin)
    // Şema sürümü ileride değişirse dönüştürme burada yapılır.
    // Şimdilik yalnızca 1. sürüm var.
    if (veri?.surum !== SEMA_SURUMU || !Array.isArray(veri.basvurular)) return []
    return veri.basvurular.map(kaydiDuzelt).filter(Boolean)
  } catch {
    // Bozuk veri ya da erişilemeyen depolama: boş listeyle aç
    return []
  }
}

export function basvurulariYaz(basvurular) {
  try {
    localStorage.setItem(
      DEPOLAMA_ANAHTARI,
      JSON.stringify({ surum: SEMA_SURUMU, basvurular }),
    )
  } catch {
    // Gizli sekme veya dolu depolama: uygulama bellekte çalışmaya devam eder
  }
}
