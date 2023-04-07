import type { Meta, StoryObj } from '@storybook/react';

import ElButton from './ElButton';

const meta: Meta<typeof ElButton> = {
  title: 'elements/button',
  component: ElButton,
  argTypes: {
    type: {
      control: 'text',
    },
    margin: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
    _onClick: {
      action: 'onClick',
    },
  },
} satisfies Meta<typeof ElButton>;

export default meta;

type Story = StoryObj<typeof ElButton>;

export const Default: Story = {
  args: {
    type: 'button',
    margin: 'm-0',
    children: 'Button',
    _onClick: () => console.log('clickd'),
  },
};

export const Submit: Story = {
  args: {
    ...Default.args,
    type: 'submit',
    children: 'Submit',
  },
};
