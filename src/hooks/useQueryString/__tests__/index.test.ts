import { renderHook } from '@testing-library/react';
import useQueryString from '..';

describe('useQueryString', () => {
  const mockQuery = { key1: 'value1', key2: 'value2' };
  const encodedQuery = encodeURIComponent(JSON.stringify(mockQuery));
  const mockHref = `http://example.com?options=${encodedQuery}`;
  Object.defineProperty(window, 'location', {
    value: {
      href: mockHref,
    },
    writable: true,
  });

  // 测试是否正确获取查询字符串对象
  it('test on init', () => {
    const { result } = renderHook(() => useQueryString());
    expect(result.current.queryStringObj).toEqual(mockQuery);
  });
});
