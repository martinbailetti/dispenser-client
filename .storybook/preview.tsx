import React from "react";
import "../styles/main.scss";
import { Provider } from "react-redux";
import { DataProvider } from "../src/context/DataContext";
import { fn } from "@storybook/test";
import { testStore } from "../mocks/mockStore";

import type { Preview, StoryContext } from "@storybook/react";

const withProviders = (Story, context: StoryContext) => {
  const initialState = context.parameters.initialState || {};
  const store = testStore(initialState);
  return (
    <DataProvider>
      <Provider store={store}>
        <Story />
      </Provider>
    </DataProvider>
  );
};

const preview: Preview = {
  parameters: {
    actions: { onClick: fn() },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withProviders],
  tags: ['autodocs'],
};

export default preview;
