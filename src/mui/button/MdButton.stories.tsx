import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../stories/Helpers';

import MdButton from './MdButton';

const meta: Meta<typeof MdButton> = {
  title: 'mui/MdButton',
  component: MdButton,
  tags: ['mui'],
  argTypes: {
    color: {
      options: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning', 'google', 'facebook'],
      control: { type: 'select' },
    },
    size: { options: ['small', 'medium', 'large'], control: { type: 'select' } },
    variant: { options: ['text', 'outlined', 'contained'], control: { type: 'select' } },
    onClick: { action: 'clicked' },
  },
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdButton>;

export const Primary: Story = {
  args: {
    label: 'label',
    url: 'url',
    startIcon: undefined,
    color: 'inherit',
    size: 'small',
    variant: 'text',
    onClick: () => {},
  },
};
Primary.parameters = {
  jest: ['MdButton.test'],
};
