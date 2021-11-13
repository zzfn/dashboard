import { defineConfig } from 'umi';

import defaultSettings from './defaultSettings';
import routes from './routes';

export default defineConfig({
  publicPath: process.env.BUILD_TARGET === 'cdn' ? 'https://oss-zzf.zzfzzf.com/blog-admin/' : '/',
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: false,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {},
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  nodeModulesTransform: { type: 'none' },
  mfsu: {},
  webpack5: {},
  // Fast Refresh 热更新
  fastRefresh: {},
});
