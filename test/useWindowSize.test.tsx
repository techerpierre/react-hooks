import React from 'react';
import { render, screen, act } from '@testing-library/react';
import useWindowSize from '../src/useWindowSize';

function TestComponent() {
  const [width, height] = useWindowSize();
  return (
    <div>
      <span data-testid="width">{width}</span>
      <span data-testid="height">{height}</span>
    </div>
  );
}

function simulateResize(width: number, height: number) {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
}

describe('useWindowSize', () => {
  it('should initialize window size as (window.innerWidth, window.innerHeight)', () => {
    window.innerWidth = 800;
    window.innerHeight = 600;

    render(<TestComponent />);

    expect(screen.getByTestId('width').textContent).toBe('800');
    expect(screen.getByTestId('height').textContent).toBe('600');
  });

  it('should update window size when the window is resized', () => {
    render(<TestComponent />);

    act(() => {
      simulateResize(1024, 768);
    });

    expect(screen.getByTestId('width').textContent).toBe('1024');
    expect(screen.getByTestId('height').textContent).toBe('768');
  });

  it('should clean up the event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<TestComponent />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
  });
});
