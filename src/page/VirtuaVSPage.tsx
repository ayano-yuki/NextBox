import "@/style/main.scss";
import { SplitLayout } from "@/components/SplitLayout/";
import { VirtuaVS } from "@/components/VirtuaVS";

export const VirtuaVSPage = () => {
  return (
    <SplitLayout markdownPath="src\components\VirtuaVS\README.md">
      <VirtuaVS />
    </SplitLayout>
  );
}