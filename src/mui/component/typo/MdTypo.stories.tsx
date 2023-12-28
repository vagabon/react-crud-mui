import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdTypo from './MdTypo';

const meta: Meta<typeof MdTypo> = {
  title: 'mui/MdTypo',
  component: MdTypo,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdTypo>;

export const Primary: Story = {
  args: {
    label: 'label',
  },
};
Primary.parameters = {
  jest: ['MdTypo.test'],
};
