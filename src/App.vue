<template>
  <v-app>
    <NavBar :items2="['sadas', 'asd']" />
    <SideBar />
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import { AxiosDeezer } from './axios/AxiosDeezer';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
    SideBar,
    NavBar,
  },

  data: () => ({
    //
  }),

  mounted() {
    //this.getArtist(1);
  },

  methods: {
    async getArtist(id = 0) {
      const artist = await AxiosDeezer.get(`artist/${id}`);
      console.log(artist);
    },
  },
};
</script>
