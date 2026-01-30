import { useState, useEffect } from 'react';
import styles from './ResizableDivider.module.css';

interface ResizableDividerProps {
  onResize: (leftWidth: number) => void;
  minWidth?: number;
}

export const ResizableDivider: React.FC<ResizableDividerProps> = ({
  onResize,
  minWidth = 300,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const containerWidth = window.innerWidth;
      const newLeftWidth = e.clientX;

      // 限制最小宽度
      if (
        newLeftWidth >= minWidth &&
        containerWidth - newLeftWidth >= minWidth + 4 // +4 是分隔条宽度
      ) {
        onResize(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minWidth, onResize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      className={`${styles.divider} ${isDragging ? styles.dragging : ''}`}
      onMouseDown={handleMouseDown}
    />
  );
};
