"use client";

import { useEffect } from "react";

export const HelloWasm = () => {
  useEffect(() => {
    (async () => {
      const wasm = await import(
        /* webpackIgnore: true */
        "/hello-wasm/ra_check.js"
      );

      await wasm.default();

      console.log(wasm.greet("Next"));
      console.log(wasm.greet("Rust WASM"));
    })();
  }, []);

  return <div>Hello WASM</div>;
}