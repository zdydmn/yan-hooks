import { renderHook } from '@testing-library/react';
import createModel from '..';

// 模拟一个简单的 useHooks 函数
const mockUseHooks = (initValue?: number) => {
  return initValue || 0;
};

describe('createModel', () => {
  it('should create a model with a provider and a useContext hook', () => {
    const model = createModel(mockUseHooks);
    expect(model.Provider).toBeInstanceOf(Function);
    expect(model.useContext).toBeInstanceOf(Function);
  });

  it('should provide the correct value through the context', () => {
    const model = createModel(mockUseHooks);
    const initValue = 42;
    const { result } = renderHook(() => model.useContext(), {
      wrapper: ({ children }) => (
        <model.Provider initParams={initValue}>{children}</model.Provider>
      ),
    });

    expect(result.current).toBe(initValue);
  });

  // it('should throw an error if not wrapped with the provider', () => {
  //   const model = createModel(mockUseHooks);
  //   const { result } = renderHook(() => model.useContext());

  //   expect(() => result.current).toThrow(
  //     'Component must be wrapped with <Model.Provider>',
  //   );
  // });
});
