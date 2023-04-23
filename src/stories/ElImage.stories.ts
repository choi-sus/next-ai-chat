import type { Meta, StoryObj } from '@storybook/react';

import ElImage from '../components/ElImage';

const meta: Meta<typeof ElImage> = {
  title: 'elements/image',
  component: ElImage,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof ElImage>;

export default meta;

type Story = StoryObj<typeof ElImage>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/150',
    alt: 'Placeholder Image',
    className: 'w-3 h-3',
  },
};
