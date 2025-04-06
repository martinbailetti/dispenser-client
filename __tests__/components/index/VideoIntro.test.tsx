import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerData from "../../../mocks/redux_json/customerData.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import VideoIntro from "@/components/index/VideoIntro";

mockRouter.setCurrentUrl("/");
describe("VideoIntro component", () => {

  it("should play video on video container click", async () => {

    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    store.dispatch = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <VideoIntro />
      </Provider>,
    );

    const button = getByTestId("video-container");
    const video = getByTestId("video-element") as HTMLVideoElement;

    video.play = jest.fn();

    act(() => {
      fireEvent.click(button);
    });


    await waitFor(() => {
      expect(video.play).toHaveBeenCalled();
    });
  });
  it("should display video muted", async () => {

    const initialState = {
      customerData: customerData,
      configData: { ...configInitializedData, audio_on_attract: false },
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    store.dispatch = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <VideoIntro />
      </Provider>,
    );

    const button = getByTestId("video-container");
    const video = getByTestId("video-element") as HTMLVideoElement;

    video.play = jest.fn();

    act(() => {
      fireEvent.click(button);
    });


    await waitFor(() => {
      expect(video.muted).toBe(true);
    });
  });
  it("should display video with audio", async () => {

    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    store.dispatch = jest.fn();

    const { getByTestId } = render(
      <Provider store={store}>
        <VideoIntro />
      </Provider>,
    );

    const button = getByTestId("video-container");
    const video = getByTestId("video-element") as HTMLVideoElement;

    video.play = jest.fn();

    act(() => {
      fireEvent.click(button);
    })

    await waitFor(() => {
      expect(video.muted).toBe(false);
    });
  });
});
