import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdContent from './MdContent';

const meta: Meta<typeof MdContent> = {
  title: 'mui/MdContent',
  component: MdContent,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdContent>;

export const Primary: Story = {
  args: {
    className: 'className',
    children: 'children',
  },
};
Primary.parameters = {
  jest: ['MdContent.test'],
};
