import { getQueryStringObject } from '../utils/getQueryStringObject';

describe('getQueryStringObject', () => {
  it('should correctly parse query string', () => {
    const mockQuery = { key1: 'value1', key2: 'value2' };
    const encodedQuery = encodeURIComponent(JSON.stringify(mockQuery));
    const mockHref = `http://example.com?options=${encodedQuery}`;
    // 模拟 window.location.href
    Object.defineProperty(window, 'location', {
      value: {
        href: mockHref,
      },
      writable: true,
    });
    const result = getQueryStringObject();
    expect(result).toEqual(mockQuery);
  });

  // 测试查询字符串解析失败的情况
  it('should return an empty object when parsing fails', () => {
    const mockHref = 'http://example.com?options=invalidJSON';

    // 模拟 window.location.href
    Object.defineProperty(window, 'location', {
      value: {
        href: mockHref,
      },
      writable: true,
    });

    const consoleErrorSpy = jest.spyOn(console, 'error');
    const result = getQueryStringObject();
    expect(result).toEqual({});
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
