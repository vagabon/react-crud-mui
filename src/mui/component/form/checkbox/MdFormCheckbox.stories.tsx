import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../../stories/Helpers';

import MdFormCheckbox from './MdFormCheckbox';

const meta: Meta<typeof MdFormCheckbox> = {
  title: 'mui/MdFormCheckbox',
  component: MdFormCheckbox,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdFormCheckbox>;

export const Primary: Story = {
  args: {
    label: 'label',
    name: 'name',
    values: { name: 'name' },
    errors: [],
  },
};
Primary.parameters = {
  jest: ['MdFormCheckbox.test'],
};
