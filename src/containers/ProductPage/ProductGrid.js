import React, { useState, useEffect, Suspense } from 'react';
import { useHistory } from 'react-router-dom';

import { list } from '../../utils/services';
import { URL_OXR, ERROR_MESSAGE_LIST } from '../../utils/constants';
import './ProductGrid.scss';

const ProductCard = React.lazy(() => import('../../components/CurrencyCard'));

const ProductGrid = () => {
  let history = useHistory();
  const [data, setData] = useState({
    rates: {
      AED: 1
    }
  });
  const [loading, setLoading] = useState([]);
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

  const openCard = (e) => {
    history.push({
      pathname: `/${e.currentTarget.title}`
    });
    console.log(e.currentTarget.title);
  };

  const { rates } = data;
  // const handleChecked = (e) => {
  //   const mappedProducts = products.map((item) =>
  //     item.productId === Number(e.target.value)
  //       ? { ...item, isChecked: !item.isChecked }
  //       : item
  //   );
  //   setProducts(mappedProducts);
  // };
  // const removeChecked = () => {
  //   const unCheckedProducts = products.filter((item) => !item.isChecked);
  //   setProducts(unCheckedProducts);
  // };
  // const checkedLength = products.filter((item) => item.isChecked).length;

  return (
    <>
      <div className="header"></div>
      <div className="mainWrapper">
        {loading && <h2 id="loadingMessage">Loading...</h2>}
        {error && <h2 id="errorMessage">{error}</h2>}
        {!loading && !error && (
          <div className="gridWrapper">
            {Object.keys(rates).map((item, idx) => {
              return (
                <div className="gridWrapper__item" key={item}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProductCard
                      data={{
                        currency: item,
                        value: rates[item]
                      }}
                      checkHandler={() => {}}
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

export default ProductGrid;
