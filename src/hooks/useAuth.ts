import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { route } from 'preact-router';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { useAsyncEffect } from './useAsyncEffect';
import { useStorage } from './useStorage';

export const useAuth = (): UseAuth => {
  const [done, setDone] = useState<boolean>(false);
  const [status, setStatus] = useState<AuthStatus>('preparing');
  const [token, setToken] = useGlobalState<string>('token', '');
  const [refreshToken, setRefreshToken] = useStorage<string>(
    'refreshToken',
    ''
  );
  const code = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
  }, []);

  useAsyncEffect(async () => {
    if (!code) return;

    try {
      setStatus('getting token');
      const response = await fetch('/api/gettoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) throw 'Code Invalid';
      const { access_token, refresh_token } = await response.json();
      setToken(access_token);
      setRefreshToken(refresh_token);
      setStatus('logged in');
      setDone(true);
    } catch (e) {
      setStatus('logged out');
      console.log('code failed', e);
      window.location.href = '/';
    }
  }, [code]);

  const refresh = useCallback(async () => {
    setStatus('refreshing');
    try {
      const response = await fetch('/api/refreshtoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      if (!response.ok) throw 'Refresh Token Invalid';
      const { access_token } = await response.json();
      setToken(access_token);
      setStatus('logged in');
      setDone(true);
    } catch (error) {
      setStatus('logged out');
      setRefreshToken('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  useEffect(() => {
    if (!refreshToken) return;
    if (!done) {
      refresh();
    } else {
      const timeout = setTimeout(refresh, TEN_MINUTES);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken, done, refresh]);

  useEffect(() => {
    console.log(token)
    if (!token && !refreshToken && !code) {
      setStatus('logged out');
      setDone(true);
    }
  }, [token, refreshToken, code]);

  useEffect(() => {
    if ( status === 'logged out') route('/login');
  })

  return [done, status];
};

const TEN_MINUTES = 1000 * 60 * 10;

type UseAuth = [boolean, AuthStatus];

export type AuthStatus =
  | 'preparing'
  | 'refreshing'
  | 'getting token'
  | 'logged in'
  | 'logged out';
