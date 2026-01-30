import { FC, useEffect, useState } from 'react';
import styles from './Message.module.css';

interface MessageProps {
  content: string;
  duration?: number; // 显示时长（毫秒），默认 3000
  onClose?: () => void;
}

export const Message: FC<MessageProps> = ({ content, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // 等待动画结束
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`${styles.messageWrapper} ${!visible ? styles.fadeOut : ''}`}>
      <div className={styles.message}>
        <span className={styles.icon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="8" r="1" fill="currentColor" />
          </svg>
        </span>
        <span className={styles.content}>{content}</span>
      </div>
    </div>
  );
};
