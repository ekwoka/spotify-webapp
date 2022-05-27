export const debounce = (
  func: (...args: any[]) => void,
  wait = 400
): ((...args: any[]) => void) => {
  let timeout: any;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
