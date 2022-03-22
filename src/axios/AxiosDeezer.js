import axios from 'axios';

export const AxiosDeezer = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.deezer.com',
  headers: {
    'Access-Control-Allow-Origin': '*',
    accept: 'application/json',
  },
});

AxiosDeezer.interceptors.request.use(
  (config) => {
    return config;
  },
  () => null
);
AxiosDeezer.interceptors.response.use(
  ({ data }) => {
    return data;
  },
  () => null
);
