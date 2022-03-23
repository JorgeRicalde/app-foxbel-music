import { AxiosDeezer } from '@/axios/AxiosDeezer';
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    isLoading: false,
    results: [],
    next: '',
    total: 0,
    selected: null,
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
      if (value) {
        this.results = response.data;
        this.next = response.next;
        this.total = response.total;
        this.selected = null;
        this.isLoading = false;
      } else {
        this.$reset();
      }
    },
    setSelect(value) {
      this.selected = value;
    },
  },
});
