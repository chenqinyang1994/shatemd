import { useRef, useEffect } from 'react';

export const useSyncScroll = (
  editorRef: React.RefObject<HTMLElement>,
  previewRef: React.RefObject<HTMLElement>,
  enabled: boolean = true,
  contentMode?: 'both' | 'editor' | 'preview',
  refVersion?: number,
  pauseRef?: React.RefObject<boolean> // 外部可通过 ref 立即暂停同步（无需等待 React 渲染）
) => {
  const isSyncingRef = useRef(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const editor = editorRef.current;
    const preview = previewRef.current;

    if (!editor || !preview) return;
    if (!enabled) return;

    const syncScroll = (source: HTMLElement, target: HTMLElement) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        // 如果外部暂停或正在同步中，跳过
        if (pauseRef?.current || isSyncingRef.current) return;

        isSyncingRef.current = true;

        const percentage =
          source.scrollTop /
          (source.scrollHeight - source.clientHeight);

        if (!isNaN(percentage) && isFinite(percentage)) {
          const newScrollTop = percentage * (target.scrollHeight - target.clientHeight);
          target.scrollTop = newScrollTop;
        }

        requestAnimationFrame(() => {
          isSyncingRef.current = false;
        });
      });
    };

    const handleEditorScroll = () => syncScroll(editor, preview);
    const handlePreviewScroll = () => syncScroll(preview, editor);

    editor.addEventListener('scroll', handleEditorScroll, { passive: true });
    preview.addEventListener('scroll', handlePreviewScroll, { passive: true });

    return () => {
      editor.removeEventListener('scroll', handleEditorScroll);
      preview.removeEventListener('scroll', handlePreviewScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, contentMode, refVersion]);
};
