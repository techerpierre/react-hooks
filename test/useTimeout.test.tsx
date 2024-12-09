import React from 'react';
import { render, act } from '@testing-library/react';
import useTimeout from '../src/useTimeout';

function TestComponent({ callback }: { callback: () => void }) {
  useTimeout(callback, 1000); // Délai de 1000 ms
  return <div data-testid="test-component">Test</div>;
}

describe('useTimeout', () => {
  jest.useFakeTimers();

  it('should call the callback after the specified delay', () => {
    const callback = jest.fn();

    render(<TestComponent callback={callback} />);

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should clean up the timeout on unmount', () => {
    const callback = jest.fn();
    const { unmount } = render(<TestComponent callback={callback} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
