import typescript from '@rollup/plugin-typescript';
import dotenv from 'rollup-plugin-dotenv';
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import progress from 'rollup-plugin-progress';

const plugins = [
  dotenv(),
  nodeResolve(),
  commonjs(),
  json(),
  typescript(),
  terser(),
  progress(),
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
