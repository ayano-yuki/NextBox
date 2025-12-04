import "@/style/main.scss";
import { SplitLayout } from "@/components/SplitLayout";
import { BrowserBack } from "@/components/BrowserBack";

export const BrowserBackPage = () => {
  return (
    <SplitLayout markdownPath="src\components\BrowserBack\README.md">
      <BrowserBack />
    </SplitLayout>
  );
}