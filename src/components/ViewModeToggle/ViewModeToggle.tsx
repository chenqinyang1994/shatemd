import { FC } from 'react';
import styles from './ViewModeToggle.module.css';

export type ViewMode = 'both' | 'editor' | 'preview' | 'fullscreen';

interface ViewModeToggleProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export const ViewModeToggle: FC<ViewModeToggleProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className={styles.viewModeToggle} role="group" aria-label="视图模式切换">
      {/* 仅编辑区 */}
      <button
        className={`${styles.modeButton} ${currentMode === 'editor' ? styles.active : ''}`}
        onClick={() => onModeChange('editor')}
        data-tooltip="仅编辑区"
        aria-label="仅编辑区"
        aria-pressed={currentMode === 'editor'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M2 3H14V13H2V3Z" fill="currentColor" fillOpacity="0.2" />
          <path d="M8 3V13" stroke="currentColor" strokeWidth="1.5" />
          <rect x="8" y="3" width="6" height="10" fill="currentColor" />
        </svg>
      </button>

      {/* 双栏模式 */}
      <button
        className={`${styles.modeButton} ${currentMode === 'both' ? styles.active : ''}`}
        onClick={() => onModeChange('both')}
        data-tooltip="双栏模式"
        aria-label="双栏模式"
        aria-pressed={currentMode === 'both'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M8 3V13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {/* 仅预览区 */}
      <button
        className={`${styles.modeButton} ${currentMode === 'preview' ? styles.active : ''}`}
        onClick={() => onModeChange('preview')}
        data-tooltip="仅预览区"
        aria-label="仅预览区"
        aria-pressed={currentMode === 'preview'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M2 3H14V13H2V3Z" fill="currentColor" fillOpacity="0.2" />
          <path d="M8 3V13" stroke="currentColor" strokeWidth="1.5" />
          <rect x="2" y="3" width="6" height="10" fill="currentColor" />
        </svg>
      </button>

      {/* 全屏 */}
      <button
        className={`${styles.modeButton} ${currentMode === 'fullscreen' ? styles.active : ''}`}
        onClick={() => onModeChange('fullscreen')}
        data-tooltip="全屏模式"
        aria-label="全屏模式"
        aria-pressed={currentMode === 'fullscreen'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 5V2H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 5V2H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 11V14H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 11V14H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};
