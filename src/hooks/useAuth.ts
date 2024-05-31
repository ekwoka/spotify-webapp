import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { useSignal } from '@preact/signals';
import { route } from 'preact-router';
import { useCallback, useEffect, useRef } from 'preact/hooks';
import { useAsyncEffect } from './useAsyncEffect';

export const useAuth = (): UseAuth => {
  const done = useSignal<boolean>(false);
  const status = useSignal<AuthStatus>('preparing');
  const setToken = useGlobalState<string>('token', '')[1];
  const code = useRef<string | null>(
    (() => {
      const params = new URLSearchParams(window.location.search);
      return params.get('code');
    })(),
  );

  useAsyncEffect(async () => {
    if (!code.current) return;

    try {
      status.value = 'getting token';
      const response = await fetch('/api/gettoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code.current }),
      });
      if (!response.ok) throw 'Code Invalid';
      const { access_token } = await response.json();
      setToken(access_token);
      status.value = 'logged in';
      done.value = true;
    } catch (e) {
      status.value = 'logged out';
      console.log('code failed', e);
      window.location.href = '/';
    }
    code.current = null;
  }, [code.current, status, done]);

  const refresh = useCallback(async () => {
    if (code.current) return;
    try {
      const response = await fetch('/api/refreshtoken');
      if (!response.ok) throw 'Refresh Token Invalid';
      const { access_token } = await response.json();
      setToken(access_token);
      status.value = 'logged in';
    } catch (error) {
      status.value = 'logged out';
    }
    done.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, done]);

  useEffect(() => {
    if (!done.value) {
      refresh();
    } else {
      const timeout = setInterval(refresh, TEN_MINUTES);
      return () => clearInterval(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, refresh]);

  useEffect(() => {
    if (status.value === 'logged out') route('/login');
  });

  return [done.value, status.value];
};

const TEN_MINUTES = 1000 * 60 * 10;

type UseAuth = [boolean, AuthStatus];

export type AuthStatus =
  | 'preparing'
  | 'refreshing'
  | 'getting token'
  | 'logged in'
  | 'logged out';
