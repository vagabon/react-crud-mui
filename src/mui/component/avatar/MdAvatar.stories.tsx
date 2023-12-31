import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdAvatar from './MdAvatar';

const meta: Meta<typeof MdAvatar> = {
  title: 'mui/MdAvatar',
  component: MdAvatar,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdAvatar>;

export const Primary: Story = {
  args: { name: 'name' },
};
Primary.parameters = {
  jest: ['MdAvatar.test'],
};
