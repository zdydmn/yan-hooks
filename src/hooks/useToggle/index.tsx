import { useMemo, useState } from 'react';

export interface Action<T> {
  set: (value: T) => void;
  toggle: () => void;
}

function useToggle<T = boolean>(): [boolean, Action<T>];
function useToggle<T>(defaultValue: T): [T, Action<T>];
function useToggle<T, U>(
  defaultValue: T,
  reverseValue?: U,
): [T | U, Action<T | U>];
function useToggle<D, R>(
  defaultValue: D = false as unknown as D,
  reverseValue?: R,
) {
  const [state, setState] = useState<D | R | boolean>(defaultValue);
  const action = useMemo(() => {
    const reverseValueOrigin =
      reverseValue === undefined ? !defaultValue : (reverseValue as D | R);
    const set = (value: D) => setState(value);
    const toggle = () =>
      setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    return {
      set,
      toggle,
    };
  }, [defaultValue, reverseValue]);

  return [state, action];
}
export default useToggle;
