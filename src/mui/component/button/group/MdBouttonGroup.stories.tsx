import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../../stories/Helpers';

import MdButton from '../MdButton';
import MdBouttonGroup from './MdBouttonGroup';

const meta: Meta<typeof MdBouttonGroup> = {
  title: 'mui/MdBouttonGroup',
  component: MdBouttonGroup,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdBouttonGroup>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <MdButton label='label' />
        <MdButton label='label2' />{' '}
      </>
    ),
  },
};
Primary.parameters = {
  jest: ['MdBouttonGroup.test'],
};
