import vue      from 'rollup-plugin-vue';
import buble    from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'FileTree',
    exports: 'named',
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
    }),
    buble(),
    commonjs(),
  ],
};
