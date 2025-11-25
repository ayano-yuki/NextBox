import "@/style/main.scss"; 
import { getConvertedHtml } from "@/lib/getMarkdownHtml";
import type { MarkdownViewerProps } from "./type";

export const MarkdownViewer = async(props: MarkdownViewerProps) => {
  const { markdownFilePath } = props;
  const htmlContent = await getConvertedHtml(markdownFilePath);

  return (
    <div className="markdown-content">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}