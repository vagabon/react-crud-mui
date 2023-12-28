import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdToolbar from './MdToolbar';

const meta: Meta<typeof MdToolbar> = {
  title: 'mui/MdToolbar',
  component: MdToolbar,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdToolbar>;

export const Primary: Story = {
  args: {
    id: 'id',
  },
};
Primary.parameters = {
  jest: ['MdToolbar.test'],
};
