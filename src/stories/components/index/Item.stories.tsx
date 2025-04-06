import type { Meta, StoryObj } from "@storybook/react";

import mockItems from "../../../../mocks/mockItems.json";
import Item from "@/components/index/Item";
import { action } from "@storybook/addon-actions";

import configInitializedData from "../../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../../mocks/redux_json/itemsData.json";

const meta = {
  component: Item,
  parameters: {
    initialState: {
      configData: configInitializedData,
      itemsData:itemsData
    },
  },
} satisfies Meta<typeof Item>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    infoClick: () => {
      action("Open Detail button click")();
    },
    data: mockItems[0],
  },
  decorators: [
    (Story) => (
      <div className="items-page">
        <div className="items-list">
          <Story />
        </div>
      </div>
    ),
  ],
};
export const NoCards: Story = {
  args: {
    infoClick: () => {
      action("Open Detail button click")();
    },
    data: {...mockItems[0], current_quantity: 0},
  },
  decorators: [
    (Story) => (
      <div className="items-page">
        <div className="items-list">
          <Story />
        </div>
      </div>
    ),
  ],
};
export const Error: Story = {
  args: {
    infoClick: () => {
      action("Open Detail button click")();
    },
    data: {...mockItems[0], status: "ERROR"},
  },
  decorators: [
    (Story) => (
      <div className="items-page">
        <div className="items-list">
          <Story />
        </div>
      </div>
    ),
  ],
};
