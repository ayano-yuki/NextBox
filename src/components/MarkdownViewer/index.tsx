"use client"; 

type MarkdownViewerProps = {
  htmlContent: string;
};

export function MarkdownViewer({ htmlContent }: MarkdownViewerProps) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      
      {/* styled-jsx をここ（Client Component）で使用します */}
      <style jsx>{`
        /* 独自のスタイルをここに追加 */
        div :global(.znc) {
          padding: 1rem;
          border: 1px solid #eee;
        }
      `}</style>
    </div>
  );
}