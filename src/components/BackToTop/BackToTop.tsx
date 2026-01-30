import { useState, useEffect } from 'react';
import styles from './BackToTop.module.css';

interface BackToTopProps {
  editorRef: React.RefObject<HTMLElement>;
  previewRef: React.RefObject<HTMLElement>;
}

export const BackToTop: React.FC<BackToTopProps> = ({ editorRef, previewRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const editor = editorRef.current;
    const preview = previewRef.current;
    if (!editor || !preview) return;

    const handleScroll = () => {
      const visible = editor.scrollTop > 300 || preview.scrollTop > 300;
      setIsVisible(visible);
    };

    editor.addEventListener('scroll', handleScroll);
    preview.addEventListener('scroll', handleScroll);

    return () => {
      editor.removeEventListener('scroll', handleScroll);
      preview.removeEventListener('scroll', handleScroll);
    };
  }, [editorRef, previewRef]);

  const scrollToTop = () => {
    if (editorRef.current) {
      editorRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (previewRef.current) {
      previewRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      className={styles.backToTop}
      onClick={scrollToTop}
      aria-label="回到顶部"
      title="回到顶部"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L4 12L5.41 13.41L11 7.83V20H13V7.83L18.59 13.41L20 12L12 4Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};
