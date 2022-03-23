import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import pinia from './plugins/pinia';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  pinia,
  render: (h) => h(App),
}).$mount('#app');
