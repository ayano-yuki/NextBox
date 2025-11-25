# 使い方
このページでは、アプリ内で使用するページの書き方を纏めます。
基本的には、左側でコンポーネント、右側はそのコンポーネントの仕組みや使い方を纏めます。

## ページの書き方

下記のプログラムでこのページを構築します。

Markdownは使用するコンポーネントフォルダ内に配置し、markdownPathに「`src/~`」の形式でファイル名を渡します。

コンポーネントは`<SplitLayout>`内に書くだけです。
上下左右の幅の自動調整はないので、良い感じの表示になるように工夫して下さい。

```react
import "@/style/main.scss";
import { SplitLayout } from "@/components/SplitLayout/index";

export const TestPage = () => {
  return (
    <SplitLayout markdownPath="src/components/MarkdownViewer/README.md">
      <p>これはテストページです。</p>
    </SplitLayout>
  );
}
```

## Markdownの記法

ZennのMarkdownパーサーを使用してコンパイルしているので、Zennの記法を使ってください。

```python
print("hello world!")
```

:::message
メッセージをここに
:::