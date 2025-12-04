import "@/style/main.scss";
import { SplitLayout } from "@/components/SplitLayout";
import { FeatureChecker } from "@/components/FeatureChecker";

export const FeatureCheckerPage = () => {
  return (
    <SplitLayout markdownPath="src/components/FeatureChecker/README.md">
      <FeatureChecker />
    </SplitLayout>
  );
}