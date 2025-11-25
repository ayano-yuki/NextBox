import { MarkdownViewer } from "@/components/MarkdownViewer/index";

import type { SplitLayoutProps } from "./type";
import  './style.scss';

export const SplitLayout = (props: SplitLayoutProps) => {
  const { children, markdownPath } = props;

  return (
    <div className="split-container">
      <div className="split-panel panel-left">
        {children}
      </div>

      <div className="split-panel panel-right">
        <MarkdownViewer markdownFilePath={markdownPath} />
      </div>
    </div>
  );
};
