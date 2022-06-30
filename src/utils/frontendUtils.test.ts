import { it, expect, describe, jest } from '@jest/globals';
import { chunkArray } from './chunkArray';
import { classNames } from './classNames';
import { debounce } from './debounce';
import { getBestImage } from './getBestImage';
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
  describe('getBestImage', () => {
    it('return largest image string', () => {
      const bestImage = getBestImage([
        { width: 100, url: 'testStringWorst' },
        { width: 200, url: 'testStringBest' },
        { width: 150, url: 'testStringMiddle' },
      ]);

      expect(bestImage).toBe('testStringBest');
    });
    it('returns empty string when no images', () => {
      const emptyArray = getBestImage([]);
      const badObjects = getBestImage([
        { width: 100 } as { width: number; url: string },
      ]);

      expect(emptyArray).toBe('');
      expect(badObjects).toBe('');
    });
  });
  describe('chunkArray', () => {
    it('returns chunked arrays', () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const chunks = chunkArray(testArray, 3);
      expect(chunks).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
      expect(testArray.length).toEqual(chunks.flat().length);
    });
    it('mutates array when set', () => {
      const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const chunks = chunkArray(testArray, 3, true);
      expect(chunks).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
      expect(testArray.length).toEqual(0);
    });
  });
});
