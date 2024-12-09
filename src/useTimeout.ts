import { useEffect } from 'react';

export default function useTimeout(callback: Function, delay: number) {
  useEffect(() => {
    if (delay !== null) {
      const timer = setTimeout(callback, delay);
      return () => clearTimeout(timer);
    }
  }, [callback, delay]);
}
