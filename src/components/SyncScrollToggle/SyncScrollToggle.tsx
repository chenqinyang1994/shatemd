import { FC } from 'react';
import styles from './SyncScrollToggle.module.css';

interface SyncScrollToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const SyncScrollToggle: FC<SyncScrollToggleProps> = ({ enabled, onToggle }) => {
  return (
    <div className={styles.syncScrollToggle}>
      <div className={styles.buttonWrapper}>
        <button
          className={`${styles.toggleButton} ${enabled ? styles.active : ''}`}
          onClick={onToggle}
          data-tooltip={enabled ? "点击关闭同步滚动" : "点击开启同步滚动"}
          aria-label="同步滚动开关"
          aria-pressed={enabled}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5.5 8H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 11V11C2.89543 11 2 10.1046 2 9V7C2 5.89543 2.89543 5 4 5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 11V11C13.1046 11 14 10.1046 14 9V7C14 5.89543 13.1046 5 12 5V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className={styles.text}>同步滚动</span>
        </button>
      </div>
    </div>
  );
};
