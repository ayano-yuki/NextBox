# Next Lab

# 使用技術
- nextra (nextra-theme-docs)

## コマンド
```bash
# プレビュー
pnpm dev

#　ビルド
pnpm build
```

## ドキュメントの追加方法
1. `content` 配下に追加したいカテゴリのフォルダを作る、または既存フォルダに `.mdx` ファイルを追加します。
   例: `content/components/new-widget.mdx`

2. 追加した `.mdx` に Front Matter を書きます。

```mdx
---
title: NewWidget
description: コンポーネントの概要
---

# NewWidget

ここにドキュメントを書きます。
```

3. 一覧ページとして使っている `index.mdx` にリンクを追加します。
   例: `content/components/index.mdx`

```mdx
- [NewWidget](/components/new-widget)
```

4. カテゴリ自体を新しく作る場合は、フォルダ内に `index.mdx` も作成します。

```mdx
---
title: New Category
description: このカテゴリの説明
asIndexPage: true
---

# New Category

- [NewWidget](/new-category/new-widget)
```

5. 追加後はプレビューで表示確認します。

```bash
pnpm dev
```
