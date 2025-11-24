// app/page.tsx
// (デフォルトで Server Component)
import "@/style/main.scss"; // グローバルスタイルのインポート
import { getConvertedHtml } from "@/lib/getMarkdownHtml"; // サーバーロジック

// MarkdownViewerコンポーネントもClient Componentとして別途定義が必要です

// 便宜上、Client Componentをページ内にインラインで定義しますが、
// 実際には外部ファイルに切り出すことを推奨します。
function MarkdownViewer({ htmlContent }: { htmlContent: string }) {
  // styled-jsx を使用しないため、ここでは Client Component ディレクティブは不要です。
  // (もしstyled-jsxを使う場合は、前の回答のように "use client" を追加してください)
  return (
    <div className="markdown-content">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      {/* <style jsx>...</style> があれば "use client" が必要 */}
    </div>
  );
}


export default async function Home() {
  // 読み込みたいファイルのパスを引数で渡す
  const markdownFilePath = "src/components/MarkdownViewer/test.md";
  
  // サーバー側で非同期処理を実行し、HTMLコンテンツを取得
  const html = await getConvertedHtml(markdownFilePath);
  
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1>動的Markdown読み込みテスト</h1>
      <p>読み込み元: <code>{markdownFilePath}</code></p>
      
      {/* Client Component (または Server Component) でHTMLを表示 */}
      <MarkdownViewer htmlContent={html} />
    </main>
  );
}