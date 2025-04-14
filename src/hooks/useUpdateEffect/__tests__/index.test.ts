import { renderHook, act } from '@testing-library/react';
import useUpdateEffect from '..';

describe('useUpdateEffect', () => {
  it('should not run the effect on initial render', () => {
    const mockEffect = jest.fn();
    const mockDeps: React.DependencyList = [];
    renderHook(() => useUpdateEffect(mockEffect, mockDeps));
    expect(mockEffect).not.toHaveBeenCalled();
  });

  it('should run the effect on subsequent renders when dependencies change', () => {
    const mockEffect = jest.fn();
    let mockDeps: React.DependencyList = [1];
    const { rerender } = renderHook(() =>
      useUpdateEffect(mockEffect, mockDeps),
    );
    expect(mockEffect).not.toHaveBeenCalled();
    act(() => {
      mockDeps = [2];
    });
    rerender();
    expect(mockEffect).toHaveBeenCalledTimes(1);
  });

  it('should call the cleanup function on subsequent renders', () => {
    const mockCleanup = jest.fn();
    const mockEffect = jest.fn(() => mockCleanup);
    let mockDeps: React.DependencyList = [1];
    const { rerender } = renderHook(() =>
      useUpdateEffect(mockEffect, mockDeps),
    );
    expect(mockEffect).not.toHaveBeenCalled();
    act(() => {
      mockDeps = [2];
    });

    rerender();
    expect(mockEffect).toHaveBeenCalledTimes(1);
    expect(mockCleanup).toHaveBeenCalledTimes(0);
  });
});
