import { build } from 'esbuild';
import importGlobPlugin from 'esbuild-plugin-import-glob';
import { copy } from 'esbuild-plugin-copy';
import { clean } from 'esbuild-plugin-clean';
import alias from 'esbuild-plugin-alias';
import { createRequire } from 'module';
import { getAllTypeScript } from './utils/getAllTypescript.mjs';
const require = createRequire(import.meta.url);

const dev = process.env.NODE_ENV === 'development';
const test = process.env.NODE_ENV === 'test';

const paths = test
  ? await getAllTypeScript(['./src', './api'], ['.ts', '.tsx'])
  : ['./src/index.tsx'];
console.time('esbuild');
build({
  entryPoints: paths,
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  outdir: './dist',
  inject: test ? [] : ['./src/preact-shim.ts'],
  splitting: false,
  format: test ? 'cjs' : 'esm',
  bundle: !test,
  target: 'es2017',
  platform: 'browser',
  minify: !(dev || test),
  watch: dev
    ? {
        onRebuild(err) {
          if (err) console.error('esbuild failed:', err);
          else console.log('esbuild rebuilt');
        },
      }
    : false,
  plugins: [
    clean({
      patterns: ['./dist/*'],
    }),
    copy({
      assets: {
        from: ['./src/static/*'],
        to: ['./dist'],
      },
    }),
    importGlobPlugin.default(),
    alias({
      react: require.resolve('preact/compat'),
      'react-dom': require.resolve('preact/compat'),
    }),
  ],
}).then(async (_) => {
  console.log(dev ? 'watching...' : 'JS Build Complete');
  console.timeEnd('esbuild');
});
