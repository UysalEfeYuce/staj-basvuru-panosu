// Tarihler "YYYY-MM-DD" metni olarak saklanır.
// new Date("2026-11-10") UTC kabul edildiği için gün kayabilir;
// bu yüzden parçaları ayırıp yerel saat diliminde tarih kuruyoruz.

const ikiHane = (n) => String(n).padStart(2, '0')

export function tarihMetni(tarih) {
  return `${tarih.getFullYear()}-${ikiHane(tarih.getMonth() + 1)}-${ikiHane(tarih.getDate())}`
}

export function bugunMetni() {
  return tarihMetni(new Date())
}

export function metindenTarih(metin) {
  if (!metin) return null
  const [y, a, g] = metin.split('-').map(Number)
  if (!y || !a || !g) return null
  return new Date(y, a - 1, g)
}

const GUN_MS = 24 * 60 * 60 * 1000

// b - a, gün cinsinden (yaz saati farkından etkilenmemesi için yuvarlanır)
export function gunFarki(aMetin, bMetin) {
  const a = metindenTarih(aMetin)
  const b = metindenTarih(bMetin)
  if (!a || !b) return null
  return Math.round((b - a) / GUN_MS)
}

export function gunEkle(metin, gun) {
  const t = metindenTarih(metin)
  t.setDate(t.getDate() + gun)
  return tarihMetni(t)
}

// Verilen tarihin bulunduğu haftanın pazartesi günü
export function haftaBasi(metin) {
  const t = metindenTarih(metin)
  const gun = (t.getDay() + 6) % 7 // pazartesi = 0
  t.setDate(t.getDate() - gun)
  return tarihMetni(t)
}

const AYLAR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']

export function kisaTarih(metin) {
  const t = metindenTarih(metin)
  if (!t) return ''
  return `${t.getDate()} ${AYLAR[t.getMonth()]}`
}

// Son başvuru tarihine göre rozet bilgisi; gösterilecek bir şey yoksa null
export function sonTarihDurumu(sonTarih, esik, bugun = bugunMetni()) {
  const kalan = gunFarki(bugun, sonTarih)
  if (kalan === null) return null
  if (kalan < 0) return { tur: 'gecti', metin: 'Süresi geçti' }
  if (kalan === 0) return { tur: 'yakin', metin: 'Son gün bugün' }
  if (kalan <= esik) return { tur: 'yakin', metin: `${kalan} gün kaldı` }
  return null
}
