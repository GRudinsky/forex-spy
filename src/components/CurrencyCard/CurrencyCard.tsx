import React, { useContext } from 'react';
import { GlobalStateContext } from '../../state/GlobalStateProvider';
import { ActionTypes } from '../../utils/reducers';

import Lozenge from '@atlaskit/lozenge';
import { Checkbox } from '@atlaskit/checkbox';

import './CurrencyCard.scss';

type Props = {
  data: {
    currency: string;
    value: number;
  };
  clickHandler: React.MouseEventHandler<HTMLDivElement>;
};

const CurrencyCard = ({ data, clickHandler }: Props) => {
  const { currency, value } = data;
  const {
    state: { favouriteCurrencies },
    dispatch
  } = useContext(GlobalStateContext);

  const isChecked = favouriteCurrencies.includes(currency);

  const toggleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: isChecked ? ActionTypes.RemoveCurrency : ActionTypes.AddCurrency,
      payload: e.target.value
    });
  };
  return (
    favouriteCurrencies && (
      <div className="card">
        <div className="card__favourite">
          <Checkbox
            id={`checkbox__${currency}`}
            value={currency}
            label="Favourite"
            isChecked={isChecked}
            onChange={toggleChecked}
            name="favourite currency"
            testId="favouriteCurrency"
          />
          {isChecked && <Lozenge appearance="inprogress">Favourite</Lozenge>}
        </div>
        <div className="card__action" title={currency} onClick={clickHandler}>
          <div className="card__action__name">{currency}</div>
          <div className="card__action__price">{`$${(1 / value).toFixed(
            4
          )} `}</div>
        </div>
      </div>
    )
  );
};

export default CurrencyCard;
