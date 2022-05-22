import { hydrate } from 'preact';
import { App } from './App';
import { render } from './preact-shim';

if (document.body.children.length) hydrate(App(), document.body);
else render(App(), document.body);
