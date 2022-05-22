import { build } from 'esbuild';
import importGlobPlugin from 'esbuild-plugin-import-glob';
import { copy } from 'esbuild-plugin-copy';
import alias from 'esbuild-plugin-alias';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const dev = process.env.NODE_ENV === 'development';

console.time('esbuild');
build({
  entryPoints: ['./src/index.tsx'],
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  outdir: './dist',
  inject: ['./src/preact-shim.ts'],
  splitting: true,
  format: 'esm',
  bundle: true,
  target: 'es2017',
  platform: 'browser',
  minify: !dev,
  watch: dev
    ? {
        onRebuild(err, res) {
          if (err) console.error('esbuild failed:', err);
          else console.log('esbuild rebuilt');
        },
      }
    : false,
  plugins: [
    copy({
      assets: {
        from: ['./src/static/*'],
        to: ['./dist'],
      },
    }),
    importGlobPlugin.default(),
    alias({
      react: require.resolve('preact/compat'),
    }),
  ],
}).then(async (res) => {
  console.log(dev ? 'watching...' : 'JS Build Complete');
  console.timeEnd('esbuild');
});
