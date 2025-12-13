# VirtuaVS コンポーネント

## 目的
- 大量のリストを **仮想スクロール** によって高速に描画する
- アイテムごとに高さが異なる場合も快適にスクロールできる
- ページ遷移後やスクロール位置の復元ができる
- データを **遅延ロード（Infinite Scroll）** する

## 使い方
### コンポーネントの import
```ts
import { VirtuaVS } from "@/components/VirtuaVS";
````

### JSX 内で使用

```tsx
<VirtuaVS />
```

* Virtua が自動でリストをレンダリング
* 最後の要素が描画されたタイミングで追加ロードが発生
* スクロール位置は自動保存・復元される

## ロジック

[virtua](https://github.com/inokawa/virtua)を使った

1. **アイテム生成**

   * ランダム高さのアイテムを `generateItems(page: number, size?: number)` で生成
   * `Item = { id: number, text: string, height: number }`

2. **遅延ロード**

   * リスト末尾の要素が描画されたら `loadMore()` を呼ぶ
   * 1ページ20件ずつ追加
   * 最大ページ数で `hasMore = false` に設定してロード停止

3. **スクロール位置保持**

   * `window.scrollY` を `localStorage` に保存
   * ページ復帰時に `window.scrollTo` で復元
   * `useEffect` 内でスクロールイベントを監視して更新

4. **Virtua による仮想スクロール**

   * `<VList data={items}>` 内で `children(item, index)` を描画
   * 実際に DOM に描画されるのは **表示領域内のみ**
   * 高さが異なるアイテムでもパフォーマンス良くスクロール

## シナリオ

1. ページ初回ロード

   * `VirtuaVS` が初期アイテム（1ページ目）を生成
   * 仮想スクロールで表示
   * スクロール位置は0に初期化

2. ユーザーがスクロール

   * 末尾までスクロールすると `loadMore()` が発火
   * 次ページのアイテムを追加
   * アイテム数は最大100件まで

3. ページ遷移・戻る

   * 前回のスクロール位置を `localStorage` から取得
   * `window.scrollTo` で位置復元
   * データも前回ロード分を復元して再描画

4. リスト末尾到達

   * `hasMore = false` で追加ロード停止
   * 「No more items」を表示

## ポイント

* 親コンテナに **高さと `overflow-y: auto`** を設定する必要あり
* `VList` は `data` と `children` のみ指定
* 遅延ロードは **children の index === items.length - 1** でトリガー
