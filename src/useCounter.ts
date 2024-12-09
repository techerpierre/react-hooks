import { useState } from 'react';

export default function useCounter(
  initial: number = 0,
  { min = Infinity, max = Infinity }: { min?: number; max?: number } = {
    min: Infinity,
    max: Infinity,
  }
) {
  const [value, setValue] = useState(initial);

  const increment = () =>
    setValue((prev) => (prev + 1 <= max ? prev + 1 : prev));
  const decrement = () =>
    setValue((prev) => (prev - 1 >= min ? prev - 1 : prev));

  const add = (value: number) =>
    setValue((prev) => (prev + value <= max ? prev + value : prev));
  const remove = (value: number) =>
    setValue((prev) => (prev - value >= min ? prev - value : prev));

  return { value, increment, decrement, add, remove };
}