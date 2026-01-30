import { useRef, useEffect } from 'react';

export const useSyncScroll = (
  editorRef: React.RefObject<HTMLElement>,
  previewRef: React.RefObject<HTMLElement>
) => {
  const isSyncingRef = useRef(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const editor = editorRef.current;
    const preview = previewRef.current;

    if (!editor || !preview) {
      console.log('同步滚动: 等待元素准备...', { editor: !!editor, preview: !!preview });
      return;
    }

    console.log('同步滚动: 已启用', {
      editorScrollHeight: editor.scrollHeight,
      previewScrollHeight: preview.scrollHeight
    });

    const syncScroll = (source: HTMLElement, target: HTMLElement) => {
      // 如果正在同步中，取消之前的动画帧
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // 使用 requestAnimationFrame 确保在浏览器下一次重绘前执行
      animationFrameRef.current = requestAnimationFrame(() => {
        if (isSyncingRef.current) return;

        isSyncingRef.current = true;

        const percentage =
          source.scrollTop /
          (source.scrollHeight - source.clientHeight);

        // 处理 NaN 的情况（当内容高度不足以滚动时）
        if (!isNaN(percentage) && isFinite(percentage)) {
          const newScrollTop = percentage * (target.scrollHeight - target.clientHeight);
          target.scrollTop = newScrollTop;
        }

        // 使用 requestAnimationFrame 延迟解锁，确保同步完成
        requestAnimationFrame(() => {
          isSyncingRef.current = false;
        });
      });
    };

    const handleEditorScroll = () => syncScroll(editor, preview);
    const handlePreviewScroll = () => syncScroll(preview, editor);

    // 使用 passive: true 提高滚动性能
    editor.addEventListener('scroll', handleEditorScroll, { passive: true });
    preview.addEventListener('scroll', handlePreviewScroll, { passive: true });

    return () => {
      console.log('同步滚动: 已清理');
      editor.removeEventListener('scroll', handleEditorScroll);
      preview.removeEventListener('scroll', handlePreviewScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [editorRef, previewRef]);
};
