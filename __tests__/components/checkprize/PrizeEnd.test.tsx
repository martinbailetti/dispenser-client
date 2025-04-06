import React, { act } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import PrizeEnd from '@/components/checkprize/PrizeEnd';
import { prize_end_message_wait } from "@/config";
import { Provider } from "react-redux";
import { testStore } from "../../../mocks/mockStore";

import configData from "../../../mocks/redux_json/configData.json";
import customerData from "../../../mocks/redux_json/customerData.json";

import itemsData from "../../../mocks/redux_json/itemsData.json";

import mockRouter from "next-router-mock";


jest.useFakeTimers();

describe('PrizeEnd', () => {


  it('should render the component', () => {
    const initialState = {
      customerData: customerData,
      configData: configData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);


    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeEnd />
      </Provider>,
    );
    const dispenseEndElement = getByTestId('dispense-end');
    expect(dispenseEndElement).toBeInTheDocument();
  });

  it('should redirect after timeout', async () => {
    const initialState = {
      customerData: customerData,
      configData: configData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);


    render(
      <Provider store={store}>
        <PrizeEnd />
      </Provider>,
    );

    jest.advanceTimersByTime(prize_end_message_wait);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  it('should redirect on click', () => {
    const initialState = {
      customerData: customerData,
      configData: configData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);


    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeEnd />
      </Provider>,
    );
    const dispenseEndElement = getByTestId('dispense-end');

    act(() => {
      fireEvent.click(dispenseEndElement);

    });
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('should clear the timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    const initialState = {
      customerData: customerData,
      configData: configData,
      itemsData: itemsData,
    };

    const store = testStore(initialState);

    const { unmount } = render(
      <Provider store={store}>
        <PrizeEnd />
      </Provider>,
    );
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    clearTimeoutSpy.mockRestore();
  });
});