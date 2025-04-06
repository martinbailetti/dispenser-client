import type { Meta, StoryObj } from '@storybook/react';

import Howto from '../../pages/howto';

const meta = {
  component: Howto,
} satisfies Meta<typeof Howto>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};