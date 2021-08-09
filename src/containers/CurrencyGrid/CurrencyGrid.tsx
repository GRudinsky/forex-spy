import React, { useState, useEffect, Suspense } from 'react';
import { useHistory } from 'react-router-dom';

import { useGlobalContext } from '../../utils/state';
import { ActionTypes } from '../../utils/reducers';
import { getCurrencies } from '../../utils/services';
import { MultilineInput } from 'react-input-multiline';
import './CurrencyGrid.scss';

const CurrencyCard = React.lazy(() => import('../../components/CurrencyCard'));

const CurrencyGrid = () => {
  const {
    state: { allCurrencyRates, favouriteCurrencies },
    dispatch
  } = useGlobalContext();

  let history = useHistory();
  const [data, setData] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(false);
  const { error } = allCurrencyRates;

  useEffect(() => {
    setLoading(true);
    listCurrencies();
  }, []);

  useEffect(() => {
    allCurrencyRates.body && setData(allCurrencyRates.body.rates);
  }, [allCurrencyRates.body]);

  const listCurrencies = () => {
    getCurrencies()
      .then((res) => {
        dispatch({
          type: ActionTypes.GetRates,
          payload: { body: res, error: null }
        });
      })
      .catch((e) =>
        dispatch({
          type: ActionTypes.GetRates,
          payload: { body: null, error: e.message }
        })
      );

    setLoading(false);
  };

  const openCard = (e: any) => {
    history.push({
      pathname: `/${e.currentTarget.title}`
    });
  };

  const sortedCurrencies = () => {
    if (data) {
      const currencies = Object.keys(data);
      const filteredCurrencies = !searchString
        ? currencies
        : currencies.filter((item) =>
            item.includes(searchString.toUpperCase())
          );
      return filteredCurrencies.reduce((acc: string[], item) => {
        acc = favouriteCurrencies.includes(item)
          ? [item, ...acc]
          : [...acc, item];
        return acc;
      }, []);
    }
    return [];
  };

  return (
    <>
      <div className="container">
        {loading && <h2 id="loadingMessage">Loading...</h2>}
        {error && <h2 id="errorMessage">{error}</h2>}
        {!loading && !error && (
          <>
            <MultilineInput
              id="input"
              value=""
              placeholder="search..."
              onChange={(e) => setSearchString(e.target.value)}
            />
            <div className="gridWrapper">
              {sortedCurrencies().map((item: string, idx) => {
                return (
                  <div className="gridWrapper__item" key={item}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <CurrencyCard
                        data={{
                          currency: item,
                          value: data[item]
                        }}
                        clickHandler={openCard}
                      />
                    </Suspense>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CurrencyGrid;
