'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'

type SampleCounterProps = {
  initialCount?: number
  step?: number
}

const buttonStyle: CSSProperties = {
  padding: '0.7rem 1rem',
  border: 'none',
  borderRadius: '999px',
  background: '#0f172a',
  color: '#ffffff',
  cursor: 'pointer'
}

export const SampleCounter = ({
  initialCount = 2,
  step = 1
}: SampleCounterProps) => {
  const [count, setCount] = useState(initialCount)

  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        justifyItems: 'start'
      }}
    >
      <div>
        <div style={{ fontSize: '0.9rem', color: '#475569' }}>Current Count</div>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{count}</div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button style={buttonStyle} onClick={() => setCount(value => value + step)}>
          +{step}
        </button>
        <button
          style={{
            ...buttonStyle,
            background: '#e2e8f0',
            color: '#0f172a'
          }}
          onClick={() => setCount(initialCount)}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
