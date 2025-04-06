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

mockRouter.setCurrentUrl("/");
describe("Item component", () => {
  it("should display selected item", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { container } = render(
      <Provider store={store}>
        <Item data={data} infoClick={() => {}} />
      </Provider>,
    );

    const activeItem = container.querySelector(".item .content.active");

    expect(activeItem).toBeTruthy();
  });

  it("should display unselected item", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { container } = render(
      <Provider store={store}>
        <Item data={data} infoClick={() => {}} />
      </Provider>,
    );

    const activeItem = container.querySelector(".item .content.active");

    expect(activeItem).toBeFalsy();
  });

  it("should display enabled increase button", () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { container } = render(
      <Provider store={store}>
        <Item data={data} infoClick={() => {}} />
      </Provider>,
    );

    const activeItem = container.querySelector(".item .button.increase.disabled");

    expect(activeItem).toBeFalsy();
  });
  it("should display disabled increase button", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { container } = render(
      <Provider store={store}>
        <Item data={data} infoClick={() => {}} />
      </Provider>,
    );

    const activeItem = container.querySelector(".item .button.increase.disabled");

    expect(activeItem).toBeTruthy();
  });
  it("should display item purchase total", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { getByText } = render(
      <Provider store={store}>
        <Item data={data} infoClick={() => {}} />
      </Provider>,
    );

    expect(
      getByText(`${initialState.configData.currency.symbol}${(data.price * 3).toFixed(2)}`),
    ).toBeInTheDocument();
  });
  it("should increase item quantity when card image clicked", async () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { getByTestId } = render(
      <Provider store={store}>
        <Item data={data} infoClick={() => {}} />
      </Provider>,
    );

    const increaseButton = getByTestId("increase-image");

    fireEvent.click(increaseButton);

    const quantity = getByTestId("item-quantity");

    await waitFor(() => {
      expect(quantity).toHaveTextContent("1");
    });
  });
  it("should increase item quantity when increase button clicked", async () => {
    const initialState = {
      customerData: customerDataNoSelected,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { getByTestId } = render(
      <Provider store={store}>
        <Item data={data} infoClick={() => {}} />
      </Provider>,
    );

    const increaseButton = getByTestId("increase-button");

    fireEvent.click(increaseButton);

    const quantity = getByTestId("item-quantity");

    await waitFor(() => {
      expect(quantity).toHaveTextContent("1");
    });
  });
  it("should decrease item quantity when decrease button clicked", async () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { getByTestId } = render(
      <Provider store={store}>
        <Item data={data} infoClick={() => {}} />
      </Provider>,
    );

    const decreaseButton = getByTestId("decrease-button");

    fireEvent.click(decreaseButton);

    const quantity = getByTestId("item-quantity");

    await waitFor(() => {
      expect(quantity).toHaveTextContent("3");
    });
  });
  it("should call open info function on info button click", async () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const infoClick = jest.fn();

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { getByTestId } = render(
      <Provider store={store}>
        <Item data={data} infoClick={infoClick} />
      </Provider>,
    );

    const button = getByTestId("info-link");

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(infoClick).toHaveBeenCalled();
    });
  });
});
