import { useState, useEffect, useRef } from 'react';
import styles from './BackToTop.module.css';

// JS 手动实现平滑滚动，绕过浏览器原生 smooth scroll 与 CodeMirror 虚拟化渲染的不兼容问题。
//
// 核心问题：CodeMirror 使用虚拟化渲染，滚动时会动态增减 DOM 节点导致 scrollHeight 不断变化。
// 如果在动画开始时记录 scrollTop 并做固定插值，中途 scrollHeight 变化会导致计算出的
// scrollTop 被浏览器 clamp，动画提前"卡住"。
//
// 解决方案：每帧都基于当前实际 scrollTop 按固定比例递减（指数衰减）。
// 这样无论 CodeMirror 如何改变 scrollHeight，动画都能持续收敛到顶部。
// 为避免 Zeno 悖论（接近 0 时无限减速），设置最小步长保证有限时间内到达顶部。

function animateScrollToTop(
  element: HTMLElement,
  onDone: () => void
): () => void {
  if (element.scrollTop <= 0) {
    onDone();
    return () => {};
  }

  let cancelled = false;
  // 每帧减少当前 scrollTop 的 15%
  const REDUCTION_RATIO = 0.15;
  // 最小步长（像素），防止接近顶部时因指数衰减而无限减速
  const MIN_STEP = 30;

  function step() {
    if (cancelled) return;

    const current = element.scrollTop;

    if (current <= 0) {
      element.scrollTop = 0;
      onDone();
      return;
    }

    // 每帧减少量 = max(当前值的15%, MIN_STEP)，确保快速且不拖尾
    const reduction = Math.max(current * REDUCTION_RATIO, MIN_STEP);
    const newScrollTop = Math.max(0, Math.floor(current - reduction));

    element.scrollTop = newScrollTop;

    // 已到达顶部
    if (element.scrollTop <= 0) {
      onDone();
      return;
    }

    // 安全检查：如果 scrollTop 没减小（例如被 clamp），直接强制归零
    if (element.scrollTop >= current) {
      element.scrollTop = 0;
      onDone();
      return;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
  return () => { cancelled = true; };
}

interface BackToTopProps {
  editorRef: React.RefObject<HTMLElement>;
  previewRef: React.RefObject<HTMLElement>;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  editorRef,
  previewRef,
  onScrollStart,
  onScrollEnd
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cancelAnimRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    const editor = editorRef.current;
    const preview = previewRef.current;
    if (!editor || !preview) return;

    const handleScroll = () => {
      const visible = editor.scrollTop > 300 || preview.scrollTop > 300;
      setIsVisible(visible);
    };

    editor.addEventListener('scroll', handleScroll);
    preview.addEventListener('scroll', handleScroll);

    return () => {
      editor.removeEventListener('scroll', handleScroll);
      preview.removeEventListener('scroll', handleScroll);
    };
  }, [editorRef, previewRef]);

  const scrollToTop = () => {
    const editor = editorRef.current;
    const preview = previewRef.current;

    if (!editor || !preview) return;

    // 取消上一次未完成的动画
    cancelAnimRef.current.forEach(cancel => cancel());
    cancelAnimRef.current = [];

    onScrollStart?.();

    let editorDone = false;
    let previewDone = false;

    const checkAllDone = () => {
      if (editorDone && previewDone) {
        onScrollEnd?.();
      }
    };

    const cancelEditor = animateScrollToTop(editor, () => {
      editorDone = true;
      checkAllDone();
    });

    const cancelPreview = animateScrollToTop(preview, () => {
      previewDone = true;
      checkAllDone();
    });

    cancelAnimRef.current = [cancelEditor, cancelPreview];
  };

  // 组件卸载时取消动画
  useEffect(() => {
    return () => {
      cancelAnimRef.current.forEach(cancel => cancel());
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      className={styles.backToTop}
      onClick={scrollToTop}
      aria-label="回到顶部"
      title="回到顶部"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L4 12L5.41 13.41L11 7.83V20H13V7.83L18.59 13.41L20 12L12 4Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};
