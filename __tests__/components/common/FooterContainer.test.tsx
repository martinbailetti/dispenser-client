import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import mockRouter from "next-router-mock";

import FooterContainer from "@/components/common/FooterContainer";

import configInitializedData from "../../../mocks/redux_json/configInitializedData.json"
import customerData from "../../../mocks/redux_json/customerData.json"
import itemsData from "../../../mocks/redux_json/itemsData.json"
import appData from "../../../mocks/redux_json/appData.json"
import { show_info_wait } from "@/config";

jest.useFakeTimers();

mockRouter.setCurrentUrl("/");

describe("FooterContainer component", () => {


    it("should navigate to home on logo click", () => {
        mockRouter.setCurrentUrl("/howto");
        const initialState = {
            customerData: customerData,
            configData: configInitializedData,
            itemsData: itemsData,
        };

        const store = testStore(initialState);

        const { getByTestId } = render(
            <Provider store={store}>
                <FooterContainer />
            </Provider>,
        );

        const link = getByTestId("logo");


        act(() => {
            fireEvent.click(link);
        });
        expect(mockRouter.push).toHaveBeenCalledWith("/");

    });
    it("should navigate to home on menu home click", () => {
        mockRouter.setCurrentUrl("/howto");
        const initialState = {
            customerData: customerData,
            configData: configInitializedData,
            itemsData: itemsData,
        };

        const store = testStore(initialState);

        const { getByTestId } = render(
            <Provider store={store}>
                <FooterContainer />
            </Provider>,
        );

        const link = getByTestId("index");


        act(() => {
            fireEvent.click(link);
        });
        expect(mockRouter.push).toHaveBeenCalledWith("/");

    });
    it("should navigate to how to page on howto menu clicked", () => {
        mockRouter.setCurrentUrl("/");
        const initialState = {
            customerData: customerData,
            configData: configInitializedData,
            itemsData: itemsData,
        };

        const store = testStore(initialState);

        const { getByTestId } = render(
            <Provider store={store}>
                <FooterContainer />
            </Provider>,
        );

        const link = getByTestId("howto");


        fireEvent.click(link);
        expect(mockRouter.push).toHaveBeenCalledWith("/howto");

    });
    it("should display machine info on click wait and hide it", async () => {
        const initialState = {
            customerData: customerData,
            configData: configInitializedData,
            itemsData: itemsData,
        };

        const store = testStore(initialState);

        const { getByTestId, container } = render(
            <Provider store={store}>
                <FooterContainer />
            </Provider>,
        );

        const button = getByTestId("info");


        fireEvent.click(button);
        expect(container.querySelector(".info .content.show")).toBeInTheDocument();
        await act(async () => {
            jest.advanceTimersByTime(show_info_wait);
        });
        expect(container.querySelector(".info .content.show")).not.toBeInTheDocument();
    });
    it("should display connection icons", async () => {
        const initialState = {
            customerData: customerData,
            configData: configInitializedData,
            itemsData: itemsData,
            appData: appData
        };

        const store = testStore(initialState);

        const { getByTestId } = render(
            <Provider store={store}>
                <FooterContainer />
            </Provider>,
        );

        const icon = getByTestId("connection-icons");


        expect(icon).toBeInTheDocument();

    });
    it("should display connected icon", async () => {
        const initialState = {
            customerData: customerData,
            configData: configInitializedData,
            itemsData: itemsData,
            appData: appData
        };

        const store = testStore(initialState);

        const { container } = render(
            <Provider store={store}>
                <FooterContainer />
            </Provider>,
        );
        const connected = container.querySelector('.icon-connected');
        const connected_hide = container.querySelector('.icon-connected.hide');

        const disconnected_hide = container.querySelector('.icon-disconnected.hide');

        expect(connected).toBeInTheDocument();
        expect(connected_hide).not.toBeInTheDocument();
        expect(disconnected_hide).toBeInTheDocument();
    });
    it("should display disconnected icon", async () => {
        const initialState = {
            customerData: customerData,
            configData: configInitializedData,
            itemsData: itemsData,
            appData: { ...appData, connected: false }
        };

        const store = testStore(initialState);

        const { container } = render(
            <Provider store={store}>
                <FooterContainer />
            </Provider>,
        );
        const disconnected = container.querySelector('.icon-disconnected');
        const disconnected_hide = container.querySelector('.icon-disconnected.hide');

        const connected_hide = container.querySelector('.icon-connected.hide');

        expect(disconnected).toBeInTheDocument();
        expect(disconnected_hide).not.toBeInTheDocument();
        expect(connected_hide).toBeInTheDocument();
    });
    it("should not display connection icons", async () => {
        const initialState = {
            customerData: customerData,
            configData: { ...configInitializedData, show_internet_connection: false },
            itemsData: itemsData,
            appData: appData
        };

        const store = testStore(initialState);

        const { queryByTestId } = render(
            <Provider store={store}>
                <FooterContainer />
            </Provider>,
        );

        const icon = queryByTestId("connection-icons");


        expect(icon).not.toBeInTheDocument();

    });

});
