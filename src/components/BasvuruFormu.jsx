import { useEffect, useRef, useState } from 'react'
import { useBasvurular } from '../context/BasvuruContext.jsx'
import { DURUMLAR } from '../utils/sabitler.js'

const BOS_FORM = {
  sirket: '',
  pozisyon: '',
  durum: 'basvurulacak',
  basvuruTarihi: '',
  sonTarih: '',
  link: '',
  notlar: '',
}

function dogrula(f) {
  const hatalar = {}
  if (!f.sirket.trim()) hatalar.sirket = 'Şirket adı gerekli.'
  if (!f.pozisyon.trim()) hatalar.pozisyon = 'Pozisyon gerekli.'
  if (f.link.trim() && !/^https?:\/\/\S+$/i.test(f.link.trim())) {
    hatalar.link = 'Bağlantı http:// veya https:// ile başlamalı.'
  }
  return hatalar
}

const girdiSinifi = (hata) =>
  `w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
    hata
      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
      : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'
  }`

function Alan({ etiket, htmlFor, hata, ipucu, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
        {etiket}
      </label>
      {children}
      {hata ? (
        <p id={`${htmlFor}-hata`} className="text-xs text-rose-600">
          {hata}
        </p>
      ) : (
        ipucu && <p className="text-xs text-slate-500">{ipucu}</p>
      )}
    </div>
  )
}

export default function BasvuruFormu({ basvuru, onKapat }) {
  const { ekle, guncelle, sil } = useBasvurular()
  const duzenleme = Boolean(basvuru)
  const dialogRef = useRef(null)

  const [form, setForm] = useState(() =>
    duzenleme
      ? {
          ...BOS_FORM,
          ...basvuru,
          basvuruTarihi: basvuru.basvuruTarihi ?? '',
          sonTarih: basvuru.sonTarih ?? '',
        }
      : BOS_FORM,
  )
  const [hatalar, setHatalar] = useState({})

  // Yerel <dialog>: Esc ile kapanır, odak modal içinde kalır
  useEffect(() => {
    const d = dialogRef.current
    if (d && !d.open) d.showModal()
  }, [])

  const degistir = (alan) => (e) => {
    setForm((f) => ({ ...f, [alan]: e.target.value }))
    if (hatalar[alan]) setHatalar((h) => ({ ...h, [alan]: undefined }))
  }

  const kaydet = (e) => {
    e.preventDefault()
    const h = dogrula(form)
    if (Object.keys(h).length > 0) {
      setHatalar(h)
      return
    }
    const veri = {
      sirket: form.sirket.trim(),
      pozisyon: form.pozisyon.trim(),
      durum: form.durum,
      basvuruTarihi: form.basvuruTarihi || null,
      sonTarih: form.sonTarih || null,
      link: form.link.trim(),
      notlar: form.notlar.trim(),
    }
    if (duzenleme) guncelle(basvuru.id, veri)
    else ekle(veri)
    onKapat()
  }

  const silOnayla = () => {
    if (window.confirm(`"${basvuru.sirket} – ${basvuru.pozisyon}" başvurusu silinsin mi?`)) {
      sil(basvuru.id)
      onKapat()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onKapat}
      onClick={(e) => {
        // Arka plana tıklanınca kapat
        if (e.target === dialogRef.current) onKapat()
      }}
      aria-labelledby="form-baslik"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white p-0 shadow-xl backdrop:bg-slate-900/40 backdrop:backdrop-blur-[2px]"
    >
      <form onSubmit={kaydet} noValidate className="flex max-h-[90dvh] flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 id="form-baslik" className="text-lg font-semibold text-slate-900">
            {duzenleme ? 'Başvuruyu düzenle' : 'Yeni başvuru'}
          </h2>
          <button
            type="button"
            onClick={onKapat}
            aria-label="Kapat"
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        <div className="grid gap-4 overflow-y-auto px-5 py-5 sm:grid-cols-2">
          <Alan etiket="Şirket *" htmlFor="sirket" hata={hatalar.sirket}>
            <input
              id="sirket"
              autoFocus
              value={form.sirket}
              onChange={degistir('sirket')}
              aria-invalid={Boolean(hatalar.sirket)}
              aria-describedby={hatalar.sirket ? 'sirket-hata' : undefined}
              className={girdiSinifi(hatalar.sirket)}
            />
          </Alan>

          <Alan etiket="Pozisyon *" htmlFor="pozisyon" hata={hatalar.pozisyon}>
            <input
              id="pozisyon"
              value={form.pozisyon}
              onChange={degistir('pozisyon')}
              aria-invalid={Boolean(hatalar.pozisyon)}
              aria-describedby={hatalar.pozisyon ? 'pozisyon-hata' : undefined}
              className={girdiSinifi(hatalar.pozisyon)}
            />
          </Alan>

          <Alan etiket="Durum" htmlFor="durum">
            <select
              id="durum"
              value={form.durum}
              onChange={degistir('durum')}
              className={girdiSinifi()}
            >
              {DURUMLAR.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.ad}
                </option>
              ))}
            </select>
          </Alan>

          <Alan etiket="Başvuru tarihi" htmlFor="basvuruTarihi">
            <input
              id="basvuruTarihi"
              type="date"
              value={form.basvuruTarihi}
              onChange={degistir('basvuruTarihi')}
              className={girdiSinifi()}
            />
          </Alan>

          <Alan
            etiket="Son başvuru tarihi"
            htmlFor="sonTarih"
            ipucu="Yaklaşınca kartta uyarı çıkar."
          >
            <input
              id="sonTarih"
              type="date"
              value={form.sonTarih}
              onChange={degistir('sonTarih')}
              className={girdiSinifi()}
            />
          </Alan>

          <Alan etiket="İlan bağlantısı" htmlFor="link" hata={hatalar.link}>
            <input
              id="link"
              type="url"
              inputMode="url"
              placeholder="https://"
              value={form.link}
              onChange={degistir('link')}
              aria-invalid={Boolean(hatalar.link)}
              aria-describedby={hatalar.link ? 'link-hata' : undefined}
              className={girdiSinifi(hatalar.link)}
            />
          </Alan>

          <div className="sm:col-span-2">
            <Alan etiket="Notlar" htmlFor="notlar">
              <textarea
                id="notlar"
                rows={3}
                value={form.notlar}
                onChange={degistir('notlar')}
                placeholder="Mülakat saati, iletişim kişisi, istenen belgeler..."
                className={`${girdiSinifi()} resize-y`}
              />
            </Alan>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-slate-100 px-5 py-4">
          {duzenleme && (
            <button
              type="button"
              onClick={silOnayla}
              className="rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
            >
              Sil
            </button>
          )}
          <button
            type="button"
            onClick={onKapat}
            className="ml-auto rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {duzenleme ? 'Kaydet' : 'Ekle'}
          </button>
        </div>
      </form>
    </dialog>
  )
}
