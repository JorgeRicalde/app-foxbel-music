import { AxiosDeezer } from '@/axios/AxiosDeezer';
import { defineStore } from 'pinia';

const getParamsFromUrl = (url) => {
  const params = url?.split('?');
  if (params && params.length >= 1) {
    return Object.fromEntries(new URLSearchParams(params[1]).entries());
  }
  return null;
};

export const useSearchStore = defineStore('search', {
  state: () => ({
    isLoading: false,
    results: [],
    paramsNext: null,
    total: 0,
  }),
  getters: {
    carouselResults: (state) => state.results.slice(0, 5),
  },
  actions: {
    async searchResults(value = '') {
      this.isLoading = true;
      const response = await AxiosDeezer.get('search', {
        params: { q: value },
      });
      if (response) {
        this.results = response.data;
        this.paramsNext = getParamsFromUrl(response.next);
        this.total = response.total;
        this.isLoading = false;
      } else {
        this.$reset();
      }
    },
    async searchMoreResults() {
      if (!this.paramsNext) {
        return;
      }
      this.isLoading = true;
      const response = await AxiosDeezer.get('search', {
        params: this.paramsNext,
      });
      if (response) {
        this.results = [...this.results, ...response.data];
        this.paramsNext = getParamsFromUrl(response.next);
        this.total = response.total;
      }
      this.isLoading = false;
    },
  },
});
