import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',
  output: [
    { file: 'build/sheet2api-js.js', format: 'umd', name: 'sheet2api' },
    { file: 'build/sheet2api-js.min.js', format: 'umd', name: 'sheet2api', plugins: [terser()] },
  ],
};
