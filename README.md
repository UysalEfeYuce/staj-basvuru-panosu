# Staj Başvuru Panosu

Staj ve iş başvurularını tek bir yerden takip etmek için hazırlanmış bir kanban panosu. Her başvuru bir kart olarak "Başvurulacak → Başvuruldu → Mülakat → Teklif / Ret" sütunlarında ilerler. Son başvuru tarihi yaklaşan ilanlar uyarı rozetiyle öne çıkar, istatistik ekranı da başvuru sürecinin genel durumunu gösterir.

Uygulamanın sunucusu yoktur; tüm veriler tarayıcının **LocalStorage** alanında saklanır.

**Canlı demo:** _(Vercel linki buraya eklenecek)_

![Pano ekranı](docs/pano.png)

## Özellikler

- **Kanban pano:** beş durum sütunu ve her sütunda kart sayısı
- **Başvuru ekleme, düzenleme ve silme:** zorunlu alan ve bağlantı doğrulaması olan bir modal form
- **Hızlı durum değiştirme:** karttaki açılır menüyle. "Başvurulacak" sütunundan çıkan bir kartın başvuru tarihi boşsa bugünün tarihi otomatik yazılır.
- **Son tarih uyarısı:** son başvuru tarihine 3 gün veya daha az kalan kartlarda sarı, süresi geçenlerde kırmızı rozet
- **Arama ve filtre:** şirket, pozisyon ve notlarda Türkçe karakter uyumlu arama, tek sütun gösterme, yalnızca son tarihi yaklaşanları listeleme
- **İstatistik ekranı:** toplam kayıt, gönderilen başvuru, mülakata dönüş oranı, teklif sayısı, son 8 haftanın başvuru grafiği ve durum dağılımı
- **Kalıcılık:** veriler sayfa yenilense de korunur, bozuk veri uygulamayı çökertmez
- **Örnek veri:** boş panoda tek tıkla kurgusal başvurular yüklenerek uygulama denenebilir
- **Mobil uyum:** dar ekranda sütunlar yatay kaydırılır

## Ekran görüntüleri

| İstatistik | Düzenleme formu | Mobil |
|---|---|---|
| ![İstatistik ekranı](docs/istatistik.png) | ![Başvuru formu](docs/form.png) | ![Mobil görünüm](docs/mobil.png) |

## Kullanılan teknolojiler

| Teknoloji | Kullanım amacı |
|---|---|
| [React 19](https://react.dev) | Arayüz bileşenleri, `useReducer` ve Context ile durum yönetimi |
| [Vite 8](https://vite.dev) | Geliştirme sunucusu ve üretim derlemesi |
| [Tailwind CSS 4](https://tailwindcss.com) | Stil (`@tailwindcss/vite` eklentisiyle) |
| LocalStorage | Verilerin tarayıcıda saklanması |
| [Oxlint](https://oxc.rs) | Kod denetimi (lint) |
| [Vercel](https://vercel.com) | Yayınlama |

Ek bir arayüz, grafik veya sürükle-bırak kütüphanesi kullanılmadı. Grafikler saf CSS ile çizildi.

## Kurulum

Gereksinim: [Node.js](https://nodejs.org) 20.19+ veya 22.12+.

```bash
git clone https://github.com/UysalEfeYuce/staj-basvuru-panosu.git
cd staj-basvuru-panosu
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

Diğer komutlar:

```bash
npm run build     # dist/ klasörüne üretim derlemesi
npm run preview   # derlenmiş sürümü yerelde çalıştırır
npm run lint      # kod denetimi
```

## Proje yapısı

```
src/
├── components/   Header, Sutun, BasvuruKarti, BasvuruFormu, AramaFiltre, OzetKarti, HaftalikGrafik
├── pages/        PanoSayfasi, IstatistikSayfasi
├── context/      BasvuruContext (reducer + LocalStorage senkronu)
├── utils/        sabitler, tarih, istatistik, depolama, ornekVeri
├── App.jsx
└── main.jsx
```

## Veri modeli

Veriler `staj-panosu` anahtarıyla `{ surum: 1, basvurular: [...] }` biçiminde saklanır. Sürüm alanı, ileride şema değişirse eski verinin dönüştürülebilmesi için tutulur.

```js
{
  id: "uuid",
  sirket: "Kuzey Yazılım",          // zorunlu
  pozisyon: "Frontend Stajyeri",    // zorunlu
  durum: "basvurulacak",            // basvurulacak | basvuruldu | mulakat | teklif | ret
  basvuruTarihi: "2026-11-10",      // veya null
  sonTarih: "2026-11-20",           // veya null
  link: "https://...",
  notlar: "",
  olusturma: "2026-11-10T15:49:26.897Z"
}
```

**Mülakata dönüş oranı** = (Mülakat + Teklif) / gönderilen başvurular. "Başvurulacak" sütunundakiler henüz gönderilmediği için hesaba katılmaz. Veri modeli bir reddin mülakattan önce mi sonra mı geldiğini tutmadığından, "Ret" kartları mülakata dönmemiş sayılır.

## Yapay zekanın kullanımı

Geliştirmede yapay zeka asistanı olarak **Claude** (Claude Code) kullanıldı. Şu konularda yardım alındı:

- **Planlama:** proje fikri seçenekleri ve MVP kapsamının (ekranlar, veri modeli) taslağı
- **Kod:** bileşenlerin ilk sürümleri ve Tailwind CSS 4 kurulumu
- **Hata ayıklama:** tarih hesaplarında gün kayması ve güvensiz bağlantılar gibi sorunların bulunması
- **Dokümantasyon:** bu README'nin taslağı

Üretilen kod tarayıcıda çalıştırılıp denendi. İstatistik ekranındaki sayılar örnek verilerle elle sayılarak kontrol edildi.

## Sonraki sürüm için fikirler

- Kartları sütunlar arasında sürükle-bırak ile taşıma
- Verileri JSON olarak dışa ve içe aktarma (yedekleme)
- Karanlık mod
- Mülakat tarihi alanı ve takvim görünümü
