import React, { useReducer, useContext } from 'react';
import { mainReducer } from '../utils/reducers';

export type RatesType = {
  [key: string]: number;
};

export interface AllCurrenciesInterface {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: RatesType;
}

export interface AllCurrenciesStateInterface {
  body: AllCurrenciesInterface | null;
  error: ErrorType;
}

export type ChosenRateType = object | null;

export interface ChosenRateStateInterface {
  body: ChosenRateType;
  error: ErrorType;
}
export type FavouriteCurrenciesType = string[];
export type ErrorType = string | null;

export interface GlobalStateInterface {
  allCurrencyRates: AllCurrenciesStateInterface;
  chosenRateHistory: ChosenRateStateInterface;
  favouriteCurrencies: string[];
}

const initialState = {
  allCurrencyRates: {
    body: null,
    error: null
  },
  chosenRateHistory: {
    body: null,
    error: null
  },
  favouriteCurrencies: []
};

const GlobalStateContext = React.createContext<{
  state: GlobalStateInterface;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

const useGlobalContext = () => useContext(GlobalStateContext);

const GlobalStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider, useGlobalContext };

export default GlobalStateContext;
