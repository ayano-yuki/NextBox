"use client";

import { VList } from "virtua";
import { useEffect, useRef, useState, useCallback } from "react";
import "./style.scss";

type Item = {
  id: number;
  text: string;
  height: number;
};

const SCROLL_KEY = "virtua-scroll-pos";
const PAGE_KEY = "virtua-page";

export const VirtuaVS = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const page = useRef<number>(0);

  // --------------------------------
  // アイテム生成
  // --------------------------------
  const generateItems = (page: number, size: number = 20): Item[] => {
    return Array.from({ length: size }).map((_, i) => {
      const id = page * size + i;
      return {
        id,
        text: `Item ${id}`,
        height: 60 + Math.round(Math.random() * 150),
      };
    });
  };

  // --------------------------------
  // 遅延ロード
  // --------------------------------
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      const newItems = generateItems(page.current, 20);

      page.current += 1;

      setItems((prev) => [...prev, ...newItems]);

      // 保存（復帰時のため）
      localStorage.setItem(PAGE_KEY, String(page.current));

      // 100 件以上なら終了
      if (page.current >= 5) {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 800);
  }, [isLoading, hasMore]);

  // --------------------------------
  // 初回ロード & 復元
  // --------------------------------
  useEffect(() => {
    // 前回のページを復元
    const savedPage = Number(localStorage.getItem(PAGE_KEY) ?? 0);

    page.current = savedPage;

    // 復元ページ分ロード
    let accumulated: Item[] = [];
    for (let p = 0; p < savedPage; p++) {
      accumulated = [...accumulated, ...generateItems(p)];
    }

    // 最後の1ページを生成
    accumulated = [...accumulated, ...generateItems(savedPage)];

    setItems(accumulated);

    // スクロール位置復元
    requestAnimationFrame(() => {
      const pos = Number(localStorage.getItem(SCROLL_KEY) ?? 0);
      window.scrollTo(0, pos);
    });
  }, []);

  // スクロール位置保存
  useEffect(() => {
    const handler = () => {
      localStorage.setItem(SCROLL_KEY, String(window.scrollY));
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="virtua-container">

      <VList<Item>
        data={items}
      >
        {(item: Item, index: number) => {
          // ★ 最後がレンダリングされたらロード
          if (index === items.length - 1) {
            loadMore();
          }

          return (
            <div className="list-item" style={{ height: item.height }}>
              {item.text}
            </div>
          );
        }}
      </VList>

      {isLoading && <div className="loading">Loading...</div>}
      {!hasMore && <div className="end">No more items</div>}
    </div>
  );
}
