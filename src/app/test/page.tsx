"use client";

import "@/style/main.scss";

export default function Example() {
  return (
    // 親要素に .split-container を適用
    <div className="split-container">
      
      {/* 左側のパネル */}
      <div className="split-panel panel-left">
        <h2>左側のコンテンツ</h2>
        <p>SCSSの flex: 1; のおかげで均等な幅になっています。</p>
      </div>
      
      {/* 右側のパネル */}
      <div className="split-panel panel-right">
        <h2>右側のコンテンツ</h2>
        <p>左右のパネルは画面を50%ずつ占めます。</p>
      </div>
    </div>
  );
}