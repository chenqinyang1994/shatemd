import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import styles from './Preview.module.css';
import 'highlight.js/styles/github-dark.css';

interface PreviewProps {
  content: string;
  previewRef: React.RefObject<HTMLDivElement>;
  previewContentRef: React.RefObject<HTMLDivElement>;
}

export const Preview: React.FC<PreviewProps> = ({ content, previewRef, previewContentRef }) => {
  return (
    <div className={styles.preview} ref={previewRef}>
      <div className={styles.previewContent} ref={previewContentRef}>
        {content.trim() === '' ? (
          <div className={styles.emptyState}>
            <p>开始在左侧编辑器输入 Markdown 内容...</p>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};
