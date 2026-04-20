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
]

export function Marquee() {
  const doubled = [...CLIENTS, ...CLIENTS]
  return (
    <div
      className="relative overflow-hidden border-y border-[rgba(240,235,227,0.12)] bg-ink-deep py-6"
      aria-label="Client marquee"
    >
      <div className="flex whitespace-nowrap will-change-transform" style={{ animation: 'marquee 36s linear infinite' }}>
        {doubled.map((name, i) => (
          <span
            key={i}
            className="flex flex-shrink-0 items-center gap-10 pr-10 font-serif italic text-cream-ds"
            style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 300 }}
          >
            {name}
            <span className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}
