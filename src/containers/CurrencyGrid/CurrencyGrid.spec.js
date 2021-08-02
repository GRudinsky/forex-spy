import React from 'react';
import { Router } from 'react-router-dom';
import { mount } from 'enzyme';
import * as GlobalStateContext from '../../state/GlobalStateProvider';
import * as services from '../../utils/services';
import CurrencyGrid from './CurrencyGrid';

jest.mock('../../state/GlobalStateProvider');
jest.mock('../../utils/services');
describe('CurrencyGrid', () => {
  const contextMock = {
    state: {
      favouriteCurrencies: ['GBP'],
      allCurrencyRates: {
        body: {
          rates: {
            AED: 1.2,
            BFG: 1.3
          }
        },
        error: null
      }
    },
    dispatch: jest.fn()
  };

  const errorContextMock = {
    state: {
      favouriteCurrencies: [],
      allCurrencyRates: {
        body: null,
        error: 'some error message'
      }
    },
    dispatch: jest.fn()
  };
  let wrapper;

  describe('With resolved promise', () => {
    beforeEach(() => {
      GlobalStateContext.useGlobalContext.mockImplementation(() => contextMock);
      services.getCurrencies.mockImplementation(() =>
        Promise.resolve({ data: { rates: { GBP: 1.2 } } })
      );
      wrapper = mount(<CurrencyGrid />);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it(`should call getCurrencies on load and dispatch "GET_ALL_CURRENCY_RATES" action with the resolved response in the payload body`, () => {
      expect(services.getCurrencies).toHaveBeenCalled();
      expect(contextMock.dispatch).toHaveBeenCalledWith({
        payload: {
          body: {
            data: {
              rates: {
                GBP: 1.2
              }
            }
          },
          error: null
        },
        type: 'GET_ALL_CURRENCY_RATES'
      });
    });

    it('should display two currencyCard components', () => {
      expect(wrapper.find('CurrencyCard')).toHaveLength(2);
    });

    it('should push the card title as pathname to the browser history on CurrencyCard click', () => {
      const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

      services.getCurrencies.mockImplementation(() =>
        Promise.resolve({ data: { rates: { AED: 1.2 } } })
      );
      const wrapper = mount(
        <Router history={historyMock}>
          <CurrencyGrid />
        </Router>
      );
      const card = wrapper.find('CurrencyCard').at(0);
      card.find('#card_action').simulate('click');

      expect(historyMock.push.mock.calls[0][0]).toEqual({ pathname: '/AED' });
    });
  });

  describe('<With rejected promise/>', () => {
    beforeEach(() => {
      GlobalStateContext.useGlobalContext.mockImplementation(
        () => errorContextMock
      );
      services.getCurrencies.mockImplementation(() =>
        Promise.reject(new Error('some error message'))
      );
      wrapper = mount(<CurrencyGrid />);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it(`should call getCurrencies on load and dispatch "GET_ALL_CURRENCY_RATES" action with the rejected response in the payload body`, () => {
      expect(services.getCurrencies).toHaveBeenCalled();
      expect(errorContextMock.dispatch).toHaveBeenCalledWith({
        payload: {
          body: null,
          error: 'some error message'
        },
        type: 'GET_ALL_CURRENCY_RATES'
      });
    });

    it('should return error div element', () => {
      expect(wrapper.find('#errorMessage').text()).toEqual(
        errorContextMock.state.allCurrencyRates.error
      );
      expect(wrapper.find('CurrencyCard')).toHaveLength(0);
    });
  });
});
