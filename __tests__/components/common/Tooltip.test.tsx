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
import Tooltip from "@/components/common/Tooltip";
import { tooltip_wait } from "@/config";

jest.useFakeTimers();

mockRouter.setCurrentUrl("/");
const mockElm = {
    getBoundingClientRect: jest.fn().mockReturnValue({
        top: 100,
        left: 200,
        right: 300,
        bottom: 400,
        width: 100,
        height: 100,
        x: 200,
        y: 100,
        toJSON: jest.fn(),
    }),
};

const timeout = 3;
const message_text = "Test message";
mockRouter.setCurrentUrl("/");
const initialState = {
    customerData: customerData,
    configData: configInitializedData,
    itemsData: itemsData,
    appData: { ...appData, message: { message: message_text, timeout: timeout, dismissible: false } },
};


describe("Tooltip component", () => {

    it("should display tooltip text", async () => {
 
        const store = testStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <Tooltip text={message_text} type="right" closeTooltip={() => { }} elm={mockElm as any} />
            </Provider>,
        );
        const text = getByText(message_text);

        expect(text).toBeInTheDocument();
    });

    it("should close tooltip on timeout", async () => {

     
        const closeTooltip = jest.fn();

        const store = testStore(initialState);

       render(
            <Provider store={store}>
                <Tooltip text={message_text} type="right" closeTooltip={closeTooltip} elm={mockElm as any} />
            </Provider>,
        );


        await act(async () => {
            jest.advanceTimersByTime(tooltip_wait);
        });


        expect(closeTooltip).toHaveBeenCalled();
    });



});
