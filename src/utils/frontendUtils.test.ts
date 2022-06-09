import { it, expect, describe, jest } from '@jest/globals';
import { classNames } from './classNames';
import { debounce } from './debounce';

describe('Front End Utilities', () => {
  describe('classNames', () => {
    it('className returns a string combining the inputs', () => {
      expect(classNames('foo', 'bar')).toBe('foo bar');
    });
  });

  describe('debounce', () => {
    it('returns a function', () => {
      expect(
        typeof debounce(() => {
          /* nothing */
        })
      ).toBe('function');
    });
    it('properly debounces the function', () => {
      const func = jest.fn();
      const debounced = debounce(func, 100);
      debounced();
      debounced();
      debounced();
      expect(func).not.toHaveBeenCalled();
      jest.advanceTimersByTime(500);
      expect(func).toHaveBeenCalled();
      expect(func).toHaveBeenCalledTimes(1);
    });
  });
});
