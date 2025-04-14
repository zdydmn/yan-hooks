import { useEffect, useRef } from 'react';

function useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList,
): void {
  const isMounted = useRef(true);
  useEffect(function () {
    if (isMounted.current) {
      //  首次渲染之后将mounted 设置为false
      isMounted.current = false;
    } else {
      return effect();
    }
  }, deps);
}

export default useUpdateEffect;
