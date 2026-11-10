import BasvuruKarti from './BasvuruKarti.jsx'

export default function Sutun({ durum, basvurular, onDuzenle, tekSutun }) {
  return (
    <section
      aria-label={`${durum.ad} sütunu`}
      className={`snap-start shrink-0 flex flex-col rounded-xl border border-slate-200 border-t-4 ${durum.serit} bg-slate-100/70 ${
        tekSutun ? 'w-full max-w-xl' : 'w-[80vw] max-w-[300px] lg:w-auto lg:max-w-none'
      }`}
    >
      <header className="flex items-center gap-2 px-3 py-2.5">
        <span className={`size-2 rounded-full ${durum.nokta}`} aria-hidden="true" />
        <h2 className="text-sm font-semibold text-slate-800">{durum.ad}</h2>
        <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600 tabular-nums">
          {basvurular.length}
        </span>
      </header>

      <div className="flex flex-col gap-2.5 px-2.5 pb-3 min-h-24">
        {basvurular.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-500">
            Bu sütunda kart yok
          </p>
        ) : (
          basvurular.map((b) => <BasvuruKarti key={b.id} basvuru={b} onDuzenle={onDuzenle} />)
        )}
      </div>
    </section>
  )
}
