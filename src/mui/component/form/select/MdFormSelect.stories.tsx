import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../../stories/Helpers';

import MdFormSelect from './MdFormSelect';

const meta: Meta<typeof MdFormSelect> = {
  title: 'mui/MdFormSelect',
  component: MdFormSelect,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdFormSelect>;

export const Primary: Story = {
  args: {
    label: 'label',
    name: 'name',
    values: { name: 'name' },
    errors: [],
  },
};
Primary.parameters = {
  jest: ['MdFormSelect.test'],
};
