export function getQueryStringObject(): Record<string, unknown> {
  const rawQueryString = window.location.href?.split('?')?.[1];
  try {
    const query = JSON.parse(
      decodeURIComponent(rawQueryString?.split('=')?.[1]),
    );
    return query;
  } catch (e) {
    console.error(e);
    return {};
  }
}
