import { useState, useEffect, useRef } from 'react';

export type ViewMode = 'both' | 'editor' | 'preview' | 'fullscreen';

// 内容模式类型（排除 fullscreen）
export type ContentMode = 'both' | 'editor' | 'preview';

const getInitialMode = (): ViewMode => {
  // Mobile defaults to editor only
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return 'editor';
  }
  return 'both';
};

export const useViewMode = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(getInitialMode);
  const [showMessage, setShowMessage] = useState(false);

  // 记录进入全屏前的内容模式
  const previousModeRef = useRef<ContentMode>(
    (typeof window !== 'undefined' && window.innerWidth <= 768) ? 'editor' : 'both'
  );

  // ESC 键监听 - 退出全屏
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && viewMode === 'fullscreen') {
        // 恢复到进入全屏前的模式
        setViewMode(previousModeRef.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  // 切换到全屏时显示提示
  useEffect(() => {
    if (viewMode === 'fullscreen') {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [viewMode]);

  const handleModeChange = (mode: ViewMode) => {
    // 如果即将进入全屏，记录当前的内容模式
    if (mode === 'fullscreen' && viewMode !== 'fullscreen') {
      previousModeRef.current = viewMode as ContentMode;
    }

    // 如果从全屏切换到其他内容模式，更新 previousMode
    // 这样用户在全屏时切换编辑/预览/双栏，再次进入全屏时能记住
    if (mode !== 'fullscreen') {
      previousModeRef.current = mode as ContentMode;
    }

    setViewMode(mode);
  };

  // 新增：专门用于退出全屏并恢复之前模式的方法
  const exitFullscreen = () => {
    if (viewMode === 'fullscreen') {
      setViewMode(previousModeRef.current);
    }
  };

  const handleMessageClose = () => {
    setShowMessage(false);
  };

  // 获取实际的内容模式（全屏时返回进入前的模式）
  const getContentMode = (): ContentMode => {
    if (viewMode === 'fullscreen') {
      return previousModeRef.current;
    }
    return viewMode as ContentMode;
  };

  // 判断是否处于全屏状态
  const isFullscreen = viewMode === 'fullscreen';

  return {
    viewMode,
    contentMode: getContentMode(),
    isFullscreen,
    showMessage,
    handleModeChange,
    exitFullscreen, // Export this
    handleMessageClose,
  };
};
