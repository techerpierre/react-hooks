import { useState } from 'react';

type useControlledInputReturn = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void },
];

export default function useControlledInput(
  initial: string = ''
): useControlledInputReturn {
  const [value, setValue] = useState(initial);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, setValue, { value, onChange }];
}
