"use client";
import { useDisabledBrowserBack } from "@/lib/disabledBrowserBack";
import { useRouter } from "next/navigation";

export const BrowserBack = () => {
  useDisabledBrowserBack();
  const router = useRouter();

  return (
    <>
      <div>ブラウザバックの禁止</div>
      <button onClick={() => window.history.back()}>戻る</button>
      <button onClick={() => router.push("/")} >ホーム</button>
    </>
  );
};