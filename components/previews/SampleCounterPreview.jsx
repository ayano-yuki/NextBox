import { Preview } from '../docs/Preview'
import { SampleCounter } from '../../src/components/examples/SampleCounter'

export function SampleCounterPreview() {
  return (
    <Preview
      title="Live Preview"
      description="ボタンを押すと MDX ページ内で state が更新されます。"
    >
      <SampleCounter initialCount={2} step={1} />
    </Preview>
  )
}
