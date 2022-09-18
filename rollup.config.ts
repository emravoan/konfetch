import { resolve } from 'path';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import type { RollupOptions } from 'rollup';

const config = () => {
  const root = resolve(__dirname, 'src/');
  const outDir = resolve(__dirname, 'dist');

  return ([
    {
      input: resolve(root, 'bundle.ts'),
      output: {
        file: resolve(outDir, 'bundle.js'),
        format: 'es',
        sourcemap: false,
        exports: 'default',
      },
      plugins: [
        esbuild(),
        del({ targets: outDir }),
        scss({
          output: resolve(outDir, 'bundle.css'),
          processor: (css) => postcss([autoprefixer]).process(css).then(result => result.css),
        })
      ]
    },
    {
      input: resolve(root, 'bundle.ts'),
      output: {
        file: resolve(outDir, 'bundle.d.ts'),
        format: 'es'
      },
      plugins: [
        dts(),
        scss({
          output: resolve(outDir, 'bundle.css'),
          processor: (css) => postcss([autoprefixer]).process(css).then(result => result.css),
        })
      ]
    },
  ]) as RollupOptions;
};

export default config;