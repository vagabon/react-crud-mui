import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../../stories/Helpers';

import MdFabAdd from './MdFabAdd';

const meta: Meta<typeof MdFabAdd> = {
  title: 'mui/MdFabAdd',
  component: MdFabAdd,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdFabAdd>;

export const Primary: Story = {
  args: {
    urlAdd: 'urlAdd',
    urlAddRole: [''],
  },
};
Primary.parameters = {
  jest: ['MdFabAdd.test'],
};
