import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
    exclude: ['**/*.test.js', '**/__tests__/**'],
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
  },
  tools: {
    rspack: (config, { rspack }) => {
      config.plugins?.push(
        new rspack.IgnorePlugin({
          resourceRegExp: /\.test\.js$/,
          contextRegExp: /__tests__$/
        }),
      );
    },
  },
  plugins: [pluginReact()],
});
