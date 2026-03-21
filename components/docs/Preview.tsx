'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useState } from 'react'
import { useTheme } from 'nextra-theme-docs'

type PreviewProps = {
  title?: string
  description?: string
  children: ReactNode
}

const getToggleButtonStyle = (active: boolean, mode: 'light' | 'dark'): CSSProperties => ({
  border: '1px solid',
  borderColor: active ? (mode === 'dark' ? '#60a5fa' : '#1d4ed8') : '#cbd5e1',
  background: active
    ? mode === 'dark'
      ? '#1e3a8a'
      : '#dbeafe'
    : mode === 'dark'
      ? 'rgba(15, 23, 42, 0.35)'
      : '#ffffff',
  color: active ? (mode === 'dark' ? '#eff6ff' : '#1e3a8a') : mode === 'dark' ? '#e2e8f0' : '#334155',
  borderRadius: '999px',
  padding: '0.35rem 0.7rem',
  fontSize: '0.8rem',
  fontWeight: 700,
  cursor: 'pointer'
})

export const Preview = ({
  title = 'Live Preview',
  description,
  children
}: PreviewProps) => {
  const { resolvedTheme } = useTheme()
  const [mode, setMode] = useState<'light' | 'dark' | null>(null)
  const effectiveMode = mode ?? (resolvedTheme === 'dark' ? 'dark' : 'light')
  const isDark = effectiveMode === 'dark'

  return (
    <section
      style={{
        margin: '1.5rem 0',
        border: `1px solid ${isDark ? '#334155' : '#d4d4d8'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(2,6,23,1) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)'
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0.875rem 1rem',
          borderBottom: `1px solid ${isDark ? '#334155' : '#e4e4e7'}`,
          background: isDark ? '#0f172a' : '#fafafa'
        }}
      >
        <div>
          <strong style={{ display: 'block', color: isDark ? '#f8fafc' : '#0f172a' }}>
            {title}
          </strong>
          {description ? (
            <span
              style={{
                display: 'block',
                marginTop: '0.25rem',
                color: isDark ? '#cbd5e1' : '#52525b'
              }}
            >
              {description}
            </span>
          ) : null}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <button
            type="button"
            style={getToggleButtonStyle(effectiveMode === 'light', effectiveMode)}
            onClick={() => setMode('light')}
          >
            Light
          </button>
          <button
            type="button"
            style={getToggleButtonStyle(effectiveMode === 'dark', effectiveMode)}
            onClick={() => setMode('dark')}
          >
            Dark
          </button>
        </div>
      </header>
      <div
        style={{
          padding: '1.25rem',
          backgroundColor: isDark ? '#020617' : '#f8fafc',
          backgroundImage: isDark
            ? 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.16) 1px, transparent 0)'
            : 'radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.08) 1px, transparent 0)',
          backgroundSize: '18px 18px'
        }}
      >
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '12px',
            background: isDark ? '#0f172a' : '#ffffff',
            color: isDark ? '#f8fafc' : '#0f172a',
            boxShadow: isDark
              ? '0 10px 30px rgba(2, 6, 23, 0.4)'
              : '0 10px 30px rgba(15, 23, 42, 0.08)',
            colorScheme: effectiveMode
          }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
