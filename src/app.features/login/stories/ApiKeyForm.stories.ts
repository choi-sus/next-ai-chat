import type { Meta, StoryObj } from '@storybook/react';

import { ApiKeyForm } from '../components';

const meta: Meta = {
  title: 'components/ApiKeyForm',
  component: ApiKeyForm,
  argTypes: {
    apiKey: { control: 'text' },
    onChangeKey: { action: 'onChange' },
    _onKeyPress: { action: 'onKeyPress' },
  },
};

export default meta;

type Story = StoryObj<typeof ApiKeyForm>;

export const Default: Story = {
  args: {
    apiKey: '',
    _onKeyPress: (e) => {
      if (e.key === 'Enter') {
        console.log('Pressed enter key');
      }
    },
    onChangeKey: (e) => {
      console.log('API key changed: ', e.target.value);
    },
  },
};
