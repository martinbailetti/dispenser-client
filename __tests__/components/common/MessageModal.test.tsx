import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import mockRouter from "next-router-mock";


import configInitializedData from "../../../mocks/redux_json/configInitializedData.json"
import customerData from "../../../mocks/redux_json/customerData.json"
import itemsData from "../../../mocks/redux_json/itemsData.json"
import appData from "../../../mocks/redux_json/appData.json"
import MessageModal from "@/components/common/MessageModal";

jest.useFakeTimers();

mockRouter.setCurrentUrl("/");

describe("MessageModal component", () => {


  mockRouter.setCurrentUrl("/");
  it("should call close modal function on timeout", async () => {
    const timeout = 3;
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: { ...appData, message: { message: "Test message", timeout: timeout, dismissible: false } },
    };

    const store = testStore(initialState);

    render(
      <Provider store={store}>
        <MessageModal />
      </Provider>,
    );
    await act(async () => {
      jest.advanceTimersByTime(timeout * 1000);
    });


    expect((window).bridge_actionFromWeb).toHaveBeenCalledWith("{\"action\":\"closeMessage\",\"data\":null}");

  });
  it("should display close modal button and call close function on click", async () => {
    const timeout = 3;
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: { ...appData, message: { message: "Test message", timeout: timeout, dismissible: true } },
    };

    const store = testStore(initialState);

    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <MessageModal />
      </Provider>,
    );

    const button = getByTestId("modal-close");

    fireEvent.click(button);

    expect((window).bridge_actionFromWeb).toHaveBeenCalledWith("{\"action\":\"closeMessage\",\"data\":null}");

  });
  it("should not display close modal button", async () => {
    const timeout = 3;
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: { ...appData, message: { message: "Test message", timeout: timeout, dismissible: false } },
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <MessageModal />
      </Provider>,
    );

    const button = queryByTestId("modal-close");


    expect(button).not.toBeInTheDocument();

  });


});
