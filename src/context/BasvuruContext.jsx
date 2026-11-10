/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { basvurulariOku, basvurulariYaz } from '../utils/depolama.js'
import { bugunMetni } from '../utils/tarih.js'

const BasvuruContext = createContext(null)

function reducer(basvurular, eylem) {
  switch (eylem.tur) {
    case 'EKLE':
      return [
        { ...eylem.veri, id: crypto.randomUUID(), olusturma: new Date().toISOString() },
        ...basvurular,
      ]

    case 'GUNCELLE':
      return basvurular.map((b) => (b.id === eylem.id ? { ...b, ...eylem.veri } : b))

    case 'SIL':
      return basvurular.filter((b) => b.id !== eylem.id)

    case 'DURUM_DEGISTIR':
      return basvurular.map((b) => {
        if (b.id !== eylem.id) return b
        const guncel = { ...b, durum: eylem.durum }
        // "Başvurulacak"tan çıkan bir kartın başvuru tarihi yoksa bugünü yaz
        if (eylem.durum !== 'basvurulacak' && !b.basvuruTarihi) {
          guncel.basvuruTarihi = bugunMetni()
        }
        return guncel
      })

    case 'TOPLU_YUKLE':
      return eylem.basvurular

    default:
      return basvurular
  }
}

export function BasvuruProvider({ children }) {
  const [basvurular, dispatch] = useReducer(reducer, undefined, basvurulariOku)

  useEffect(() => {
    basvurulariYaz(basvurular)
  }, [basvurular])

  const deger = useMemo(
    () => ({
      basvurular,
      ekle: (veri) => dispatch({ tur: 'EKLE', veri }),
      guncelle: (id, veri) => dispatch({ tur: 'GUNCELLE', id, veri }),
      sil: (id) => dispatch({ tur: 'SIL', id }),
      durumDegistir: (id, durum) => dispatch({ tur: 'DURUM_DEGISTIR', id, durum }),
      topluYukle: (liste) => dispatch({ tur: 'TOPLU_YUKLE', basvurular: liste }),
    }),
    [basvurular],
  )

  return <BasvuruContext.Provider value={deger}>{children}</BasvuruContext.Provider>
}

export function useBasvurular() {
  const ctx = useContext(BasvuruContext)
  if (!ctx) throw new Error('useBasvurular, BasvuruProvider içinde kullanılmalı')
  return ctx
}
