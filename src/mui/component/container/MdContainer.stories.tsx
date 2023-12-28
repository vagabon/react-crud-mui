import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdContainer from './MdContainer';

const meta: Meta<typeof MdContainer> = {
  title: 'mui/MdContainer',
  component: MdContainer,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdContainer>;

export const Primary: Story = {
  args: {
    children: 'children',
  },
};
Primary.parameters = {
  jest: ['MdContainer.test'],
};
