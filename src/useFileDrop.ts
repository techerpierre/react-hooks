import { useCallback, useState } from 'react';

interface UseFileDropReturn {
  dragging: boolean;
  eventHandlers: {
    onDragEnter: React.DragEventHandler<HTMLElement>;
    onDragLeave: React.DragEventHandler<HTMLElement>;
    onDragOver: React.DragEventHandler<HTMLElement>;
    onDrop: React.DragEventHandler<HTMLElement>;
  };
}

export default function useFileDrop(onDropCallback: (files: File[]) => void) {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = useCallback(() => {
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      setDragging(false);

      if (e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        onDropCallback(files);
      }
    },
    [onDropCallback]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  return {
    dragging,
    eventHandlers: {
      handleDragEnter,
      handleDragLeave,
      handleDrop,
      handleDragOver,
    },
  };
}
