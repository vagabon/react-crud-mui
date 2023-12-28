import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdChip from './MdChip';

const meta: Meta<typeof MdChip> = {
  title: 'mui/MdChip',
  component: MdChip,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdChip>;

export const Primary: Story = {
  args: {
    label: 'label',
  },
};
Primary.parameters = {
  jest: ['MdChip.test'],
};
