import React from 'react';
import { Router, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import CurrencyPage from './CurrencyPage';

describe('<CurrencyPage/>', () => {
  it('should render', () => {
    const historyMock = {
      push: jest.fn(),
      listen: jest.fn(),
      length: 2,
      location: { pathname: '/AED' }
    };

    const wrapper = mount(
      <Router history={historyMock}>
        <Route path="/:id">
          <CurrencyPage />
        </Route>
      </Router>
    );
    expect(wrapper.find('#page_title').text()).toBe('AED page');
  });
});
