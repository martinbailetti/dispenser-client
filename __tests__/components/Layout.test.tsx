import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { Provider } from "react-redux";
import { testStore } from "../../mocks/mockStore";
import customerData from "../../mocks/redux_json/customerData.json";
import configInitializedData from "../../mocks/redux_json/configInitializedData.json";
import appData from "../../mocks/redux_json/appData.json";
import itemsData from "../../mocks/redux_json/itemsData.json";
import Layout from "@/components/Layout";
import es from "../../public/locales/es.json";

mockRouter.setCurrentUrl("/");
describe("Layout component", () => {
  it("should display a modal message", () => {
    const timeout = 0;
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: { ...appData, message: { message: "Test message", timeout: timeout, dismissible: false } },
    };

    const store = testStore(initialState);


    const { getByTestId } = render(
      <Provider store={store}>
        <Layout pageTitle="Test Page" description="Test Description">
          <div>Test Content</div>
        </Layout>
      </Provider>,
    );

    const modal = getByTestId("message-modal");

    expect(modal).toBeInTheDocument();
  });
  it("should not display a modal message", () => {

    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: appData
    };

    const store = testStore(initialState);


    const { queryByTestId } = render(
      <Provider store={store}>
        <Layout pageTitle="Test Page" description="Test Description">
          <div>Test Content</div>
        </Layout>
      </Provider>,
    );

    const modal = queryByTestId("message-modal");

    expect(modal).not.toBeInTheDocument();
  });
 /*  it('should display ErrorBoundary', () => {
    const initialState = {
      customerData: customerData,
      configData: configInitializedData,
      itemsData: itemsData,
      appData: appData
    };
    const ErrorThrowingComponent = () => {
      throw new Error('Test Error');
    };
    const store = testStore(initialState);
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Layout pageTitle="Test Page" description="Test Description">
          <ErrorThrowingComponent />
        </Layout>
      </Provider>,
    );
    expect(getByText(es["something_went_wrong"])).toBeInTheDocument();

    expect(getByTestId("error-boundary")).toBeInTheDocument();
  }); */

});
