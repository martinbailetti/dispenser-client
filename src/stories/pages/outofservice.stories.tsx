import type { Meta, StoryObj } from "@storybook/react";

import Outofservice from "../../pages/outofservice";

const meta = {
  component: Outofservice,
} satisfies Meta<typeof Outofservice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
