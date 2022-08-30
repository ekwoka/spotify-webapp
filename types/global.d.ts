import fetch from 'cross-fetch';

declare type global = {
  fetch: typeof fetch;
};
