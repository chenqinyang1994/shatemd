import { useState } from 'react';
import html2canvas from 'html2canvas';

export type ExportType = 'download' | 'copy' | null;

interface ExportState {
  isExporting: boolean;
  type: ExportType;
}

interface ExportResult {
  success: boolean;
  message: string;
}

export const useImageExport = (previewRef: React.RefObject<HTMLElement>) => {
  const [exportingType, setExportingType] = useState<ExportType>(null);

  // 用于向外传递操作结果提示
  const [exportResult, setExportResult] = useState<ExportResult | null>(null);

  const clearResult = () => setExportResult(null);

  const exportAsImage = async (action: 'download' | 'copy') => {
    if (!previewRef.current) {
      console.error('预览区引用不存在');
      return;
    }

    setExportingType(action);
    setExportResult(null);

    try {
      // 等待字体和图片加载
      await document.fonts.ready;

      const element = previewRef.current;

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      // 使用 Promise 包装 toBlob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png');
      });

      if (!blob) {
        throw new Error('生成图片失败：无法创建 Blob');
      }

      if (action === 'download') {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sharemd-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setExportResult({ success: true, message: '图片已开始下载' });
      } else {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setExportResult({ success: true, message: '已复制图片到剪贴板' });
        } catch (err) {
          console.error('复制到剪贴板失败:', err);
          setExportResult({ success: false, message: '复制失败，请尝试使用下载功能' });
        }
      }
    } catch (error) {
      console.error('导出失败:', error);
      setExportResult({
        success: false,
        message: `导出失败：${error instanceof Error ? error.message : '未知错误'}`
      });
    } finally {
      setExportingType(null);
    }
  };

  return {
    exportAsImage,
    exportingType,
    exportResult,
    clearResult
  };
};
