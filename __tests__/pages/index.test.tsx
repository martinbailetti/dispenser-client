
import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { testStore } from "../../mocks/mockStore";
import Home from "@/pages/index";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";

import configData from "../../mocks/redux_json/configData.json";
import customerData from "../../mocks/redux_json/customerData.json";

import configInitializedData from "../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../mocks/redux_json/itemsData.json";
import appData from "../../mocks/redux_json/appData.json";

mockRouter.setCurrentUrl("/");

jest.useFakeTimers();
describe("Home", () => {

  beforeAll(() => {
    Object.defineProperty(HTMLMediaElement.prototype, 'play', {
      writable: true,
      value: jest.fn().mockImplementation(function (this: HTMLMediaElement) {
        Object.defineProperty(this, 'paused', { value: false, configurable: true });
      }),
    });

    Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
      writable: true,
      value: jest.fn().mockImplementation(function (this: HTMLMediaElement) {
        Object.defineProperty(this, 'paused', { value: true, configurable: true });
      }),
    });
  });


  it("should display processing animation processing if its not initializated", () => {
    const initialState = {
      customerData: customerData,
      configData: configData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    expect(queryByTestId("header")).not.toBeInTheDocument();
  });
  it("should display processing animation if items empty", async () => {

    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: {
        items: [],
        loading: "idle",
        error: null,
      },
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    await waitFor(() => {
      expect(getByTestId("walk-animation")).toBeInTheDocument();
    });
  });
  it("should display index page content if items full and have no claim video", async () => {
    const initialState = {
      customerData: customerData,
      configData: { ...configInitializedData, has_claim_video: false },
      itemsData: itemsData,
      appData: appData
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    await waitFor(() => {
      expect(queryByTestId("header")).toBeInTheDocument();
      expect(queryByTestId("footer")).toBeInTheDocument();
      expect(queryByTestId("language-selector")).toBeInTheDocument();
      expect(queryByTestId("item-list")).toBeInTheDocument();
    });
  });
  it("should display video if items full and have claim video", async () => {
    const initialState = {
      customerData: customerData,
      configData: { ...configInitializedData, has_claim_video: true },
      itemsData: itemsData,
      appData: appData
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    await waitFor(() => {
      expect(queryByTestId("video-container")).toBeInTheDocument();
      expect(queryByTestId("header")).not.toBeInTheDocument();
      expect(queryByTestId("footer")).not.toBeInTheDocument();
      expect(queryByTestId("language-selector")).not.toBeInTheDocument();
      expect(queryByTestId("item-list")).not.toBeInTheDocument();
    });
  });
  it("should not render disclaimer invisible block screen", async () => {
    const initialState = {
      customerData: customerData,
      configData: { ...configInitializedData, has_claim_video: true },
      itemsData: itemsData,
      appData: { ...appData, pending: false, pending_video: false, show_disclaimer: false }
    };

    const store = testStore(initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    await waitFor(() => {
      expect(queryByTestId("disclaimer")).not.toBeInTheDocument();
    });
  });
  it("should show disclaimer invisible block screen", async () => {
    const initialState = {
      customerData: customerData,
      configData: { ...configInitializedData, has_claim_video: true },
      itemsData: itemsData,
      appData: { ...appData, pending: false, pending_video: false, show_disclaimer: true }
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    await waitFor(() => {
      expect(getByTestId("disclaimer")).toBeInTheDocument();
    });
  });
  it("should show disclaimer on click", async () => {
    const initialState = {
      customerData: customerData,
      configData: { ...configInitializedData, has_claim_video: true },
      itemsData: itemsData,
      appData: { ...appData, pending: false, pending_video: false, show_disclaimer: true }
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    const disclaimer = getByTestId("disclaimer");

    act(() => {
      fireEvent.click(disclaimer);
    });

    await waitFor(() => {
      expect(getByTestId("disclaimer-content")).toBeInTheDocument();
    });
  });
  it("should play video on click if paused", async () => {
    const initialState = {
      customerData: customerData,
      configData: { ...configInitializedData, has_claim_video: true },
      itemsData: itemsData,
      appData: { ...appData, pending: true, pending_video: true, show_disclaimer: true }
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    const videoContainer = getByTestId("video-container");
    const video = getByTestId("video-element") as HTMLMediaElement;

    expect(video.paused).toBe(true);
    act(() => {
      fireEvent.click(videoContainer);
    });

    await waitFor(() => {
      expect(video.paused).toBe(false);
    });
  });
  it("should show disclaimer on click video twice if paused", async () => {
    const initialState = {
      customerData: customerData,
      configData: { ...configInitializedData, has_claim_video: true },
      itemsData: itemsData,
      appData: { ...appData, pending: true, pending_video: true, show_disclaimer: true }
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    const videoContainer = getByTestId("video-container");
    const video = getByTestId("video-element") as HTMLMediaElement;

    expect(video.paused).toBe(true);
    act(() => {
      fireEvent.click(videoContainer);
    });

    await waitFor(() => {
      expect(video.paused).toBe(false);
    });

    act(() => {
      fireEvent.click(videoContainer);
    });

    expect(getByTestId("disclaimer")).toBeInTheDocument();

  });
  it("should show video after inactivity time", async () => {
    const initialState = {
      customerData: customerData,
      configData: { ...configInitializedData, has_claim_video: true },
      itemsData: itemsData,
      appData: { ...appData, pending: false, pending_video: true, show_disclaimer: true }
    };

    const store = testStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    await act(async () => {
      jest.advanceTimersByTime(configInitializedData.default_inactivity_time*1000);
    });
    await waitFor(() => {
      expect(getByTestId("video-container")).toBeInTheDocument();
    });
  });
});