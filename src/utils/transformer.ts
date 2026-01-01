export function transformer<T>(data: T) {
  return {
    message: 'success',
    data,
  };
}
