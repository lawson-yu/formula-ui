import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'lsbiz-ui',
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.tsx',
  },
});
