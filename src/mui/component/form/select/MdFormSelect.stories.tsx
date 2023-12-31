import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../../stories/Helpers';

import { IListDto } from '../../../../utils/list/ListUtils';
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

const callBack = () => {
  // DO NOTHING
};

export const Primary: Story = {
  args: {
    label: 'label',
    name: 'name',
    list: [{ id: 1, libelle: 'name' }] as IListDto[],
    values: { name: 'name' },
    validationSchema: { name: { required: true, listId: true } },
    errors: [],
    handleChange: callBack,
    callBack: callBack,
  },
};
Primary.parameters = {
  jest: ['MdFormSelect.test'],
};
