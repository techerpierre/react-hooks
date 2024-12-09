import { useState } from 'react';

export default function useToogle(initial: boolean = false) {
  const [value, setValue] = useState(initial);

  const toogle = () => setValue((prev) => !prev);

  return [value, toogle];
}
