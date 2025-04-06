import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import Item from "@/components/index/Item";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerData from "../../../mocks/redux_json/customerData.json";
import customerDataNoSelected from "../../../mocks/redux_json/customerDataNoSelected.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import PaymentItem from "@/components/payment/PaymentItem";
import Warning from "@/components/warnings/Warning";
import devicesInWarning from "../../../mocks/redux_json/devicesInWarning.json";

mockRouter.setCurrentUrl("/");
describe("Warning icon button component", () => {
  it("should display open device warnings button", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      devicesInWarning: devicesInWarning,
    };

    const store = testStore(initialState);

    const data = devicesInWarning[0] as any;

    const { getByTestId } = render(
      <Provider store={store}>
        <Warning />
      </Provider>,
    );

    expect(getByTestId("warning-button")).toBeInTheDocument();
  });
  it("should not display open device warnings button", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      devicesInWarning: [],
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Warning />
      </Provider>,
    );

    expect(queryByTestId("warning-button")).not.toBeInTheDocument();
  });

  it("should display device warnings list on click", async () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      devicesInWarning: devicesInWarning,
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <Warning />
      </Provider>,
    );

    const button = getByTestId("warning-button");
    await act(() => {
      fireEvent.click(button);
    });

    const list = getByTestId("warning-list");

    expect(list).toBeInTheDocument();
  });

  it("should close device warnings list on close button click", async () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      devicesInWarning: devicesInWarning,
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <Warning />
      </Provider>,
    );

    const button = getByTestId("warning-button");

    await act(() => {
      fireEvent.click(button);
    });

    const list = getByTestId("warning-list");
    await act(() => {
      fireEvent.click(list);
    });

    expect(list).not.toBeInTheDocument();
  });
});
