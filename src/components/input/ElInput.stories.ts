import type { Meta, StoryObj } from '@storybook/react';

import ElInput from './ElInput';

const meta: Meta<typeof ElInput> = {
  title: 'elements/Button',
  component: ElInput,
  argTypes: {
    _onChange: { action: 'onChange' },
    _onKeyPress: { action: 'onKeyPress' },
  },
} satisfies Meta<typeof ElInput>;

export default meta;

type Story = StoryObj<typeof ElInput>;

export const Default: Story = {
  args: {
    title: 'Input Title',
    value: '',
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: 'Input Value',
  },
};

export const WithKeyPress: Story = {
  args: {
    ...Default.args,
    value: 'Input Value',
    _onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) =>
      console.log(e.key),
  },
};
