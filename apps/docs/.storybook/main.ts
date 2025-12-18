import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|ts)',
    '../../../packages/core/src/**/*.stories.@(js|ts)',
  ],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],

  docs: {
    autodocs: 'tag',
  },

  viteFinal: async (config) => {
    return {
      ...config,
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include ?? []),
          'lit',
          'lit/decorators.js',
        ],
      },
    };
  },
};

export default config;
