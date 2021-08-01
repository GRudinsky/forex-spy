import React from 'react';
import { useParams } from 'react-router-dom';
import './CurrencyPage.scss';

const CurrencyPage = () => {
  const params = useParams();

  //call fetch curr history with params.id

  return (
    <div className="container">
      <h1>Hello {params.id}</h1>
    </div>
  );
};

export default CurrencyPage;
