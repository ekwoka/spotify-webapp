export const classNames = (
  ...classes: (string | undefined | false)[]
): string => {
  return classes.filter(Boolean).join(' ');
};
