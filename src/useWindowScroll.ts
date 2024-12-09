import { useEffect, useState } from 'react';
import { number } from 'yargs';

export default function useWindowScroll(): [number, number] {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [scrollPosition.x, scrollPosition.y];
}
