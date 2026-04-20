const CLIENTS = [
  'Anne Klein',
  'Joseph Abboud',
  'Lotto US',
  'Casa Amour Tequila',
  'Teeccino',
  'Kloo Coffee',
  'Kandeyce Jorden Art',
  'GCMG Agency',
  'Saints Rose Agency',
] as const

/**
 * Cream marquee — two counter-scrolling tracks stacked vertically.
 * Top: large italic serif, bottom: small mono uppercase, moving right-to-left.
 */
export function Marquee() {
  const doubled = [...CLIENTS, ...CLIENTS, ...CLIENTS]
  return (
    <section className="relative overflow-hidden border-y border-[color:var(--rule)] bg-cream py-8 md:py-10">
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: 'mq-left 38s linear infinite' }}
      >
        {doubled.map((name, i) => (
          <span
            key={`t-${i}`}
            className="flex flex-shrink-0 items-center gap-10 pr-10 font-serif italic text-ink"
            style={{ fontSize: 'clamp(1.5rem,3vw,2.75rem)', fontWeight: 300 }}
          >
            {name}
            <span className="inline-block h-[6px] w-[6px] flex-shrink-0 rounded-full bg-accent" />
          </span>
        ))}
      </div>
      <div
        className="mt-4 flex whitespace-nowrap will-change-transform"
        style={{ animation: 'mq-right 46s linear infinite' }}
      >
        {[...doubled].reverse().map((name, i) => (
          <span
            key={`b-${i}`}
            className="flex flex-shrink-0 items-center gap-10 pr-10 font-mono uppercase text-ink-light"
            style={{ fontSize: '0.85rem', letterSpacing: '0.22em' }}
          >
            {name}
            <span className="inline-block h-1 w-1 flex-shrink-0 rounded-full bg-ink-light" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes mq-left  { from { transform: translateX(0); }    to { transform: translateX(-33.333%); } }
        @keyframes mq-right { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  )
}
