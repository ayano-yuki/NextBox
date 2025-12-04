# FeatureChecker コンポーネント

## 1. 目的

入力された文字列（識別子）が
**CSS プロパティ名**
**CSS 関数名**
**JavaScript グローバルオブジェクト**
として使用可能かどうかを判定するための UI コンポーネント。

ブラウザ環境での **フィーチャーディテクション（機能検出）** をシンプルに行える。

# 2. コンポーネントの使い方

### ■ 2.1 インポート

```tsx
import { FeatureChecker } from "@/components/FeatureChecker";
```

### ■ 2.2 JSX に配置

```tsx
export default function FeatureCheckerPage() {
  return (
    <div>
      <h1>Feature Checker</h1>
      <FeatureChecker />
    </div>
  );
}
```

### ■ 2.3 実行すると表示される UI

* 識別子入力用の `<input>`
* 判定テーブル（入力があると表示）

入力例として：

| 入力例          | 説明                    |
| ------------ | --------------------- |
| `color`      | CSS プロパティ             |
| `brightness` | CSS 関数 `brightness()` |
| `fetch`      | JS グローバル関数            |
| `hogeHoge`   | 存在しない識別子 → すべて ×      |

# 3. シナリオ（ユースケース）

## ▼ **1. CSS/JS を学習している人が実験したい**

「このプロパティ/関数ってブラウザ対応してるの？」
→ 入力するだけで判定できる。

例:
`backdrop-filter` → ○
`color-mix` → ○
`container` → Chrome では ○

## ▼ **2. ライブラリや polyfill を書くときの事前チェック**

例えば `"fetch"` を判定すれば
グローバル実装があるか一覧に出る。

## ▼ **3. UI モジュールとしてプロジェクトに組み込む**

Next.js・React の任意のページに貼れば
ブラウザ環境の機能検出ツールになる。

# 4. 判定ロジックまとめ

### ■ 4.1 CSS プロパティの判定

```ts
CSS.supports(name, "initial")
```

* CSS プロパティ名が有効なら `true`
* 無効な場合 `false`

例:
`color` → ○
`backdrop-filter` → ○
`unknown-prop` → ×

### ■ 4.2 CSS 関数の判定

```ts
CSS.supports(`color: ${name}(1 2 3)`)
```

値として与えた際にレンダリング可能かどうかで判定。

例:
`brightness` → ○（brightness(…)）
`hogeFunc` → ×

### ■ 4.3 JS / TS グローバルオブジェクトの存在判定

```ts
name in window
```

例:
`fetch` → ○
`requestAnimationFrame` → ○
`EyeDropper` → （ブラウザによる）
`somethingUnknown` → ×


例:
`Chrome / Firefox / Safari` → ○

# 5. 自動でテストしやすい入力例一覧

| テスト入力            | 想定結果               |
| ---------------- | ------------------ |
| `color`          | CSSプロパティ = ○       |
| `brightness`     | CSS関数 = ○          |
| `rotate`         | CSS関数 = ○          |
| `fetch`          | JSグローバル = ○        |
| `EyeDropper`     | JSグローバル（環境次第）      |
| `hogeHoge`       | 全部 ×               |
