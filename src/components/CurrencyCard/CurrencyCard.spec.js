import React from 'react';
import { mount } from 'enzyme';
import * as GlobalStateContext from '../../utils/state';
import CurrencyCard from './CurrencyCard';

jest.mock('../../utils/state');

describe('<CurrencyCard />', () => {
  const contextMock = {
    state: { favouriteCurrencies: ['GBP'] },
    dispatch: jest.fn()
  };

  const changedContextMock = {
    ...contextMock,
    state: {
      ...contextMock.state,
      favouriteCurrencies: []
    }
  };
  const data = {
    currency: 'GBP',
    value: 0.8
  };

  let wrapper;
  const props = {
    data,
    clickHandler: jest.fn()
  };

  beforeEach(() => {
    GlobalStateContext.useGlobalContext = jest
      .fn()
      .mockImplementation(() => contextMock);

    wrapper = mount(<CurrencyCard {...props} />);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display the correct currency name and the formatted rate', () => {
    const { currency } = data;
    expect(wrapper.find(`#currencyCard_${currency}_name`).text()).toEqual(
      currency
    );
    expect(wrapper.find(`#currencyCard_${currency}_price`).text()).toEqual(
      `$1.2500`
    );
  });

  [
    {
      context: contextMock,
      checkBoxChecked: true,
      lozengeLength: 1,
      action: 'REMOVE_FAVOURITE_CURRENCY'
    },
    {
      context: changedContextMock,
      checkBoxChecked: false,
      lozengeLength: 0,
      action: 'ADD_FAVOURITE_CURRENCY'
    }
  ].forEach((item) => {
    const { context, checkBoxChecked, lozengeLength, action } = item;

    it(`should have the checkbox checked value equal to ${checkBoxChecked} and ${lozengeLength} lozenges displayed when currency is ${
      context.state.favouriteCurrencies.includes(data.currency) ? '' : 'NOT '
    }within favouriteCurrencies in global state`, () => {
      jest
        .spyOn(GlobalStateContext, 'useGlobalContext')
        .mockImplementationOnce(() => context);

      wrapper = mount(<CurrencyCard {...props} />);
      expect(wrapper.find('Lozenge')).toHaveLength(lozengeLength);
      expect(wrapper.find('input[id="checkbox__GBP"]').props().checked).toBe(
        checkBoxChecked
      );
    });

    it(`should dispatch ${action} action on checkBox change to ${
      checkBoxChecked ? 'un' : ''
    }checked`, () => {
      jest
        .spyOn(GlobalStateContext, 'useGlobalContext')
        .mockImplementationOnce(() => context);
      wrapper = mount(<CurrencyCard {...props} />);
      wrapper
        .find('input[id="checkbox__GBP"]')
        .simulate('change', { target: { value: 'GBP' } });
      expect(contextMock.dispatch).toHaveBeenCalledWith({
        payload: 'GBP',
        type: action
      });
    });
  });
});
