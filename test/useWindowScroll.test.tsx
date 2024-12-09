import React from 'react';
import { render, screen, act } from '@testing-library/react';
import useWindowScroll from '../src/useWindowScroll';

function TestComponent() {
  const [x, y] = useWindowScroll();
  return (
    <div>
      <span data-testid="scroll-x">{x}</span>
      <span data-testid="scroll-y">{y}</span>
    </div>
  );
}

function simulateScroll(x: number, y: number) {
  window.scrollX = x;
  window.scrollY = y;
  window.dispatchEvent(new Event('scroll'));
}

describe('useWindowScroll', () => {
  it('should initialize scroll position as (0, 0)', () => {
    render(<TestComponent />);

    expect(screen.getByTestId('scroll-x').textContent).toBe('0');
    expect(screen.getByTestId('scroll-y').textContent).toBe('0');
  });

  it('should update scroll position when window is scrolled', () => {
    render(<TestComponent />);

    act(() => {
      simulateScroll(100, 200);
    });

    expect(screen.getByTestId('scroll-x').textContent).toBe('100');
    expect(screen.getByTestId('scroll-y').textContent).toBe('200');
  });

  it('should clean up the event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<TestComponent />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});
