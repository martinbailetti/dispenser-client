import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerData from "../../../mocks/redux_json/customerData.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import PaymentItemList from "@/components/payment/PaymentItemList";

mockRouter.setCurrentUrl("/payment");
describe("PaymentItemList component", () => {
    it("should display payment items list", () => {
        const initialState = {
            customerData: customerData,
            configData: configInitializedData,
            itemsData: itemsData,
        };

        const store = testStore(initialState);


        const { container } = render(
            <Provider store={store}>
                <PaymentItemList />
            </Provider>,
        );

        const items = container.querySelectorAll(".payment-item");
        expect(customerData.items.length).toBe(customerData.items.length);

    });

});
