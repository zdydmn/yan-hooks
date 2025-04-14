import { renderHook } from '@testing-library/react';
import useStateURL from '..';

describe('useStateURL', () => {
  it('should initialize with default value', () => {
    const defaultValue = 'testValue';
    const { result } = renderHook(() => useStateURL('testField', defaultValue));
    const [state] = result.current;
    expect(state).toBe(defaultValue);
  });

  it('should initialize with formatted value from query string', () => {
    const queryValue = '123';
    const formatCb = () => queryValue + 10;
    const { result } = renderHook(() => useStateURL('testField', formatCb));
    const [state] = result.current;
    expect(state).toBe(queryValue + 10);
  });
});
