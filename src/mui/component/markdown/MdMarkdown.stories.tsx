import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdMarkdown from './MdMarkdown';

const meta: Meta<typeof MdMarkdown> = {
  title: 'mui/MdMarkdown',
  component: MdMarkdown,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdMarkdown>;

export const Primary: Story = {
  args: {
    content: 'content',
  },
};
Primary.parameters = {
  jest: ['MdMarkdown.test'],
};
