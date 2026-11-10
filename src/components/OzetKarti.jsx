export default function OzetKarti({ baslik, deger, alt, vurgu = false }) {
  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 ${
        vurgu ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white'
      }`}
    >
      <p className="text-sm text-slate-500">{baslik}</p>
      <p
        className={`mt-1 text-3xl font-semibold tabular-nums ${
          vurgu ? 'text-emerald-700' : 'text-slate-900'
        }`}
      >
        {deger}
      </p>
      {alt && <p className="mt-1 text-xs text-slate-500">{alt}</p>}
    </div>
  )
}
