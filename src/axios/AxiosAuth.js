import axios from 'axios';

export const AxiosAuth = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://connect.deezer.com',
});

AxiosAuth.interceptors.request.use(
  (config) => {
    return config;
  },
  () => null
);
AxiosAuth.interceptors.response.use(
  ({ data }) => data,
  () => null
);
