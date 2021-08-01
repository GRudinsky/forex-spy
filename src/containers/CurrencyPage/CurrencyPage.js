import React from 'react';
import { useParams } from 'react-router-dom';
import './CurrencyPage.scss';

const CurrencyPage = () => {
  const params = useParams();

  return (
    <div className="container">
      <h1>{params.id + ' page'}</h1>
    </div>
  );
};

export default CurrencyPage;
