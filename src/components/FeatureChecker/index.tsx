"use client";

import React, { useState, useMemo } from "react";
import "./style.scss";

// ---- 判定ロジック ----

// CSS: プロパティ名判定
function supportsCssProperty(name: string): boolean {
  try {
    return CSS.supports(name, "initial");
  } catch {
    return false;
  }
}

// CSS: 関数名判定 color: xxx(…) の形式でレンダリング可能か？
function supportsCssFunction(name: string): boolean {
  try {
    return CSS.supports(`color: ${name}(1 2 3)`);
  } catch {
    return false;
  }
}

// JS / TS: window に存在?
function supportsJsGlobal(name: string): boolean {
  return name in window;
}

// Web Animations: 3 つの基準のいずれか
function supportsWebAnimationsByName(name: string) {
  if (name === "animate") {
    return typeof Element.prototype.animate === "function";
  }
  if (name === "KeyframeEffect") {
    return "KeyframeEffect" in window;
  }
  if (name === "Animation") {
    return "Animation" in window;
  }
  return false;
}


// ---- Component ----
export const FeatureChecker: React.FC = () => {
  const [input, setInput] = useState("");

  const features = useMemo(() => {
    if (!input) return null;

    return {
      cssProperty: supportsCssProperty(input),
      cssFunction: supportsCssFunction(input),
      jsGlobal: supportsJsGlobal(input),
      webAnimations: supportsWebAnimationsByName(input),
    };
  }, [input]);

  return (
    <div className="feature-check">
      <input
        className="feature-input"
        type="text"
        value={input}
        placeholder="CSS/JS/Web Animations の識別子を入力"
        onChange={(e) => setInput(e.target.value)}
      />

      {features && (
        <table className="feature-table">
          <thead>
            <tr>
              <th>カテゴリ</th>
              <th>判定</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CSS プロパティ</td>
              <td>{features.cssProperty ? "○" : "×"}</td>
            </tr>
            <tr>
              <td>CSS 関数</td>
              <td>{features.cssFunction ? "○" : "×"}</td>
            </tr>
            <tr>
              <td>JS グローバル</td>
              <td>{features.jsGlobal ? "○" : "×"}</td>
            </tr>
            <tr>
              <td>Web Animations API</td>
              <td>{features.webAnimations ? "○" : "×"}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
