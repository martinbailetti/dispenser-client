import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';

import mockRouter from "next-router-mock";
import { already_claimed_message_wait } from "@/config";
import { Provider } from "react-redux";
import PrizeShowAlreadyClaimed from '@/components/checkprize/PrizeShowAlreadyClaimed';


import { testStore } from "../../../mocks/mockStore";

import configData from "../../../mocks/redux_json/configData.json";
import customerData from "../../../mocks/redux_json/customerData.json";

import itemsData from "../../../mocks/redux_json/itemsData.json";

import prizeMoneyWonData from "../../../mocks/redux_json/prizeMoneyWonData.json";


mockRouter.setCurrentUrl("/checkprize");

jest.useFakeTimers();

describe('PrizeShowAlreadyClaimed component', () => {


  it('should render the component', () => {
    const initialState = {
      customerData: customerData,
      configData: configData,
      itemsData: itemsData,
      prizeData: { ...prizeMoneyWonData, already_claimed: true },
    };

    const store = testStore(initialState);


    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeShowAlreadyClaimed />
      </Provider>,
    );
    const dispenseEndElement = getByTestId('claimed');
    expect(dispenseEndElement).toBeInTheDocument();
  });

  it('should redirect after timeout', async () => {
    const initialState = {
      customerData: customerData,
      configData: configData,
      itemsData: itemsData,
      prizeData: { ...prizeMoneyWonData, already_claimed: true },
    };

    const store = testStore(initialState);


    render(
      <Provider store={store}>
        <PrizeShowAlreadyClaimed />
      </Provider>,
    );

    await act(async () => {
      jest.advanceTimersByTime(already_claimed_message_wait);
    });
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  it('should redirect on click', () => {
    const initialState = {
      customerData: customerData,
      configData: configData,
      itemsData: itemsData,
      prizeData: { ...prizeMoneyWonData, already_claimed: true },
    };

    const store = testStore(initialState);


    const { getByTestId } = render(
      <Provider store={store}>
        <PrizeShowAlreadyClaimed />
      </Provider>,
    );
    const dispenseEndElement = getByTestId('close');

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
      prizeData: { ...prizeMoneyWonData, already_claimed: true },
    };

    const store = testStore(initialState);

    const { unmount } = render(
      <Provider store={store}>
        <PrizeShowAlreadyClaimed />
      </Provider>,
    );
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    clearTimeoutSpy.mockRestore();
  });
});