'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'
import { useTheme } from 'nextra-theme-docs'

type SourceFileFrameProps = {
  title: string
  language: string
  lightHtml: string
  darkHtml: string
}

const getToggleButtonStyle = (active: boolean, mode: 'light' | 'dark'): CSSProperties => ({
  border: '1px solid',
  borderColor: active ? (mode === 'dark' ? '#60a5fa' : '#1d4ed8') : '#475569',
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

export const SourceFileFrame = ({
  title,
  language,
  lightHtml,
  darkHtml
}: SourceFileFrameProps) => {
  const { resolvedTheme } = useTheme()
  const [mode, setMode] = useState<'light' | 'dark' | null>(null)
  const effectiveMode = mode ?? (resolvedTheme === 'dark' ? 'dark' : 'light')
  const isDark = effectiveMode === 'dark'

  return (
    <section
      style={{
        margin: '1.5rem 0',
        border: `1px solid ${isDark ? '#27272a' : '#d4d4d8'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        background: isDark ? '#09090b' : '#f8fafc',
        color: isDark ? '#f4f4f5' : '#18181b'
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          alignItems: 'center',
          padding: '0.875rem 1rem',
          borderBottom: `1px solid ${isDark ? '#3f3f46' : '#e4e4e7'}`,
          background: isDark ? '#111827' : '#ffffff',
          fontSize: '0.9rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <strong>{title}</strong>
          <span style={{ color: isDark ? '#a1a1aa' : '#64748b' }}>{language}</span>
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
        className="source-file-content"
        style={{
          fontSize: '0.9rem',
          lineHeight: 1.6
        }}
        dangerouslySetInnerHTML={{ __html: isDark ? darkHtml : lightHtml }}
      />
      <style>{`
        .source-file-content pre {
          margin: 0 !important;
          padding: 1rem !important;
          overflow-x: auto !important;
        }

        .source-file-content code {
          display: block;
          counter-reset: line;
        }

        .source-file-content .line {
          display: inline-block;
          min-width: 100%;
        }

        .source-file-content .line::before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
          width: 2.5rem;
          margin-right: 1rem;
          text-align: right;
          user-select: none;
          opacity: 0.45;
        }
      `}</style>
    </section>
  )
}
