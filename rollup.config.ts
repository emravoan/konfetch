import { resolve } from 'path';
import scss from 'rollup-plugin-scss';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import commonjs from '@rollup/plugin-commonjs';
import type { RollupOptions } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = () => {
  const root = resolve(__dirname, 'src/');
  const outDir = resolve(__dirname, 'dist');

  return [
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
        commonjs(),
        nodeResolve({ preferBuiltins: false }),
        del({ targets: outDir }),
        scss({
          output: false,
          insert: true,
        }),
      ],
    },
    {
      input: resolve(root, 'bundle.ts'),
      output: {
        file: resolve(outDir, 'bundle.d.ts'),
        format: 'es',
      },
      plugins: [dts(), scss({ output: false })],
    },
  ] as RollupOptions;
};

export default config;
