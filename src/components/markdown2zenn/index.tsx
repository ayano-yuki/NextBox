import "@/components/markdown2zenn/zenn-content.css"
import { promises as fs } from "fs"
import * as path from "path"
import markdownHtml from "zenn-markdown-html"

type MarkdownViewerProps = {
  markdownFilePath: string
}

const getConvertedHtml = async (
  markdownFilePath: string
): Promise<string> => {
  try {
    const markdownPath = path.join(process.cwd(), markdownFilePath)
    const markdown = await fs.readFile(markdownPath, "utf-8")
    const contentHtml = markdownHtml(markdown)

    return `
      <div class="znc">
        ${contentHtml}
      </div>
    `
    
  } catch (err) {
    console.error(`Markdownファイル (${markdownFilePath}) の読み込みまたは変換エラー:`, err)
    return `
      <div class="znc">
        <p>コンテンツの読み込みに失敗しました。</p>
        <p>ファイルパス: <code>${path.join(process.cwd(), markdownFilePath)}</code> を確認してください。</p>
      </div>
    `
  }
}

export const MarkdownViewer = async ({
  markdownFilePath
}: MarkdownViewerProps) => {
  const htmlContent = await getConvertedHtml(markdownFilePath)

  return (
    <div className="markdown-content">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}
