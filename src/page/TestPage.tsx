import "@/style/main.scss";
import { SplitLayout } from "@/components/SplitLayout/index";

export const TestPage = () => {
  return (
    <SplitLayout markdownPath="src/components/MarkdownViewer/README.md">
      <p>これはテストページです。</p>
    </SplitLayout>
  );
}