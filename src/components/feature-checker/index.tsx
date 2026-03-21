"use client";

import React, { useState, useEffect, useMemo } from "react";
import "./style.scss";

// ---- JS 判定 ----
// window.foo または window.foo.bar まで判定
function supportsJs(identifier: string): boolean {
  if (typeof window === "undefined") return false;

  const parts = identifier.split(".");
  let obj: any = window;

  for (const part of parts) {
    if (obj && part in obj) {
      obj = obj[part];
    } else {
      return false;
    }
  }
  return true;
}

// ---- CSS 判定（プロパティ・関数まとめて判定） ----
function supportsCss(identifier: string): boolean {
  try {
    // プロパティの可能性
    if (CSS.supports(`${identifier}: initial`)) return true;

    // 関数の可能性
    if (CSS.supports(`${identifier}(1)`)) return true;

    // 色関数
    if (CSS.supports(`color: ${identifier}(0 0 0)`)) return true;

    // filter 系の関数
    if (CSS.supports(`filter: ${identifier}(1)`)) return true;

    return false;
  } catch {
    return false;
  }
}

export const FeatureChecker: React.FC = () => {
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);

  // DOM が完全に使えるようになってから判定
  useEffect(() => setMounted(true), []);

  const result = useMemo(() => {
    if (!input || !mounted) return null;

    return {
      css: supportsCss(input),
      js: supportsJs(input),
    };
  }, [input, mounted]);

  return (
    <div className="feature-check">
      <input
        className="feature-input"
        type="text"
        value={input}
        placeholder="CSS or JS を入力 (例: color, rgb, console.log)"
        onChange={(e) => setInput(e.target.value)}
      />

      {result && (
        <table className="feature-table">
          <thead>
            <tr>
              <th>カテゴリ</th>
              <th>判定</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CSS</td>
              <td>{result.css ? "○" : "×"}</td>
            </tr>
            <tr>
              <td>JS</td>
              <td>{result.js ? "○" : "×"}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
