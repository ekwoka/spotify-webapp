import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { useAsyncEffect } from './useAsyncEffect';
import { useStorage } from './useStorage';

export const useAuth = (): [boolean, string] => {
  const [ready, setReady] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('waiting');
  const [token, setToken] = useStorage<string>('token', '');
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
      setStatus('fetching');
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
      setStatus('success');
      setReady(true);
    } catch (e) {
      setStatus('code failed');
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
      setStatus('refreshed');
      setReady(true);
    } catch (error) {
      setStatus('failed refresh');
      setToken('');
      setRefreshToken('');
    }
  }, [refreshToken]);

  useEffect(() => {
    if (!refreshToken) return;
    if (!ready) {
      refresh();
    } else {
      const timeout = setTimeout(refresh, TEN_MINUTES);
      return () => clearTimeout(timeout);
    }
  }, [refreshToken, ready, token]);

  useEffect(() => {
    if (!token && !refreshToken && !code) {
      setStatus('logged out');
      setReady(true);
    }
  });

  return [ready, status];
};

const TEN_MINUTES = 1000 * 60 * 10;
