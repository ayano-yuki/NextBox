"use client";

import type { CustomScrollBarProps } from './type';
import { useState, useEffect, type ReactNode } from 'react';
import  './style.scss';

type Props = CustomScrollBarProps & {
    children: ReactNode;
};

export const CustomScrollBar = (scrollprops: Props) => {
    const { scrollRef, height, width, children } = scrollprops;
    const [thumbHeight, setThumbHeight] = useState(0);
    const [thumbTop, setThumbTop] = useState(0);

    const handleScroll = () => {
  const el = scrollRef.current;
  if (!el) return;

  const visible = el.clientHeight;
  const total = el.scrollHeight;
  const scrollTop = el.scrollTop;

  // Thumb の高さ
  const thumbH = total > visible ? (visible / total) * visible : visible;
  setThumbHeight(thumbH);

  // Thumb の位置
  const maxThumbTop = visible - thumbH;
  const thumbTop = total > visible 
    ? (scrollTop / (total - visible)) * maxThumbTop
    : 0;

  setThumbTop(thumbTop);
};

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            el.removeEventListener('scroll', handleScroll);
        };
    }, [scrollRef, height]);

    return (
        <div className="CustomScrollWrapper" style={{ position: 'relative' }}>
          
          {/* スクロールするコンテンツ */}
          <div
            ref={scrollRef}
            className="ScrollableContent"
            style={{
              height: `${height}px`,
              overflowY: 'scroll',
              paddingRight: `${width}px`, // スクロールバー分余白
            }}
          >
            {children}
          </div>
      
          {/* カスタムスクロールバー */}
          <div
            className="ScrollbarTrack"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: `${width}px`,
              height: `${height}px`,
            }}
          >
            <div
              className="ScrollbarThumb"
              style={{
                position: 'absolute',
                width: '100%',
                height: `${thumbHeight}px`,
                top: `${thumbTop}px`,
              }}
            />
          </div>
        </div>
      );      
};