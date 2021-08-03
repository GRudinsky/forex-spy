import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { CurrencyGrid, CurrencyPage } from './containers';
import App from './App';

describe('Router', () => {
  it('base path should render CurrencyGrid', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(CurrencyGrid)).toHaveLength(1);
    expect(wrapper.find(CurrencyPage)).toHaveLength(0);
  });

  it('path with params id should render currencycard', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/ABC']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(CurrencyGrid)).toHaveLength(0);
    expect(wrapper.find(CurrencyPage)).toHaveLength(1);
  });
});
