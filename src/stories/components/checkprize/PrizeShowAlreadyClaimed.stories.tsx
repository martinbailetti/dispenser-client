import type { Meta, StoryObj } from "@storybook/react";

import PrizeShowAlreadyClaimed from "@/components/checkprize/PrizeShowAlreadyClaimed";

import configData from "../../../../mocks/redux_json/configData.json";

import prizeMoneyWonData from "../../../../mocks/redux_json/prizeMoneyWonData.json";

const meta = {
  component: PrizeShowAlreadyClaimed,
  parameters: {
    initialState: {
      configData: configData,
      prizeData: { ...prizeMoneyWonData, already_claimed: true },
    },
  },
} satisfies Meta<typeof PrizeShowAlreadyClaimed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <section className="check-prize page">

        <div className="container">
          <Story />
        </div>
      </section>
    ),
  ],
};