import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdTableWithPagination from './MdTableWithPagination';

const meta: Meta<typeof MdTableWithPagination> = {
  title: 'mui/MdTableWithPagination',
  component: MdTableWithPagination,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdTableWithPagination>;

const callBack = () => {
  return '';
};

export const Primary: Story = {
  args: {
    url: 'url',
    cells: [{ name: 'name', label: 'label', order: true }],
    datas: [{ id: 1, name: 'name' }],
    count: 10,
    page: 0,
    rowsPerPage: 5,
    sortBy: 'name',
    sortByOrder: 'asc',
    callBack: callBack,
  },
};
Primary.parameters = {
  jest: ['MdTableWithPagination.test'],
};
