import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { route } from 'preact-router';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { useAsyncEffect } from './useAsyncEffect';

export const useAuth = (): UseAuth => {
  const [done, setDone] = useState<boolean>(false);
  const [status, setStatus] = useState<AuthStatus>('preparing');
  const setToken = useGlobalState<string>('token', '')[1];

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
      const { access_token } = await response.json();
      setToken(access_token);
      setStatus('logged in');
      setDone(true);
    } catch (e) {
      setStatus('logged out');
      console.log('code failed', e);
      window.location.href = '/';
    }
  }, [code]);

  const refresh = useCallback(async () => {
    if (code) return;
    setStatus('refreshing');
    try {
      const response = await fetch('/api/refreshtoken');
      if (!response.ok) throw 'Refresh Token Invalid';
      const { access_token } = await response.json();
      setToken(access_token);
      setStatus('logged in');
    } catch (error) {
      setStatus('logged out');
    }
    setDone(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /* TODO: Use HTTP-only cookie for Refreshing */
    if (!done) {
      refresh();
    } else {
      const timeout = setTimeout(refresh, TEN_MINUTES);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, refresh]);

  useEffect(() => {
    if (status === 'logged out') route('/login');
  });

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
