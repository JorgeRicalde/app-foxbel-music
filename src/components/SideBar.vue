<template>
  <v-navigation-drawer permanent app color="#662323">
    <v-list dense nav dark>
      <v-list-item>
        <v-list-item-content
          ><v-img
            max-height="59"
            max-width="250"
            src="@/assets/foxbel-music.png"
          ></v-img>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-group
        v-for="categoria in categorias"
        :key="categoria.id"
        :value="true"
        sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="categoria.text"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subCategoria in categoria.subCategorias"
          :key="subCategoria.id"
          link
        >
          <v-list-item-content>
            <v-list-item-title v-text="subCategoria.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style>
.v-list .v-list-item--active {
  color: #e86060;
}
.v-list--dense .v-list-item .v-list-item__title {
  font-size: 1rem;
}
</style>

<script>
export default {
  name: 'SideBar',

  data: () => ({
    categorias: [
      {
        id: 1,
        text: 'Mi Libreria',
        subCategorias: [
          {
            id: 1,
            text: 'Recientes',
          },
          {
            id: 2,
            text: 'Artistas',
          },
          {
            id: 3,
            text: 'Canciones',
          },
          {
            id: 4,
            text: 'Estaciones',
          },
        ],
      },
      {
        id: 2,
        text: 'Playlist',
        subCategorias: [
          {
            id: 1,
            text: 'Metal',
          },
          {
            id: 2,
            text: 'Para Bailar',
          },
          {
            id: 3,
            text: 'Rock 90s',
          },
          {
            id: 4,
            text: 'Baladas',
          },
        ],
      },
    ],
  }),

  mounted() {},

  methods: {},
};
</script>
