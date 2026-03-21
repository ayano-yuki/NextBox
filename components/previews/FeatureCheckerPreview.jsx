import { Preview } from '../docs/Preview'
import { FeatureChecker } from '../../src/components/feature-checker'

export function FeatureCheckerPreview() {
  return (
    <Preview
      title="Live Preview"
      description="このブラウザでサポートされている機能を確認できます。"
    >
      <FeatureChecker />
    </Preview>
  )
}
