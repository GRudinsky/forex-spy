import React, { useState, useEffect, useContext, Suspense } from 'react';
import { useHistory } from 'react-router-dom';

import { GlobalStateContext, RatesType } from '../../state/GlobalStateProvider';
import { ActionTypes } from '../../utils/reducers';
import { getCurrencies } from '../../utils/services';
import './CurrencyGrid.scss';

const CurrencyCard = React.lazy(() => import('../../components/CurrencyCard'));

const CurrencyGrid = () => {
  const {
    state: { allCurrencyRates, favouriteCurrencies },
    dispatch
  } = useContext(GlobalStateContext);

  let history = useHistory();
  const [data, setData] = useState(null);
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
    return data && favouriteCurrencies
      ? Object.keys(data).reduce((acc: string[], item) => {
          acc = favouriteCurrencies.includes(item)
            ? [item, ...acc]
            : [...acc, item];
          return acc;
        }, [])
      : [];
  };

  return (
    <>
      <div className="container">
        {loading && <h2 id="loadingMessage">Loading...</h2>}
        {error && <h2 id="errorMessage">{error}</h2>}
        {!loading && !error && (
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
        )}
      </div>
    </>
  );
};

export default CurrencyGrid;
