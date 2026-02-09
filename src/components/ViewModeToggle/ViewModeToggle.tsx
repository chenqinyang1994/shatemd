import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ViewModeToggle.module.css';

export type ViewMode = 'both' | 'editor' | 'preview' | 'fullscreen';

interface ViewModeToggleProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export const ViewModeToggle: FC<ViewModeToggleProps> = ({ currentMode, onModeChange }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.viewModeToggle} role="group" aria-label={t('viewMode.dual')}>
      {/* Editor Only */}
      <button
        className={`${styles.modeButton} ${currentMode === 'editor' ? styles.active : ''}`}
        onClick={() => onModeChange('editor')}
        data-tooltip={t('viewMode.edit')}
        aria-label={t('viewMode.edit')}
        aria-pressed={currentMode === 'editor'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M2 3H14V13H2V3Z" fill="currentColor" fillOpacity="0.2" />
          <path d="M8 3V13" stroke="currentColor" strokeWidth="1.5" />
          <rect x="8" y="3" width="6" height="10" fill="currentColor" />
        </svg>
      </button>

      {/* Dual Pane Mode - Hidden on Mobile */}
      <button
        className={`${styles.modeButton} ${styles.dualModeButton} ${currentMode === 'both' ? styles.active : ''}`}
        onClick={() => onModeChange('both')}
        data-tooltip={t('viewMode.dual')}
        aria-label={t('viewMode.dual')}
        aria-pressed={currentMode === 'both'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M8 3V13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {/* Preview Only */}
      <button
        className={`${styles.modeButton} ${currentMode === 'preview' ? styles.active : ''}`}
        onClick={() => onModeChange('preview')}
        data-tooltip={t('viewMode.preview')}
        aria-label={t('viewMode.preview')}
        aria-pressed={currentMode === 'preview'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M2 3H14V13H2V3Z" fill="currentColor" fillOpacity="0.2" />
          <path d="M8 3V13" stroke="currentColor" strokeWidth="1.5" />
          <rect x="2" y="3" width="6" height="10" fill="currentColor" />
        </svg>
      </button>

      {/* Fullscreen (Toggle Logic managed by parent) */}
      <button
        className={`${styles.modeButton} ${currentMode === 'fullscreen' ? styles.active : ''}`}
        onClick={() => onModeChange('fullscreen')}
        data-tooltip={currentMode === 'fullscreen' ? t('fullscreen.exit') : t('viewMode.vertical')}
        aria-label={currentMode === 'fullscreen' ? t('fullscreen.exit') : t('viewMode.vertical')}
        aria-pressed={currentMode === 'fullscreen'}
      >
        {currentMode === 'fullscreen' ? (
           // Exit Fullscreen Icon
           <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
             <path d="M5.5 10.5v3h-1v-3h-3v-1h4zM10.5 5.5v-3h1v3h3v1h-4zM5.5 5.5h-3v-1h3v-3h1v4zM10.5 10.5h3v1h-3v3h-1v-4z" />
           </svg>
        ) : (
           // Enter Fullscreen Icon
           <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
             <path d="M2 5V2H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M14 5V2H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M14 11V14H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M2 11V14H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        )}
      </button>
    </div>
  );
};
