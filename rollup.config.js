import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import { string } from 'rollup-plugin-string';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import serve from 'rollup-plugin-serve';
import scss from 'rollup-plugin-scss';
import copy from 'rollup-plugin-copy'
import url from '@rollup/plugin-url';

const production = !process.env.ROLLUP_WATCH;
const directory = production ? 'prod' : 'dev';

export default {
   input: 'src/app.ts',
   output: {
      file: `dist/${directory}/app.bundle.js`,
      format: 'iife',
      name: 'app',
   },

   plugins: [
      commonjs(),
      resolve(),
      scss({ insert: true }),
      htmlTemplate({
         template: 'src/index.html',
         target: `dist/${directory}/index.html`,
      }),
      typescript({ module: 'ESNext' }),
      url({
         fileName: 'assets/[name][extname]',
         include: ['**/*.svg', '**/*.png', '**/*.jp(e)?g', '**/*.gif', '**/*.webp',
            '**/*.gltf', '**/*.glb', '**/*.mp3', '**/*.wav'],
      }),
      copy({
         targets: [{ src: 'public/**', dest: `dist/${directory}/assets` }]
      }),
      string({ include: ['**/*.glsl', '**/*.html'] }),
      production && terser(),
      !production && livereload(),
      !production &&
         serve({
            contentBase: 'dist/dev',
            port: 3000,
            open: true,
         }),
   ],
};
