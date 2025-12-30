export function transformer<T>(data: T) {
  return new Promise<{ message: string; data: T }>((res) =>
    setTimeout(
      () =>
        res({
          message: 'success',
          data,
        }),
      500,
    ),
  );
}
