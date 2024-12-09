import { renderHook, act } from '@testing-library/react';
import useToggle from '../src/useToggle';

describe('useToggle', () => {
  it('should initialize with the given value', () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
  });

  it('should toggle the value when called', () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
    act(() => {
      (result.current[1] as Function)();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      (result.current[1] as Function)();
    });
    expect(result.current[0]).toBe(false);
  });
});
