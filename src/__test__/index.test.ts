import * as hooks from '..';

describe('yanHooks', () => {
  test('export modules should be defined', () => {
    Object.keys(hooks).forEach((module) => {
      expect(hooks[module as keyof typeof hooks]).toBeDefined();
    });
  });
});
