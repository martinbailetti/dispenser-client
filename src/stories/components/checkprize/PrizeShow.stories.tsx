import type { Meta, StoryObj } from "@storybook/react";

import PrizeShow from "@/components/checkprize/PrizeShow";

import configData from "../../../../mocks/redux_json/configData.json";

import prizeMoneyWonData from "../../../../mocks/redux_json/prizeMoneyWonData.json";

const meta = {
  component: PrizeShow,
  parameters: {
    initialState: {
      configData: configData,
      prizeData: {...prizeMoneyWonData, status:"PROCESSING"}
    },
  },
} satisfies Meta<typeof PrizeShow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
