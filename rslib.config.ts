import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/index.ts'],
    },
    exclude: ['**/__tests__/**'],
  },
  lib: [
    {
      bundle: true,
      format: 'esm',
      outBase: './dist/es',
      dts: {
        distPath: './dist/es',
        autoExtension: true,
      },
    },
    {
      bundle: true,
      format: 'cjs',
      outBase: './dist/lib',
      dts: {
        distPath: './dist/lib',
        autoExtension: true,
      },
    },
  ],
  output: {
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    target: 'web',
  },
  plugins: [pluginReact()],
});
