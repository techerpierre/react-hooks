import { useEffect } from 'react';

export default function useEventListener<T = any>(
  event: keyof DocumentEventMap,
  handler: (event: T) => void,
  element: any = window
) {
  useEffect(() => {
    if (element && element.addEventListener) {
      element.addEventListener(event, handler);
    }

    return () => {
      element.removeEventListener(event, handler);
    };
  }, [event, handler, element]);
}
