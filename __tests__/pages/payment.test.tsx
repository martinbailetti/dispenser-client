
import mockSelectedItems from "../../mocks/mockSelectedItems.json";
import mockItems from "../../mocks/mockItems.json";
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { testStore } from "../../mocks/mockStore";
import Payment from "@/pages/payment";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";

import customerData from "../../mocks/redux_json/customerData.json";
import configInitializedData from "../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../mocks/redux_json/itemsData.json";


jest.mock("next/router", () => require("next-router-mock"));

mockRouter.setCurrentUrl("/payment");

describe("Payment component", () => {
  it("Show processing on init", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Payment />
      </Provider>,
    );

    expect(queryByTestId("payment-balance-amount")).toBeInTheDocument();
  });
});
