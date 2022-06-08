import { describe, expect, it } from '@jest/globals';
import { generateRandomString } from './crypto';
import { formattedReturn } from './formattedReturn';
import { redirect } from './redirect';
import { refreshCookie } from './refreshCookie';

describe('Server Utilities', () => {
  describe('Crypto', () => {
    it('should return a string', () => {
      expect(typeof generateRandomString(10)).toBe('string');
    });
    it('should return the correct length', () => {
      expect(generateRandomString(10).length).toBe(10);
    });
    it('should not include illegal characters', () => {
      expect(generateRandomString(10)).not.toMatch(/[^a-zA-Z0-9]/);
    });
  });

  describe('formattedReturn', () => {
    it('should return a structured object', () => {
      const result = formattedReturn(200, {});
      expect(result).toHaveProperty('statusCode');
      expect(result).toHaveProperty('body');
      expect(result).toHaveProperty('headers');
    });
    it('should return the correct statusCode', () => {
      const result = formattedReturn(418, {});
      expect(result.statusCode).toBe(418);
    });
    it('should return the correct body as a string', () => {
      const result = formattedReturn(418, { foo: 'bar' });
      expect(typeof result.body).toBe('string');
      expect(JSON.parse(result.body).foo).toBe('bar');
    });
  });

  describe('Redirect', () => {
    it('should return a formatted redirect object', () => {
      const result = redirect('/foo');
      expect(result).toHaveProperty('statusCode');
      expect(result.statusCode).toBe(302);
      expect(result).toHaveProperty('headers');
      expect(result.headers).toHaveProperty('location');
      expect(result.headers.location).toBe('/foo');
    });
  });

  describe('Refresh Cookier', () => {
    it('should return a cookie string', () => {
      const result = refreshCookie('foo');
      expect(result).toBe(
        'refresh_token=foo; Max-Age=1209600000; Path=/; HttpOnly; Secure'
      );
    });
  });
});
