import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useReducer
} from 'react';
import { mainReducer } from '../utils/reducers';

export interface AllCurrenciesInterface {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: object;
}

export interface GlobalStateInterface {
  allCurrencyRates: AllCurrenciesInterface | null;
  chosenRateHistory: object | null;
  favouriteCurrencies: string[];
}

export interface GlobalActionsInterface {
  getAllCurrencyRates: Function;
  setFavouriteCurrencies: Function;
}

export type InitialStateType = {
  allCurrencyRates: null;
  chosenRateHistory: null;
  favouriteCurrencies: [];
};

const initialState = {
  allCurrencyRates: null,
  chosenRateHistory: null,
  favouriteCurrencies: []
};

const actions = {
  getAllCurrencyRates: () => console.log('ALLCURRENCIES'),
  setFavouriteCurrencies: () => console.log('FAVCURRENCIES')
};

// const GlobalStateContext = createContext({
//   state: {} as Partial<GlobalStateInterface>,
//   actions: {} as Dispatch<Partial<GlobalActionsInterface>>,
//   setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>
// });

// interface GlobalStateProviderInterface {
//   children: React.ReactNode;
//   value?: Partial<GlobalStateInterface>;
// }

// const GlobalStateProvider = ({
//   children,
//   value = initialState as GlobalStateInterface
// }: GlobalStateProviderInterface) => {
//   const [state, setState] = useState(value);
//   return (
//     <GlobalStateContext.Provider value={{ state, actions, setState }}>
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// const useGlobalState = () => {
//   const context = useContext(GlobalStateContext);
//   return context;
// };

// export { GlobalStateProvider, useGlobalState };

const GlobalStateContext = createContext<{
  state: GlobalStateInterface;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

const GlobalStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
