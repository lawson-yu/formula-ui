import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'formula-ui',
  },
  apiParser: {},
  resolve: {
    entryFile: './src/index.tsx',
  },
});
