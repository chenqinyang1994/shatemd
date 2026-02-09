import { useState, useEffect, useCallback, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './BackToTop.module.css';

interface BackToTopProps {
  editorRef: RefObject<HTMLElement | null>;
  previewRef: RefObject<HTMLDivElement | null>;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
}

export function BackToTop({ editorRef, previewRef, onScrollStart, onScrollEnd }: BackToTopProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position
  useEffect(() => {
    const checkScroll = () => {
      const editorScroller = editorRef.current;
      const previewScroller = previewRef.current;

      const editorScrollTop = editorScroller?.scrollTop || 0;
      const previewScrollTop = previewScroller?.scrollTop || 0;

      setIsVisible(editorScrollTop > 300 || previewScrollTop > 300);
    };

    const editorScroller = editorRef.current;
    const previewScroller = previewRef.current;

    editorScroller?.addEventListener('scroll', checkScroll);
    previewScroller?.addEventListener('scroll', checkScroll);

    checkScroll();

    return () => {
      editorScroller?.removeEventListener('scroll', checkScroll);
      previewScroller?.removeEventListener('scroll', checkScroll);
    };
  }, [editorRef, previewRef]);

  const scrollToTop = useCallback(() => {
    onScrollStart?.();

    const editorScroller = editorRef.current;
    const previewScroller = previewRef.current;

    const scrollElement = (element: HTMLElement | null) => {
      if (!element) return;

      const start = element.scrollTop;
      const startTime = performance.now();
      const duration = 600;

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);

        element.scrollTop = start * (1 - eased);

        if (progress < 1) {
          requestAnimationFrame(scroll);
        } else {
          onScrollEnd?.();
        }
      };

      requestAnimationFrame(scroll);
    };

    scrollElement(editorScroller);
    scrollElement(previewScroller);
  }, [editorRef, previewRef, onScrollStart, onScrollEnd]);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={styles.backToTop}
      onClick={scrollToTop}
      aria-label={t('backToTop.title')}
      title={t('backToTop.title')}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
