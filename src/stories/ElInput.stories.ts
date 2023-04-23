import type { Meta, StoryObj } from '@storybook/react';

import ElInput from '../components/ElInput';

const meta: Meta<typeof ElInput> = {
  title: 'elements/input',
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
    _onChange: (e) => console.log('input value changed: ', e.target.value),
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
    _onKeyPress: (e) => {
      if (e.key === 'Enter') {
        console.log('Pressed enter key');
      }
    },
  },
};
