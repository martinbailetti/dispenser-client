import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import Item from "@/components/index/Item";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerData from "../../../mocks/redux_json/customerData.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import appData from "../../../mocks/redux_json/appData.json";
import Disclaimer from "@/components/index/Disclaimer";
import { sendActionToMachine } from '@/bridge';

jest.mock('../../../src/bridge', () => ({
  sendActionToMachine: jest.fn().mockResolvedValue({ success: true }),
}));

mockRouter.setCurrentUrl("/");
jest.useFakeTimers();
describe("Disclaimer component", () => {
  it("should render invisible disclamer layer without content", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: { ...appData, pending: false, pending_video: false, show_disclaimer: true, show_disclaimer_content: false }
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Disclaimer />
      </Provider>,
    );
    const layer = queryByTestId("disclaimer");
    const content = queryByTestId("disclaimer-content");
    
    expect(layer).toBeInTheDocument();
    expect(content).not.toBeInTheDocument();
  });
  it("should render disclamer content", () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: { ...appData, pending: false, pending_video: false, show_disclaimer: true, show_disclaimer_content: false }
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Disclaimer />
      </Provider>,
    );
    const layer = queryByTestId("disclaimer");

    act(() => {
      fireEvent.click(layer as HTMLElement);
    }
    );
    const content = queryByTestId("disclaimer-content");
    
    expect(content).toBeInTheDocument();
  });

  it("should hide disclamer content after timeout", async () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: { ...appData, pending: false, pending_video: false, show_disclaimer: true, show_disclaimer_content: true }
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Disclaimer />
      </Provider>,
    );

    const content = queryByTestId("disclaimer-content");
    expect(content).toBeInTheDocument();
    await act(async () => {
      jest.advanceTimersByTime(configInitializedData.show_disclaimer_timeout*1000);
    });
    expect(content).not.toBeInTheDocument();
  });

  it("should call sendActionToMachine on click yes button", async () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: { ...appData, pending: false, pending_video: false, show_disclaimer: true, show_disclaimer_content: true }
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Disclaimer />
      </Provider>,
    );

    const yesButton = queryByTestId("disclaimer-yes-button");
    expect(yesButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(yesButton as HTMLElement);
    });
    expect(sendActionToMachine).toHaveBeenCalledWith('disclaimerAccepted', { accepted: true });
  
  });

  it("should hide disclaimer content on click no button", async () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: { ...appData, pending: false, pending_video: false, show_disclaimer: true, show_disclaimer_content: true }
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Disclaimer />
      </Provider>,
    );

    const noButton = queryByTestId("disclaimer-no-button");
    expect(noButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(noButton as HTMLElement);
    });
    expect(queryByTestId("disclaimer-content")).not.toBeInTheDocument();
  
  });

});
