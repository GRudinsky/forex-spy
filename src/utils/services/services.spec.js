import { getCurrencies } from './services';
import { URL_OXR } from '../constants';

const fetch = global.fetch;

const currencies = {
  rates: {
    AED: 1,
    GBP: 2
  }
};

describe('getCurrencies', () => {
  it('should return getCurrencies in the response', async () => {
    fetch.mockOnce(JSON.stringify(currencies));

    await getCurrencies().then((res) => {
      expect(fetch).toHaveBeenCalledWith(URL_OXR, { method: 'GET' });
      expect(res).toEqual(currencies);
    });
  });

  it('should return error in failed response', async () => {
    const errorResponse = new Error('Some Error');
    fetch.mockRejectOnce(errorResponse);

    await getCurrencies().catch((e) => {
      expect(e.message).toBe('Some Error');
    });
  });
});
