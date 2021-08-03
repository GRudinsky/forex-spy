import { ActionTypes, mainReducer } from './reducers';
import { initialState } from '../state';

const consoleSpy = jest.spyOn(global.console, 'log');

describe('mainReducer', () => {
  it('should return the initial state in case of the unknown action action', () => {
    const reducedState = mainReducer(initialState, { type: 'customAction' });
    expect(reducedState).toEqual(initialState);
  });

  describe('favouriteCurrencies reducer', () => {
    const favouriteCurrenciesState = {
      allCurrencyRates: {
        body: { AED: 1 },
        error: null
      },
      chosenRateHistory: {
        body: {},
        error: null
      },
      favouriteCurrencies: ['ABA', 'ABB']
    };

    it('should add the payload to the favouriteCurrencies array and log the ADD_FAVOURITE_CURRENCY action', () => {
      const reducedState = mainReducer(favouriteCurrenciesState, {
        type: ActionTypes.AddCurrency,
        payload: 'ABC'
      });
      expect(reducedState).toEqual({
        ...favouriteCurrenciesState,
        favouriteCurrencies: ['ABA', 'ABB', 'ABC']
      });
      expect(consoleSpy.mock.calls[0][0]).toBe(
        '%c action ADD_FAVOURITE_CURRENCY'
      );
    });

    it('should remove the payload from the favouriteCurrencies array and log the REMOVE_FAVOURITE_CURRENCY action', () => {
      const reducedState = mainReducer(favouriteCurrenciesState, {
        type: ActionTypes.RemoveCurrency,
        payload: 'ABC'
      });
      expect(reducedState).toEqual({
        ...favouriteCurrenciesState,
        favouriteCurrencies: ['ABA', 'ABB']
      });
      expect(consoleSpy.mock.calls[0][0]).toBe(
        '%c action REMOVE_FAVOURITE_CURRENCY'
      );
    });
  });

  describe('allCurrencyRates reducer', () => {
    const allCurrenciesState = {
      allCurrencyRates: {
        body: null,
        error: null
      },
      chosenRateHistory: {
        body: {},
        error: null
      },
      favouriteCurrencies: ['ABA', 'ABB']
    };

    it('should add the payload body to the allCurrencyRates object and log the GET_ALL_CURRENCY_RATES_SUCCESS action', () => {
      const payload = { body: { AED: 1 } };
      const reducedState = mainReducer(allCurrenciesState, {
        type: ActionTypes.GetRates,
        payload
      });
      expect(reducedState).toEqual({
        ...allCurrenciesState,
        allCurrencyRates: {
          body: payload.body,
          error: null
        }
      });
      expect(consoleSpy.mock.calls[0][0]).toBe(
        '%c action GET_ALL_CURRENCY_RATES_SUCCESS'
      );
    });

    it('should add the payload to the allCurrencyRates array and log the GET_ALL_CURRENCY_RATES_FAILURE action', () => {
      const payload = { error: 'some error' };
      const reducedState = mainReducer(allCurrenciesState, {
        type: ActionTypes.GetRates,
        payload
      });
      expect(reducedState).toEqual({
        ...allCurrenciesState,
        allCurrencyRates: {
          body: null,
          error: payload.error
        }
      });
      expect(consoleSpy.mock.calls[0][0]).toBe(
        '%c action GET_ALL_CURRENCY_RATES_FAILURE'
      );
    });

    it('should return the initialState and log the RESET_ALL_CURRENCY_RATES action', () => {
      const payload = { error: 'some error' };
      const reducedState = mainReducer(allCurrenciesState, {
        type: ActionTypes.ResetRates,
        payload
      });
      expect(reducedState).toEqual(allCurrenciesState);
      expect(consoleSpy.mock.calls[0][0]).toBe(
        '%c action RESET_ALL_CURRENCY_RATES'
      );
    });

    it('should return the initialState in case of the unknown action', () => {
      const reducedState = mainReducer(allCurrenciesState, {
        type: 'some action'
      });
      expect(reducedState).toEqual(allCurrenciesState);
    });
  });

  describe('chosenRateHistory reducer', () => {
    const chosenRateHistoryState = {
      allCurrencyRates: {
        body: null,
        error: 'some error'
      },
      chosenRateHistory: {
        body: null,
        error: null
      },
      favouriteCurrencies: ['ABA', 'ABB']
    };

    it('should add the payload body to the allCurrencyRates object and log the GET_CHOSEN_CURRENCY_RATE_HISTORY_SUCCESS action', () => {
      const payload = { body: { AED: 1 } };
      const reducedState = mainReducer(chosenRateHistoryState, {
        type: ActionTypes.GetHistory,
        payload
      });
      expect(reducedState).toEqual({
        ...chosenRateHistoryState,
        chosenRateHistory: {
          body: payload.body,
          error: null
        }
      });
      expect(consoleSpy.mock.calls[0][0]).toBe(
        '%c action GET_CHOSEN_CURRENCY_RATE_HISTORY_SUCCESS'
      );
    });

    it('should add the payload to the allCurrencyRates array and log the GET_CHOSEN_CURRENCY_RATE_HISTORY_FAILURE action', () => {
      const payload = { error: 'some error' };
      const reducedState = mainReducer(chosenRateHistoryState, {
        type: ActionTypes.GetHistory,
        payload
      });
      expect(reducedState).toEqual({
        ...chosenRateHistoryState,
        chosenRateHistory: {
          body: null,
          error: payload.error
        }
      });
      expect(consoleSpy.mock.calls[0][0]).toBe(
        '%c action GET_CHOSEN_CURRENCY_RATE_HISTORY_FAILURE'
      );
    });

    it('should return the initialState and log the RESET_CURRENCY_RATE_HISTORY action', () => {
      const payload = { error: 'some error' };
      const reducedState = mainReducer(chosenRateHistoryState, {
        type: ActionTypes.ResetHistory,
        payload
      });
      expect(reducedState).toEqual(chosenRateHistoryState);
      expect(consoleSpy.mock.calls[0][0]).toBe(
        '%c action RESET_CURRENCY_RATE_HISTORY'
      );
    });

    it('should return the initialState in case of the unknown action', () => {
      const reducedState = mainReducer(chosenRateHistoryState, {
        type: 'some action'
      });
      expect(reducedState).toEqual(chosenRateHistoryState);
    });
  });
});
