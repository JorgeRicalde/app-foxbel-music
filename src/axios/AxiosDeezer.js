import axios from 'axios';

export const AxiosDeezer = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.deezer.com',
});

AxiosDeezer.interceptors.request.use(
  (config) => {
    config.data = {
      ...config.data,
      access_token: 'frdgMVqeEINmHIXdsyCJWlYdDHGFOoBSpdvzgzmR6TEZHeICsiY',
    };
    return config;
  },
  () => null
);
AxiosDeezer.interceptors.response.use(
  ({ data }) => {
    if (data['error'] == undefined) return data;
    return null;
  },
  () => null
);
