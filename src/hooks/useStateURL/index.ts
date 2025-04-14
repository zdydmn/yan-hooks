import { useMemo, useState } from 'react';
import useQueryString from '../useQueryString';
import useUpdateEffect from '../useUpdateEffect';

function useStateURL<T>(
  field: string,
  formatInitValueCb: () => T,
): [T, (value: T) => void];
function useStateURL<T>(
  field: string,
  defaultValue: T,
): [T, (value: T) => void];
function useStateURL<T>(
  field: string,
  defaultValueOrCb: T | (() => T),
): [T, (value: T) => void] {
  const { queryStringObj, injectQueryStringByProperty } = useQueryString();

  // 确定初始值
  const getInitialValue = (): T => {
    const qsVal: T = queryStringObj[field];
    if (qsVal === null || qsVal === undefined) {
      if (typeof defaultValueOrCb === 'function') {
        return (defaultValueOrCb as () => T)();
      }
      return defaultValueOrCb;
    }
    if (typeof defaultValueOrCb === 'function') {
      return (defaultValueOrCb as () => T)();
    }
    return qsVal;
  };

  const _defaultValue = useMemo(() => getInitialValue(), []);
  const [state, setState] = useState<T>(_defaultValue);

  useUpdateEffect(() => {
    injectQueryStringByProperty(field, state);
  }, [state]);

  return [state, setState];
}

export default useStateURL;
