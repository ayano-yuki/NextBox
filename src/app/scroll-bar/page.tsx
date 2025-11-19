"use client";

import { useRef } from 'react';
import { CustomScrollBar } from '@/components/customScrollBar';

export default function ScrollBar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <CustomScrollBar
      scrollRef={scrollRef}
      height={200}
      width={100}
    >
      <div
        style={{
          height: 'auto',
        }}
      >
        {/* スクロール対象のコンテンツ */}
        <p>テスト1</p>
        <p>テスト2</p>
        <p>テスト3</p>
        <p>テスト4</p>
        <p>テスト5</p>
        <p>テスト6</p>
        <p>テスト7</p>
        <p>テスト8</p>
        <p>テスト9</p>
        <p>テスト10</p>
      </div>
    </CustomScrollBar>
  );
}
