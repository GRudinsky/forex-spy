import {
  GlobalStateInterface,
  AllCurrenciesInterface
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
  ResetRates = 'RESET_ALL_CURRENCY_RATES',
  GetHistory = 'GET_CHOSEN_CURRENCY_RATE_HISTORY',
  ResetHistory = 'RESET_CURRENCY_RATE_HISTORY'
}

type Currency = string;

type CurrencyTypePayload = {
  [ActionTypes.AddCurrency]: Currency;
  [ActionTypes.RemoveCurrency]: Currency;
};

export type FavouriteCurrenciesActions = ActionMap<CurrencyTypePayload>[keyof ActionMap<CurrencyTypePayload>];

const favouriteCurrenciesReducer = (
  state: Currency[],
  action: FavouriteCurrenciesActions
) => {
  switch (action.type) {
    case ActionTypes.AddCurrency:
      return [...state, action.payload];
    case ActionTypes.RemoveCurrency:
      return [...state.filter((item) => item !== action.payload)];
    default:
      return state;
  }
};

type AllratesPayload = {
  [ActionTypes.GetRates]: AllCurrenciesInterface;
  [ActionTypes.ResetRates]: undefined;
};

export type AllCurrencyRatesActions = ActionMap<AllratesPayload>[keyof ActionMap<AllratesPayload>];

const allCurrencyRatesReducer = (
  state: AllCurrenciesInterface | null,
  action: AllCurrencyRatesActions
) => {
  switch (action.type) {
    case ActionTypes.GetRates:
      return action.payload;
    case ActionTypes.ResetRates:
      return null;
    default:
      return state;
  }
};

type RateHistoryPayload = {
  [ActionTypes.GetHistory]: {};
  [ActionTypes.ResetHistory]: undefined;
};

export type ChosenRateHistoryActions = ActionMap<RateHistoryPayload>[keyof ActionMap<RateHistoryPayload>];

const chosenRateHistoryReducer = (
  state: object | null,
  action: ChosenRateHistoryActions
) => {
  switch (action.type) {
    case ActionTypes.GetHistory:
      return action.payload; //will need currency name in payload
    case ActionTypes.ResetHistory:
      return null;
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
