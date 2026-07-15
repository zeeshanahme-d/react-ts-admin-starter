export const debounce = <T extends (...args: never[]) => void>(callback: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const formatAmount = (value: string | number = 0): string => {
  if (value === undefined || value === null || value === '') return '';
  const numeric = String(value).replace(/[^0-9]/g, '');
  if (!numeric) return '';
  return new Intl.NumberFormat('en-US').format(Number(numeric));
};
