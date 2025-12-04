"use client";
import { useEffect } from "react";

export const useDisabledBrowserBack = () => {
  useEffect(() => {
    history.pushState(null, "", window.location.href);

    const preventBack = () => {
      alert("ブラウザバックは禁止されています。");
      history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", preventBack);
    return () => window.removeEventListener("popstate", preventBack);
  }, []);
};