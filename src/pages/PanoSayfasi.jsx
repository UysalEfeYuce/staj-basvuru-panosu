import { useMemo, useState } from 'react'
import { useBasvurular } from '../context/BasvuruContext.jsx'
import AramaFiltre from '../components/AramaFiltre.jsx'
import Sutun from '../components/Sutun.jsx'
import { DURUMLAR, YAKLASAN_GUN_ESIGI } from '../utils/sabitler.js'
import { sonTarihDurumu } from '../utils/tarih.js'
import { ornekBasvurular } from '../utils/ornekVeri.js'

// Türkçe karakterleri doğru küçültmek için
const kucult = (s) => s.toLocaleLowerCase('tr')

export default function PanoSayfasi({ onDuzenle, onYeni }) {
  const { basvurular, topluYukle } = useBasvurular()
  const [arama, setArama] = useState('')
  const [durumFiltre, setDurumFiltre] = useState('hepsi')
  const [sadeceAcil, setSadeceAcil] = useState(false)

  const filtrelenmis = useMemo(() => {
    const q = kucult(arama.trim())
    return basvurular.filter((b) => {
      if (q && !kucult(`${b.sirket} ${b.pozisyon} ${b.notlar}`).includes(q)) return false
      if (sadeceAcil) {
        if (b.durum !== 'basvurulacak') return false
        if (!sonTarihDurumu(b.sonTarih, YAKLASAN_GUN_ESIGI)) return false
      }
      return true
    })
  }, [basvurular, arama, sadeceAcil])

  const gorunenSutunlar =
    durumFiltre === 'hepsi' ? DURUMLAR : DURUMLAR.filter((d) => d.id === durumFiltre)

  if (basvurular.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-indigo-50 text-2xl">
          📋
        </div>
        <h1 className="text-xl font-semibold text-slate-900">Henüz başvuru yok</h1>
        <p className="mt-2 text-slate-600">
          İlk başvurunu ekleyerek başla. Uygulamayı denemek istersen örnek verilerle de açabilirsin.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onYeni}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            İlk başvuruyu ekle
          </button>
          <button
            type="button"
            onClick={() => topluYukle(ornekBasvurular())}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Örnek veri yükle
          </button>
        </div>
      </div>
    )
  }

  const filtreAktif = arama.trim() !== '' || sadeceAcil

  return (
    <div className="flex flex-col gap-4">
      <AramaFiltre
        arama={arama}
        setArama={setArama}
        durumFiltre={durumFiltre}
        setDurumFiltre={setDurumFiltre}
        sadeceAcil={sadeceAcil}
        setSadeceAcil={setSadeceAcil}
        sonucSayisi={filtrelenmis.length}
        toplam={basvurular.length}
      />

      {filtreAktif && filtrelenmis.length === 0 ? (
        <p className="py-16 text-center text-slate-500">Bu filtrelere uyan başvuru bulunamadı.</p>
      ) : (
        // Mobilde sütunlar yatay kayar, geniş ekranda beşi yan yana sığar
        <div className="-mx-4 sm:mx-0 overflow-x-auto snap-x snap-mandatory pb-2">
          <div
            className={`flex gap-4 px-4 sm:px-0 ${
              gorunenSutunlar.length > 1 ? 'lg:grid lg:grid-cols-5' : ''
            }`}
          >
            {gorunenSutunlar.map((durum) => (
              <Sutun
                key={durum.id}
                durum={durum}
                basvurular={filtrelenmis.filter((b) => b.durum === durum.id)}
                onDuzenle={onDuzenle}
                tekSutun={gorunenSutunlar.length === 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
