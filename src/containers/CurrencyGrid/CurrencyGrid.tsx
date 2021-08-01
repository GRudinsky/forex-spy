import React, { useState, useEffect, useContext, Suspense } from 'react';
import { useHistory } from 'react-router-dom';

import { GlobalStateContext } from '../../state/GlobalStateProvider';

import { URL_OXR, ERROR_MESSAGE_LIST } from '../../utils/constants';
import './CurrencyGrid.scss';

const CurrencyCard = React.lazy(() => import('../../components/CurrencyCard'));

type dataType = {
  rates: { [key: string]: number };
};

const CurrencyGrid = () => {
  const {
    state: { favouriteCurrencies },
    dispatch
  } = useContext(GlobalStateContext);

  let history = useHistory();
  const [data, setData] = useState<dataType>({
    rates: {
      AED: 1,
      BGD: 2,
      CBV: 3
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, []);

  const getProducts = async () => {
    // try {
    //   const response = await list(URL_OXR);
    //   setData(response);
    // } catch (e) {
    //   setError(ERROR_MESSAGE_LIST);
    // }
    setLoading(false);
  };

  const openCard = (e: any) => {
    history.push({
      pathname: `/${e.currentTarget.title}`
    });
  };
  console.log('FAV', favouriteCurrencies);
  const { rates } = data;

  const sortedCurrencies =
    rates && favouriteCurrencies
      ? Object.keys(rates).reduce((acc: string[], item) => {
          acc = favouriteCurrencies.includes(item)
            ? [item, ...acc]
            : [...acc, item];
          return acc;
        }, [])
      : [];

  return (
    <>
      <div className="container">
        {loading && <h2 id="loadingMessage">Loading...</h2>}
        {error && <h2 id="errorMessage">{error}</h2>}
        {!loading && !error && (
          <div className="gridWrapper">
            {sortedCurrencies.map((item: string, idx) => {
              return (
                <div className="gridWrapper__item" key={item}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <CurrencyCard
                      data={{
                        currency: item,
                        value: rates[item]
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
