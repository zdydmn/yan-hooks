import { renderHook, act } from '@testing-library/react';
import useToggle from '..';
const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};

describe('useToggle', () => {
  it('test on init', async () => {
    const hook = renderHook(() => useToggle());
    expect(hook.result.current[0]).toBeFalsy();
  });

  it('test on methods', async () => {
    const hook = renderHook(() => useToggle('Hello'));
    expect(hook.result.current[0]).toBe('Hello');
    callToggle(hook);
    expect(hook.result.current[0]).toBeFalsy();
    act(() => {
      hook.result.current[1].set('Bye');
    });
    expect(hook.result.current[0]).toBe('Bye');
  });

  it('test on optional', async () => {
    const hook = renderHook(() => useToggle('Hello', 'Bye'));
    callToggle(hook);
    expect(hook.result.current[0]).toBe('Bye');
    act(() => {
      hook.result.current[1].set('Bye');
    });
    expect(hook.result.current[0]).toBe('Bye');
    callToggle(hook);
    expect(hook.result.current[0]).toBe('Hello');
  });
});
