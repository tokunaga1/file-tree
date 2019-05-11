import vue      from 'rollup-plugin-vue';
import buble    from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/wrapper.js',
  output: {
    name: 'FileTree',
    exports: 'named',
    globals: {
      '@fortawesome/fontawesome-svg-core': 	'@fortawesome/fontawesome-svg-core',
      '@fortawesome/vue-fontawesome': 			'@fortawesome/vue-fontawesome',
      '@fortawesome/free-solid-svg-icons': 	'@fortawesome/free-solid-svg-icons',
      //'sl-vue-tree': 'sl-vue-tree',
    },
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true,
    }),
    buble(),
    commonjs(),
  ],
  external: [
    '@fortawesome/fontawesome-svg-core',
    '@fortawesome/vue-fontawesome',
    '@fortawesome/free-solid-svg-icons',
    //'sl-vue-tree',
  ],
};
