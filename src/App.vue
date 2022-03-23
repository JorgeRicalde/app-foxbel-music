<template>
  <v-app>
    <NavBar />
    <SideBar />
    <Main />
    <Footer />
  </v-app>
</template>

<script>
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Main from './components/Main';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    Main,
    SideBar,
    NavBar,
    Footer,
  },

  data: () => ({}),

  mounted() {},

  methods: {},
};
</script>
