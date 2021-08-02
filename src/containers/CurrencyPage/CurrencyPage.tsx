import React from 'react';
import { useParams } from 'react-router-dom';
import './CurrencyPage.scss';

type ParamsType = {
  id: string;
};

const CurrencyPage = () => {
  const params = useParams<ParamsType>();

  return (
    <div className="container">
      <h1 id="page_title">{params.id + ' page'}</h1>
    </div>
  );
};

export default CurrencyPage;
