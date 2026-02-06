import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSyncScrollToggle } from './useSyncScrollToggle';

describe('useSyncScrollToggle', () => {
  it('should initialize with sync scroll enabled by default', () => {
    const { result } = renderHook(() => useSyncScrollToggle());

    expect(result.current.isSyncScrollEnabled).toBe(true);
  });

  it('should toggle sync scroll state', () => {
    const { result } = renderHook(() => useSyncScrollToggle());

    expect(result.current.isSyncScrollEnabled).toBe(true);

    act(() => {
      result.current.toggleSyncScroll();
    });

    expect(result.current.isSyncScrollEnabled).toBe(false);

    act(() => {
      result.current.toggleSyncScroll();
    });

    expect(result.current.isSyncScrollEnabled).toBe(true);
  });

  it('should toggle multiple times correctly', () => {
    const { result } = renderHook(() => useSyncScrollToggle());

    const toggleCount = 10;
    for (let i = 0; i < toggleCount; i++) {
      act(() => {
        result.current.toggleSyncScroll();
      });

      const expectedState = i % 2 === 0 ? false : true;
      expect(result.current.isSyncScrollEnabled).toBe(expectedState);
    }
  });

  it('should have stable toggle function reference', () => {
    const { result, rerender } = renderHook(() => useSyncScrollToggle());

    const firstToggleRef = result.current.toggleSyncScroll;

    act(() => {
      result.current.toggleSyncScroll();
    });

    rerender();

    const secondToggleRef = result.current.toggleSyncScroll;

    // useCallback 应该保持函数引用稳定
    expect(firstToggleRef).toBe(secondToggleRef);
  });
});
