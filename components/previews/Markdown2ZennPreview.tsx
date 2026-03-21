import { Preview } from '$/docs/Preview'
import { MarkdownViewer } from '@/components/markdown2zenn'

export const Markdown2ZennPreview = () => {
  return (
    <Preview
      title="Live Preview"
      description="このブラウザでサポートされている機能を確認できます。"
    >
      <MarkdownViewer markdownFilePath="src/components/markdown2zenn/test.hoge" />
    </Preview>
  )
}
