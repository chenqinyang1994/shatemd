import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SyncScrollToggle.module.css';

interface SyncScrollToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const SyncScrollToggle: FC<SyncScrollToggleProps> = ({ enabled, onToggle }) => {
  const { t } = useTranslation();

  return (
    <button
      className={`${styles.syncScrollToggle} ${enabled ? styles.enabled : ''}`}
      onClick={onToggle}
      aria-label={enabled ? t('syncScroll.enabled') : t('syncScroll.disabled')}
      data-tooltip={enabled ? t('syncScroll.enabled') : t('syncScroll.disabled')}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {enabled ? (
          <>
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            <line x1="9" y1="12" x2="15" y2="12" />
            <line x1="12" y1="9" x2="12" y2="15" />
          </>
        ) : (
          <>
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            <line x1="9" y1="12" x2="15" y2="12" strokeDasharray="2 2" />
          </>
        )}
      </svg>
      <span>{enabled ? t('syncScroll.enabled').split(':')[0] : t('syncScroll.disabled').split(':')[0]}</span>
    </button>
  );
};
