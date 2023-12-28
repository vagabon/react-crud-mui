import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdFab from './MdFab';

const meta: Meta<typeof MdFab> = {
  title: 'mui/MdFab',
  component: MdFab,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdFab>;

export const Primary: Story = {
  args: {
    size: 'small',
    color: 'success',
    label: 'label',
    callback: () => {},
  },
};
Primary.parameters = {
  jest: ['MdFab.test'],
};
