import { useState, useEffect } from 'react';

export type ViewMode = 'both' | 'editor' | 'preview' | 'fullscreen';

export const useViewMode = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [showMessage, setShowMessage] = useState(false);

  // ESC 键监听 - 退出全屏
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && viewMode === 'fullscreen') {
        setViewMode('both');
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
    setViewMode(mode);
  };

  const handleMessageClose = () => {
    setShowMessage(false);
  };

  return {
    viewMode,
    showMessage,
    handleModeChange,
    handleMessageClose,
  };
};
