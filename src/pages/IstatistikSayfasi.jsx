import { useMemo } from 'react'
import { useBasvurular } from '../context/BasvuruContext.jsx'
import OzetKarti from '../components/OzetKarti.jsx'
import HaftalikGrafik from '../components/HaftalikGrafik.jsx'
import { DURUMLAR } from '../utils/sabitler.js'
import { durumSayilari, haftalikBasvurular, mulakatOrani } from '../utils/istatistik.js'

export default function IstatistikSayfasi({ onPanoyaGit }) {
  const { basvurular, topluYukle } = useBasvurular()

  const sayilar = useMemo(() => durumSayilari(basvurular), [basvurular])
  const haftalar = useMemo(() => haftalikBasvurular(basvurular), [basvurular])
  const oran = mulakatOrani(sayilar)
  const gonderilen = basvurular.length - sayilar.basvurulacak
  const aktif = sayilar.basvuruldu + sayilar.mulakat

  const sifirla = () => {
    if (window.confirm('Tüm başvurular kalıcı olarak silinsin mi? Bu işlem geri alınamaz.')) {
      topluYukle([])
      onPanoyaGit()
    }
  }

  if (basvurular.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-600">İstatistik için önce birkaç başvuru eklemelisin.</p>
        <button
          type="button"
          onClick={onPanoyaGit}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Panoya git
        </button>
      </div>
    )
  }

  const enCok = Math.max(...DURUMLAR.map((d) => sayilar[d.id]), 1)

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold text-slate-900">İstatistik</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <OzetKarti baslik="Toplam kayıt" deger={basvurular.length} />
        <OzetKarti baslik="Gönderilen başvuru" deger={gonderilen} alt={`${aktif} tanesi süreçte`} />
        <OzetKarti
          baslik="Mülakata dönüş"
          deger={oran === null ? '–' : `%${Math.round(oran * 100)}`}
          alt="Mülakat + teklif / gönderilen"
        />
        <OzetKarti baslik="Teklif" deger={sayilar.teklif} vurgu />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <section className="lg:col-span-3 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Haftalık gönderilen başvuru</h2>
          <p className="text-sm text-slate-500">Son 8 hafta, başvuru tarihine göre</p>
          <HaftalikGrafik haftalar={haftalar} />
        </section>

        <section className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Duruma göre dağılım</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {DURUMLAR.map((d) => (
              <li key={d.id} className="grid grid-cols-[6.5rem_1fr_2rem] items-center gap-3 text-sm">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className={`size-2 rounded-full ${d.nokta}`} aria-hidden="true" />
                  {d.ad}
                </span>
                <span className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <span
                    className={`block h-full rounded-full ${d.nokta}`}
                    style={{ width: `${(sayilar[d.id] / enCok) * 100}%` }}
                  />
                </span>
                <span className="text-right font-medium tabular-nums text-slate-900">
                  {sayilar[d.id]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={sifirla}
          className="text-sm text-slate-500 underline-offset-2 hover:text-rose-600 hover:underline"
        >
          Tüm verileri sil
        </button>
      </div>
    </div>
  )
}
