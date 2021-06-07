// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    API_URL: 'http://localhost:8060',
    KOA_URL: 'http://localhost:3000',
  },
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  webpack5: {
    // lazyCompilation: {},
  },
});
