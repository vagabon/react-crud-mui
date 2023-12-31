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

let checked = true;
let values = { name: checked };

const handleChange = () => {
  checked = !checked;
  values = { name: checked };
};

export const Primary: Story = {
  args: {
    label: 'label',
    name: 'name',
    values: values,
    errors: [],
    handleChange: handleChange,
  },
};
Primary.parameters = {
  jest: ['MdFormCheckbox.test'],
};
