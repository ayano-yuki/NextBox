import "@/style/main.scss";
import { SplitLayout } from "@/components/SplitLayout";
import { HelloWasm } from "@/components/HelloWASM";

export const HelloWasmPage = () => {
  return (
    <SplitLayout markdownPath="src/components/HelloWASM/README.md">
      <HelloWasm />
    </SplitLayout>
  );
}