# FeatureChecker コンポーネント

## 1. 目的

入力された文字列（識別子）が
**CSS の機能（プロパティ または 関数として有効）**
**JavaScript のグローバル（window.xxx または window.xxx.yyy）**
として使用可能かどうかを判定する UI コンポーネント。

ブラウザ環境での **フィーチャーディテクション（機能検出）** を手軽に行える。

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

### ■ 2.3 表示される UI

* 識別子入力用の `<input>`
* 判定結果テーブル（入力時に表示）

入力例：

| 入力例           | 説明               |
| ------------- | ---------------- |
| `color`       | CSS プロパティ        |
| `rgb`         | CSS 関数 `rgb()`   |
| `console`     | JS グローバルオブジェクト   |
| `console.log` | JS のネストされたプロパティ  |
| `hogeHoge`    | 存在しない識別子 → すべて × |

# 3. シナリオ（ユースケース）

## ▼ 1. CSS / JS の対応状況を調べたいとき

例：

* `backdrop-filter` → CSS で ○
* `color-mix` → CSS で ○
* `container` → ブラウザによって ○ / ×

## ▼ 2. ライブラリ実装前の対応チェック

例えば `"fetch"` を入れると
グローバルに実装されているかどうか分かる。

## ▼ 3. プロジェクトの開発補助ツールとして利用

Next.js / React の任意のページに貼るだけで
ブラウザの CSS/JS 機能検出ツールになる。

# 4. 判定ロジックまとめ

## ■ 4.1 CSS の判定（プロパティ・関数まとめて判定）

### ▼ プロパティ判定

```ts
CSS.supports(`${identifier}: initial`)
```

### ▼ 関数判定（2パターン）

```ts
CSS.supports(`${identifier}(1)`)
CSS.supports(`color: ${identifier}(0 0 0)`)
CSS.supports(`filter: ${identifier}(1)`)
```

#### 例

| 入力            | CSS 判定 |
| ------------- | ------ |
| `color`       | ○      |
| `rgb`         | ○      |
| `brightness`  | ○      |
| `unknownProp` | ×      |
| `hogeFunc`    | ×      |

## ■ 4.2 JS の判定（`window.xxx` / `window.xxx.yyy` に対応）

ドット区切りを順番に辿って存在するか確認する。

```ts
const parts = identifier.split(".");
let obj = window;

for (const part of parts) {
  if (part in obj) obj = obj[part];
  else return false;
}
return true;
```

#### 例

| 入力              | JS 判定       |
| --------------- | ----------- |
| `fetch`         | ○           |
| `console`       | ○           |
| `console.log`   | ○           |
| `EyeDropper`    | ○/×（ブラウザ依存） |
| `unknownGlobal` | ×           |

# 5. 自動テストしやすい入力例一覧

| テスト入力         | 想定結果           |
| ------------- | -------------- |
| `color`       | CSS = ○        |
| `rgb`         | CSS = ○        |
| `brightness`  | CSS = ○        |
| `fetch`       | JS = ○         |
| `console.log` | JS = ○         |
| `EyeDropper`  | JS = ○/×（環境依存） |
| `hogeHoge`    | 両方 ×           |
