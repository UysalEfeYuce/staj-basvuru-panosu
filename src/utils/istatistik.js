import { DURUMLAR } from './sabitler.js'
import { bugunMetni, gunEkle, haftaBasi } from './tarih.js'

export function durumSayilari(basvurular) {
  const sayilar = Object.fromEntries(DURUMLAR.map((d) => [d.id, 0]))
  for (const b of basvurular) {
    if (b.durum in sayilar) sayilar[b.durum] += 1
  }
  return sayilar
}

// Mülakata dönüş oranı = (mülakat + teklif) / gönderilmiş başvurular.
// "Başvurulacak" sütunundakiler henüz gönderilmediği için paydaya girmez.
// Not: veri modeli bir reddin mülakattan sonra mı geldiğini tutmadığı için
// "ret" kayıtlarının hepsi mülakata dönmemiş sayılır.
export function mulakatOrani(sayilar) {
  const gonderilen = sayilar.basvuruldu + sayilar.mulakat + sayilar.teklif + sayilar.ret
  if (gonderilen === 0) return null
  return (sayilar.mulakat + sayilar.teklif) / gonderilen
}

// Son `haftaSayisi` haftada (bu hafta dahil) kaç başvuru gönderildiği
export function haftalikBasvurular(basvurular, haftaSayisi = 8, bugun = bugunMetni()) {
  const buHafta = haftaBasi(bugun)
  const haftalar = []
  for (let i = haftaSayisi - 1; i >= 0; i--) {
    haftalar.push({ baslangic: gunEkle(buHafta, -7 * i), sayi: 0 })
  }
  const indeks = new Map(haftalar.map((h, i) => [h.baslangic, i]))
  for (const b of basvurular) {
    if (!b.basvuruTarihi) continue
    const i = indeks.get(haftaBasi(b.basvuruTarihi))
    if (i !== undefined) haftalar[i].sayi += 1
  }
  return haftalar
}
