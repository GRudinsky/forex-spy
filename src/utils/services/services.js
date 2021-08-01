import 'whatwg-fetch';
import { URL_OXR } from '../constants';
export const getCurrencies = async () => {
  const options = {
    method: 'GET'
  };
  const response = await fetch(URL_OXR, options);
  return response.json();
};
