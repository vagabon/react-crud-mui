import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdBox from './MdBox';

const meta: Meta<typeof MdBox> = {
  title: 'mui/MdBox',
  component: MdBox,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdBox>;

export const Primary: Story = {
  args: { children: 'Content' },
};
Primary.parameters = {
  jest: ['MdBox.test'],
};
