import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',
  output: [
    { file: 'build/sheet2api-js.js', format: 'umd', name: 'Sheet2API', plugins: [terser()] },
  ],
};
