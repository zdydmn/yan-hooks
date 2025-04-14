import React, { createContext } from 'react';

interface ModelProviderProps<InitParams = void> {
  initParams?: InitParams;
  children: React.ReactNode;
}

interface Model<Value, InitParams = void> {
  Provider: React.FC<ModelProviderProps<InitParams>>;
  useContext: () => Value;
}

const EMPTY = Symbol();

function createModel<Value, InitParams = void>(
  useHooks: (initValue?: InitParams) => Value,
): Model<Value, InitParams> {
  const HooksContext = createContext<Value | typeof EMPTY>(EMPTY);

  const Provider = (props: ModelProviderProps<InitParams>) => {
    const useHooksValue = useHooks(props.initParams);
    return (
      <HooksContext.Provider value={useHooksValue}>
        {props.children}
      </HooksContext.Provider>
    );
  };

  const useContext = () => {
    const value = React.useContext(HooksContext);
    if (value === EMPTY) {
      throw new Error('Component must be wrapped with <Model.Provider>');
    }
    return value;
  };
  return {
    Provider,
    useContext,
  };
}

export default createModel;
