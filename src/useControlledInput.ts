import { useState } from 'react';

export default function useControlledInput(initial: string = '') {
  const [value, setValue] = useState(initial);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, setValue, { value, onChange }];
}
