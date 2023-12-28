import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdThemeProvider from './MdThemeProvider';

const meta: Meta<typeof MdThemeProvider> = {
  title: 'mui/MdThemeProvider',
  component: MdThemeProvider,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdThemeProvider>;

export const Primary: Story = {
  args: {
    children: 'children',
  },
};
Primary.parameters = {
  jest: ['MdThemeProvider.test'],
};
