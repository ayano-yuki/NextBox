import { Preview } from '$/docs/Preview'
import { FeatureChecker } from '@/components/feature-checker'

export const FeatureCheckerPreview = () => {
  return (
    <Preview
      title="Live Preview"
      description="このブラウザでサポートされている機能を確認できます。"
    >
      <FeatureChecker />
    </Preview>
  )
}
