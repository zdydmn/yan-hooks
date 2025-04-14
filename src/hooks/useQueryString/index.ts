import { getQueryStringObject } from './utils/getQueryStringObject';
import { enCodingOptions } from './utils/enCodingOptions';
import { useCallback, useMemo } from 'react';

function useQueryString() {
  const queryStringObj: Record<string, any> = getQueryStringObject();

  const navigate = useCallback((rawQueryString: string) => {
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}?${rawQueryString}`;
    try {
      if (typeof window.history.pushState === 'function') {
        window.history.pushState({ path: newUrl }, '', newUrl);
      } else {
        window.location.href = newUrl;
      }
    } catch (error) {
      console.error('Failed to update URL:', error);
    }
  }, []);

  const action = useMemo(() => {
    const setQueryString = (rawQueryString: string) => {
      const oldRawQueryString = window.location.href?.split('?')?.[1];
      if (oldRawQueryString !== rawQueryString) {
        navigate(rawQueryString);
      }
    };

    const setQueryStringByObject = (newObject: any) => {
      try {
        const rawQueryString = enCodingOptions(newObject);
        setQueryString(rawQueryString);
      } catch (error) {
        console.error('Failed to encode query string object:', error);
      }
    };

    const injectQueryString = (injectedObject: any) => {
      const _queryStringObj = getQueryStringObject();
      const newObject = {
        ..._queryStringObj,
        ...injectedObject,
      };
      setQueryStringByObject(newObject);
    };

    const injectQueryStringByProperty = (propName: string, propValue: any) => {
      injectQueryString({ [propName]: propValue });
    };

    return {
      setQueryStringByObject,
      injectQueryString,
      injectQueryStringByProperty,
    };
  }, []);

  return {
    queryStringObj,
    ...action,
  };
}

export default useQueryString;
