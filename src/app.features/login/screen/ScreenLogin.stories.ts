import type { Meta, StoryObj } from '@storybook/react';

import ScreenLogin from './ScreenLogin';

const meta: Meta<typeof ScreenLogin> = {
  title: 'Screen/Login',
  component: ScreenLogin,
} satisfies Meta<typeof ScreenLogin>;

export default meta;
type Story = StoryObj<typeof ScreenLogin>;

export const Default: Story = {
  args: {},
};
