import { bugunMetni, gunEkle } from './tarih.js'

// Boş panoda "Örnek veri yükle" ile eklenen kurgusal başvurular.
// Tarihler bugüne göre hesaplanır ki uyarı rozetleri ve grafik dolu görünsün.
export function ornekBasvurular() {
  const bugun = bugunMetni()
  const once = (gun) => gunEkle(bugun, -gun)
  const sonra = (gun) => gunEkle(bugun, gun)

  const kayitlar = [
    { sirket: 'Kuzey Yazılım', pozisyon: 'Frontend Stajyeri', durum: 'basvurulacak', sonTarih: sonra(2), link: '', notlar: 'Portfolyo linkini eklemeyi unutma.' },
    { sirket: 'Mavi Bulut Teknoloji', pozisyon: 'Yazılım Geliştirme Stajyeri', durum: 'basvurulacak', sonTarih: sonra(12), link: '', notlar: '' },
    { sirket: 'Ada Analitik', pozisyon: 'Veri Bilimi Stajyeri', durum: 'basvurulacak', sonTarih: once(1), link: '', notlar: 'Ön yazı istiyorlar.' },
    { sirket: 'Pusula Fintech', pozisyon: 'React Geliştirici Stajyeri', durum: 'basvuruldu', basvuruTarihi: once(1), link: '', notlar: '' },
    { sirket: 'Orman Oyun Stüdyosu', pozisyon: 'Oyun Programcısı Stajyeri', durum: 'basvuruldu', basvuruTarihi: once(9), link: '', notlar: '' },
    { sirket: 'Liman Lojistik', pozisyon: 'Full Stack Stajyer', durum: 'basvuruldu', basvuruTarihi: once(17), link: '', notlar: '' },
    { sirket: 'Tepe E-Ticaret', pozisyon: 'Web Geliştirme Stajyeri', durum: 'mulakat', basvuruTarihi: once(12), link: '', notlar: 'Teknik mülakat perşembe 14:00.' },
    { sirket: 'Işık Sağlık Yazılım', pozisyon: 'Frontend Stajyeri', durum: 'mulakat', basvuruTarihi: once(24), link: '', notlar: '' },
    { sirket: 'Rota Mobil', pozisyon: 'Mobil Geliştirici Stajyeri', durum: 'teklif', basvuruTarihi: once(33), link: '', notlar: 'Teklif cuma gününe kadar geçerli.' },
    { sirket: 'Vadi Danışmanlık', pozisyon: 'BT Stajyeri', durum: 'ret', basvuruTarihi: once(40), link: '', notlar: '' },
    { sirket: 'Zirve Medya', pozisyon: 'UI Geliştirme Stajyeri', durum: 'ret', basvuruTarihi: once(20), link: '', notlar: '' },
  ]

  return kayitlar.map((k, i) => ({
    id: crypto.randomUUID(),
    basvuruTarihi: null,
    sonTarih: null,
    ...k,
    olusturma: new Date(Date.now() - i * 60000).toISOString(),
  }))
}
