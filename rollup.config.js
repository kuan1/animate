import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json'

const isDev = process.env.NODE_ENV === 'development'

const name = 'animatejs'

function getOutPut() {
  return isDev
    ? [
        {
          file: `public/index.js`,
          format: 'iife',
          name,
        },
      ]
    : [
        {
          file: `lib/index.js`,
          format: 'cjs',
          exports: 'auto',
        },
        {
          file: `lib/${name}.${pkg.version}.min.js`,
          format: 'iife',
          name,
        },
        {
          file: `lib/index.esm.js`,
          format: 'esm',
        },
      ]
}

const config = {
  input: 'src/index.ts',
  output: getOutPut(),
  plugins: [
    resolve({ browser: true }),
    commonjs({ exclude: 'node_modules' }),
    json(),
    typescript(),
    postcss(),
  ],
}

if (!isDev) {
  config.plugins.push(terser())
}

export default config
