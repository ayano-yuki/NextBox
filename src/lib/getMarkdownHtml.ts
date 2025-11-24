import { promises as fs } from "fs";
import * as path from "path";
import markdownHtml from "zenn-markdown-html";

export async function getConvertedHtml(MARKDOWN_FILENAME: string): Promise<string> {
  try {
    const markdownPath = path.join(process.cwd(), MARKDOWN_FILENAME);
    const markdown = await fs.readFile(markdownPath, "utf-8");
    const contentHtml = markdownHtml(markdown);

    return `
      <div class="znc">
        ${contentHtml}
      </div>
    `;
    
  } catch (err) {
    console.error(`Markdownファイル (${MARKDOWN_FILENAME}) の読み込みまたは変換エラー:`, err);
    return `
      <div class="znc">
        <p>コンテンツの読み込みに失敗しました。</p>
        <p>ファイルパス: <code>${path.join(process.cwd(), MARKDOWN_FILENAME)}</code> を確認してください。</p>
      </div>
    `;
  }
}