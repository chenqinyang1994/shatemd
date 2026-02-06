import { useState, useCallback } from 'react';

/**
 * 同步滚动开关状态管理 Hook
 * @returns 开关状态和切换函数
 */
export const useSyncScrollToggle = () => {
  // 默认开启同步滚动
  const [isSyncScrollEnabled, setIsSyncScrollEnabled] = useState(true);

  const toggleSyncScroll = useCallback(() => {
    setIsSyncScrollEnabled((prev) => !prev);
  }, []);

  return {
    isSyncScrollEnabled,
    toggleSyncScroll,
  };
};
