import { FC, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ExportToolbar.module.css';

export type ExportingType = 'download' | 'copy' | null;

interface ExportToolbarProps {
  onDownload: () => void;
  onCopy: () => void;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  exportingType: ExportingType;
}

export const ExportToolbar: FC<ExportToolbarProps> = ({
  onDownload,
  onCopy,
  onMouseEnter,
  exportingType,
}) => {
  const { t } = useTranslation();
  const isExporting = exportingType !== null;

  return (
    <div
      className={styles.exportToolbar}
      role="toolbar"
      aria-label="Export options"
      onMouseEnter={onMouseEnter}
    >
      {/* Download Button */}
      <button
        className={styles.exportButton}
        onClick={onDownload}
        disabled={isExporting}
        aria-label={t('export.download')}
        title={t('export.download')}
      >
        {exportingType === 'download' ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        )}
      </button>

      {/* Copy Button */}
      <button
        className={styles.exportButton}
        onClick={onCopy}
        disabled={isExporting}
        aria-label={t('export.copy')}
        title={t('export.copy')}
      >
        {exportingType === 'copy' ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
};
