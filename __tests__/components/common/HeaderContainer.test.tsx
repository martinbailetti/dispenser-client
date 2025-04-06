import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import mockRouter from "next-router-mock";

import HeaderContainer from "@/components/common/HeaderContainer";

import configInitializedData from "../../../mocks/redux_json/configInitializedData.json"
import customerData from "../../../mocks/redux_json/customerData.json"
import itemsData from "../../../mocks/redux_json/itemsData.json"
import customerDataNoSelected from "../../../mocks/redux_json/customerDataNoSelected.json"

describe("HeaderContainer component", () => {


  it("should display purchase total", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <HeaderContainer startProcessing={() => {}} detailOpened={false} />
      </Provider>,
    );
    const total = initialState.customerData.items.reduce(
      (acc: number, item) => acc + (item as any).price * (item as any).quantity,
      0,
    );

    expect(
      getByText(`${initialState.configData.currency.symbol}${total.toFixed(2)}`),
    ).toBeInTheDocument();
  });
  it("should display disabled header buttons", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <HeaderContainer startProcessing={() => {}} detailOpened={false} />
      </Provider>,
    );

    const buttons = container.querySelector("header .buttons.disabled");

    expect(buttons).toBeTruthy();
  });
  it("should clear selected items", () => {
    const initialState = {
      customerData: {
        balance: 100,
        items: [{ id: "1", quantity: 3, price: 2 }],
        loading: "idle",
        error: null,
      },
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { container, getByText } = render(
      <Provider store={store}>
        <HeaderContainer startProcessing={() => {}} detailOpened={false} />
      </Provider>,
    );

    const button = container.querySelector("header .buttons .button.cancel");

    if (button) {
      act(() => fireEvent.click(button));
    }

    const buttons = container.querySelector("header .buttons.disabled");

    expect(getByText(`${initialState.configData.currency.symbol}0.00`)).toBeInTheDocument();
    expect(buttons).toBeTruthy();
  });

  it("should navigate to payment page", async () => {
    mockRouter.setCurrentUrl("/");
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { container, getByTestId } = render(
      <Provider store={store}>
        <HeaderContainer startProcessing={() => {}} detailOpened={false} />
      </Provider>,
    );



    const button = getByTestId("buy-button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/payment");
    });
  });
});
