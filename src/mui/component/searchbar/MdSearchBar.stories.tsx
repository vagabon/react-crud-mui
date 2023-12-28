import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdSearchBar from './MdSearchBar';

const meta: Meta<typeof MdSearchBar> = {
  title: 'mui/MdSearchBar',
  component: MdSearchBar,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdSearchBar>;

const callBack = () => {
  return '';
};

export const Primary: Story = {
  args: {
    search: 'search',
    callBack: callBack,
  },
};
Primary.parameters = {
  jest: ['MdSearchBar.test'],
};
