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
      style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(26,22,18,0.12)',
        borderBottom: '1px solid rgba(26,22,18,0.12)',
        padding: '18px 0',
        background: '#EDE7D9',
      }}
    >
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 28s linear infinite' }}>
        {doubled.map((name, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '32px',
              padding: '0 32px',
              fontSize: '0.68rem',
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#6B6258',
              fontFamily: 'DM Sans, sans-serif',
              flexShrink: 0,
            }}
          >
            {name}
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#8B6F47',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}
