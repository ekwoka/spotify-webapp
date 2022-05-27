export const hotkeys = (keyMap: KeyMap): (() => void) => {
  const keyActions = Object.entries(keyMap).map(([keys, action]) => {
    const KeyCombo = parseKey(keys);
    return registerHandler(KeyCombo, action);
  });
  return () => keyActions.forEach((fn) => fn());
};

export type KeyMap = {
  [key: KeyCombo]: () => void;
};

type KeyCombo = string;

const parseKey = (keys: KeyCombo): PropChecker => {
  const separateKeys = keys.split('+');
  const modifiers = separateKeys.map((key) => {
    if (key.toLocaleLowerCase() === 'cmd') key = 'meta';
    if (['ctrl', 'alt', 'shift', 'meta'].includes(key.toLocaleLowerCase()))
      return [`${key}Key`, true];
    return ['key', key];
  });
  return Object.fromEntries(modifiers);
};

const registerHandler = (
  keyCombo: PropChecker,
  action: () => void
): (() => void) => {
  const handler = (e: KeyboardEvent) => {
    if (checkProps(e, keyCombo)) {
      action();
    }
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
};

type PropChecker = {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  key: string;
};

const checkProps = (e: KeyboardEvent, keyCombo: PropChecker): boolean => {
  return Object.entries(keyCombo).every(([key, value]) => {
    return e[key as keyof KeyboardEvent] === value;
  });
};
