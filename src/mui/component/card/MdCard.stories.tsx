import type { Meta, StoryObj } from '@storybook/react';
import { withProvider, withTest } from '../../../stories/Helpers';

import MdCard from './MdCard';

const meta: Meta<typeof MdCard> = {
  title: 'mui/MdCard',
  component: MdCard,
  tags: ['mui'],
  argTypes: {},
  decorators: [withTest, withProvider],
};

export default meta;
type Story = StoryObj<typeof MdCard>;

export const Primary: Story = {
  args: {
    id: 1,
    title: 'title',
    date: '2023-11-11T12:31:20',
    url: 'url',
    urlUpdate: 'urlUpdate',
    avatar: 'avatar',
    image: 'image',
    className: 'classNamme',
    children: 'Description',
  },
};
Primary.parameters = {
  jest: ['MdCard.test'],
};
