import type { Meta, StoryObj } from '@storybook/react';

import PrizeEnd from '@/components/checkprize/PrizeEnd';

const meta = {
  component: PrizeEnd,
} satisfies Meta<typeof PrizeEnd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};