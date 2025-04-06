import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";
import customerData from "../../../mocks/redux_json/customerData.json";
import configInitializedData from "../../../mocks/redux_json/configInitializedData.json";
import itemsData from "../../../mocks/redux_json/itemsData.json";
import ItemDetail from "@/components/index/ItemDetail";

mockRouter.setCurrentUrl("/");
describe("Item component", () => {


  it("should call close info function on close button click", async () => {

    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
    };

    const closeClick = jest.fn();

    const store = testStore(initialState);

    const data = itemsData.items[0] as any;

    const { getByTestId } = render(
      <Provider store={store}>
        <ItemDetail price={data.price} title={data.title} image={data.image} description={data.description} closeClick={closeClick} />
      </Provider>,
    );

    const button = getByTestId("close-detail");

    fireEvent.click(button);


    await waitFor(() => {
      expect(closeClick).toHaveBeenCalled();

    });
  });
});
