import React from 'react';
import { render, screen } from '@testing-library/react';

import WalkAnimation from '@/components/common/WalkAnimation';

jest.useFakeTimers();

describe('LooserAnimation', () => {
  it('should render the component', () => {
    render(<WalkAnimation />);
    const animationElement = screen.getByTestId('walk-animation');
    expect(animationElement).toBeInTheDocument();
  });

  it('should animate the frame', () => {
    render(<WalkAnimation />);
    const frameElement = screen.getByTestId('walk-animation');

    jest.advanceTimersByTime(140);
    expect(frameElement.querySelector('.frame_1')).toBeInTheDocument();

  });

  it('should clear the interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    const { unmount } = render(<WalkAnimation />);
    unmount();

    // Verifica que el intervalo se haya limpiado
    expect(clearInterval).toHaveBeenCalledTimes(1);
    clearIntervalSpy.mockRestore();
  });
});