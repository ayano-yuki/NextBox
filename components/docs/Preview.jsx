export function Preview({
  title = 'Live Preview',
  description,
  children
}) {
  return (
    <section
      style={{
        margin: '1.5rem 0',
        border: '1px solid #d4d4d8',
        borderRadius: '16px',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)'
      }}
    >
      <header
        style={{
          padding: '0.875rem 1rem',
          borderBottom: '1px solid #e4e4e7',
          background: '#fafafa'
        }}
      >
        <strong style={{ display: 'block' }}>{title}</strong>
        {description ? (
          <span style={{ display: 'block', marginTop: '0.25rem', color: '#52525b' }}>
            {description}
          </span>
        ) : null}
      </header>
      <div
        style={{
          padding: '1.25rem',
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.08) 1px, transparent 0)',
          backgroundSize: '18px 18px'
        }}
      >
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '12px',
            background: '#ffffff',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
          }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
