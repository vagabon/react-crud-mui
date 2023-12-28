import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdTabs from './MdTabs';

const meta: Meta<typeof MdTabs> = {
  title: 'mui/MdTabs',
  component: MdTabs,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdTabs>;

export const Primary: Story = {
  args: {
    label: 'label',
    tabs: [
      { name: 'tab1', label: 'Tab1' },
      { name: 'tab2', label: 'Tab2' },
    ],
  },
};
Primary.parameters = {
  jest: ['MdTabs.test'],
};
