import React from 'react';
import { Router } from 'react-router-dom';
import { mount } from 'enzyme';
import Header from './Header';

describe('<CurrencyPage/>', () => {
  it('should render a button when location pathname length is longer than one', () => {
    const historyMock = {
      push: jest.fn(),
      listen: jest.fn(),
      length: 2,
      location: { pathname: '/AED' }
    };

    const wrapper = mount(
      <Router history={historyMock}>
        <Header />
      </Router>
    );

    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('should render no button when location pathname length is one', () => {
    const historyMock = {
      push: jest.fn(),
      listen: jest.fn(),
      length: 2,
      location: { pathname: '/' }
    };

    const wrapper = mount(
      <Router history={historyMock}>
        <Header />
      </Router>
    );

    expect(wrapper.find('Button')).toHaveLength(0);
  });
});
