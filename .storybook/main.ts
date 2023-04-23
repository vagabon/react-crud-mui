import type { StorybookConfig } from '@storybook/react-webpack5';

const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-jest'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config: any) => {
    config.resolve.modules.push(process.cwd() + '/src');
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config?.resolve?.alias,
        },
      },
    };
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
