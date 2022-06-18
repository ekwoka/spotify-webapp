import { it, expect, describe, jest } from '@jest/globals';
import { classNames } from './classNames';
import { debounce } from './debounce';
import { toRespImageSrcset, toRespImageURL } from './respImage';

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

  describe('responsiveImage', () => {
    it('returns a respImage string', () => {
      const src = toRespImageURL('https://example.com/image.jpg', 200);
      expect(src).toBe('/api/image?url=https://example.com/image.jpg&w=200');
    });
    it('returns multiple respImage strings', () => {
      const srcset = toRespImageSrcset('https://example.com/image.jpg', 200);
      expect(srcset).toBe(
        '/api/image?url=https://example.com/image.jpg&w=90 90w, /api/image?url=https://example.com/image.jpg&w=180 180w'
      );
    });
  });
});
