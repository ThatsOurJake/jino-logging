import typescript from '@rollup/plugin-typescript';
import dotenv from 'rollup-plugin-dotenv';
import terser from '@rollup/plugin-terser';

const plugins = [
  dotenv(),
  typescript(),
  terser(),
];

export default [
  {
    input: 'src/client/index.ts',
    output: {
      dir: 'dist/client',
      format: 'cjs'
    },
    plugins
  },
  {
    input: 'src/server/index.ts',
    output: {
      dir: 'dist/server',
      format: 'cjs'
    },
    plugins
  }
];
