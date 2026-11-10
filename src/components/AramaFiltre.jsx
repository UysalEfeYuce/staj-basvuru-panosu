import { DURUMLAR } from '../utils/sabitler.js'

export default function AramaFiltre({
  arama,
  setArama,
  durumFiltre,
  setDurumFiltre,
  sadeceAcil,
  setSadeceAcil,
  sonucSayisi,
  toplam,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="relative flex-1 sm:max-w-sm">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 3.36 9.86l3.39 3.39a.75.75 0 1 0 1.06-1.06l-3.39-3.39A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="search"
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          placeholder="Şirket, pozisyon veya not ara"
          aria-label="Başvurularda ara"
          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={durumFiltre}
          onChange={(e) => setDurumFiltre(e.target.value)}
          aria-label="Sütun filtresi"
          className="rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="hepsi">Tüm sütunlar</option>
          {DURUMLAR.map((d) => (
            <option key={d.id} value={d.id}>
              {d.ad}
            </option>
          ))}
        </select>

        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700 select-none">
          <input
            type="checkbox"
            checked={sadeceAcil}
            onChange={(e) => setSadeceAcil(e.target.checked)}
            className="size-4 rounded border-slate-300 accent-indigo-600"
          />
          Son tarihi yaklaşanlar
        </label>

        {sonucSayisi !== toplam && (
          <span className="text-sm text-slate-500">
            {sonucSayisi} / {toplam} gösteriliyor
          </span>
        )}
      </div>
    </div>
  )
}
