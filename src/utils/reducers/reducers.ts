import {
  GlobalStateInterface,
  AllCurrenciesInterface,
  AllCurrenciesStateInterface,
  ChosenRateStateInterface,
  FavouriteCurrenciesType,
  ChosenRateType,
  ErrorType
} from '../../state/GlobalStateProvider';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ActionTypes {
  AddCurrency = 'ADD_FAVOURITE_CURRENCY',
  RemoveCurrency = 'REMOVE_FAVOURITE_CURRENCY',
  GetRates = 'GET_ALL_CURRENCY_RATES',
  GetRatesSuccess = 'GET_ALL_CURRENCY_RATES_SUCCESS',
  GetRatesFailure = 'GET_ALL_CURRENCY_RATES_FAILURE',
  ResetRates = 'RESET_ALL_CURRENCY_RATES',
  GetHistory = 'GET_CHOSEN_CURRENCY_RATE_HISTORY',
  GetHistorySuccess = 'GET_CHOSEN_CURRENCY_RATE_HISTORY_SUCCESS',
  GetHistoryFailure = 'GET_CHOSEN_CURRENCY_RATE_HISTORY_FAILURE',
  ResetHistory = 'RESET_CURRENCY_RATE_HISTORY'
}

type CurrencyTypePayload = {
  [ActionTypes.AddCurrency]: string;
  [ActionTypes.RemoveCurrency]: string;
};

const logActionType = (action: ActionTypes) =>
  console.log(`%c action ${action} `, 'font-weight: bold');

export type FavouriteCurrenciesActions = ActionMap<CurrencyTypePayload>[keyof ActionMap<CurrencyTypePayload>];

const favouriteCurrenciesReducer = (
  state: FavouriteCurrenciesType,
  action: FavouriteCurrenciesActions
) => {
  logActionType(action.type);
  switch (action.type) {
    case ActionTypes.AddCurrency:
      return [...state, action.payload];
    case ActionTypes.RemoveCurrency:
      return [...state.filter((item) => item !== action.payload)];
    default:
      return state;
  }
};

type AllRatesPayload = {
  [ActionTypes.GetRates]: {
    body: AllCurrenciesInterface;
    error: ErrorType;
  };
  [ActionTypes.ResetRates]: undefined;
};

export type AllCurrencyRatesActions = ActionMap<AllRatesPayload>[keyof ActionMap<AllRatesPayload>];

const allCurrencyRatesReducer = (
  state: AllCurrenciesStateInterface,
  action: AllCurrencyRatesActions
) => {
  switch (action.type) {
    case ActionTypes.GetRates:
      const { body, error } = action.payload;
      if (body) {
        logActionType(ActionTypes.GetRatesSuccess);
        return {
          body,
          error: null
        };
      }
      if (error) {
        logActionType(ActionTypes.GetRatesFailure);
        return {
          body: null,
          error
        };
      }
      return state;

    case ActionTypes.ResetRates:
      logActionType(ActionTypes.ResetRates);
      return {
        body: null,
        error: null
      };
    default:
      return state;
  }
};

type RateHistoryPayload = {
  [ActionTypes.GetHistory]: {
    body: ChosenRateType;
    error: ErrorType;
  };
  [ActionTypes.ResetHistory]: undefined;
};

export type ChosenRateHistoryActions = ActionMap<RateHistoryPayload>[keyof ActionMap<RateHistoryPayload>];

const chosenRateHistoryReducer = (
  state: ChosenRateStateInterface,
  action: ChosenRateHistoryActions
) => {
  switch (action.type) {
    case ActionTypes.GetHistory:
      const { body, error } = action.payload;
      if (body) {
        logActionType(ActionTypes.GetHistorySuccess);
        return {
          body,
          error: null
        };
      }
      if (error) {
        logActionType(ActionTypes.GetHistoryFailure);
        return {
          body: null,
          error
        };
      }
      return state;
    case ActionTypes.ResetHistory:
      return {
        body: null,
        error: null
      };
    default:
      return state;
  }
};

export const mainReducer = (
  {
    favouriteCurrencies,
    allCurrencyRates,
    chosenRateHistory
  }: GlobalStateInterface,
  action:
    | ChosenRateHistoryActions
    | AllCurrencyRatesActions
    | FavouriteCurrenciesActions
) => ({
  favouriteCurrencies: favouriteCurrenciesReducer(
    favouriteCurrencies,
    action as FavouriteCurrenciesActions
  ),
  allCurrencyRates: allCurrencyRatesReducer(
    allCurrencyRates,
    action as AllCurrencyRatesActions
  ),
  chosenRateHistory: chosenRateHistoryReducer(
    chosenRateHistory,
    action as ChosenRateHistoryActions
  )
});
