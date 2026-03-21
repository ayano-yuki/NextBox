'use client'

import { useRouter } from 'next/navigation'
import { Preview } from '../docs/Preview'
import { useDisabledBrowserBack } from '../../src/functions/disabledBrowserBack'

const baseButtonStyle = {
  border: 'none',
  borderRadius: '999px',
  padding: '0.8rem 1.1rem',
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.12)'
}

export function DisabledBrowserBackPreview() {
  const router = useRouter()

  useDisabledBrowserBack()

  return (
    <Preview
      title="Live Preview"
      description="このプレビューを開いた状態で戻る操作をすると、フックが popstate を検知して戻る動作を抑止します。"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.75rem'
        }}
      >
        <div>ブラウザバックの禁止</div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            style={{
              ...baseButtonStyle,
              background: '#dc2626',
              color: '#ffffff'
            }}
            onClick={() => window.history.back()}
          >
            戻る
          </button>
          <button
            style={{
              ...baseButtonStyle,
              background: '#e2e8f0',
              color: '#0f172a'
            }}
            onClick={() => router.push('/functions')}
          >
            Functions へ移動
          </button>
        </div>
      </div>
    </Preview>
  )
}
