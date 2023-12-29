import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../../stories/Helpers';

import MdFormAutocomplete from './MdFormAutocomplete';

const meta: Meta<typeof MdFormAutocomplete> = {
  title: 'mui/MdFormAutocomplete',
  component: MdFormAutocomplete,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdFormAutocomplete>;

export const Primary: Story = {
  args: {
    label: 'label',
    name: 'name',
    list: ['name'],
    values: { name: '' },
    errors: [],
  },
};
Primary.parameters = {
  jest: ['MdFormAutocomplete.test'],
};
