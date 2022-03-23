<template>
  <v-app-bar app>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-autocomplete
            v-model="model"
            :items="results"
            :loading="isLoading"
            :search-input.sync="search"
            chips
            clearable
            hide-details
            hide-selected
            append-icon="mdi-magnify"
            item-text="title"
            item-value="id"
            label="Buscar"
            solo
            return-object
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  Busca tus favoritos albumes o canciones
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attr, on, item, selected }">
              <v-chip
                v-bind="attr"
                :input-value="selected"
                color="blue-grey"
                class="white--text"
                v-on="on"
              >
                <v-icon left> mdi-music-note </v-icon>
                <span v-text="item.title"></span>
              </v-chip>
            </template>
            <template v-slot:item="{ item }">
              <v-img
                max-height="40"
                max-width="40"
                class="mx-2"
                :src="item.album.cover_small"
              ></v-img>

              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="item.artist.name"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-music-note</v-icon>
              </v-list-item-action>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col align="end">
          <div class="usuario-cuenta">
            <v-icon color="#E86060">mdi-github</v-icon>
            <a href="https://github.com/JorgeRicalde" target="_blank">
              @JorgeRicalde</a
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style>
.usuario-cuenta {
  font-style: normal;
  font-size: 16px;
}
</style>

<script>
import { useSearchStore } from '@/store/SearchStore';
import { toRefs } from 'vue-demi';
import { useMusicPlayerStore } from '@/store/MusicPlayerStore';

export default {
  name: 'NavBar',

  setup() {
    const store = useSearchStore();
    const { playMusic } = useMusicPlayerStore();
    const { results, isLoading } = toRefs(store);
    const { searchResults, setSelect } = store;

    return {
      results,
      isLoading,
      searchResults,
      setSelect,
      playMusic,
    };
  },

  data: () => ({
    model: null,
    search: null,
    tab: null,
  }),

  watch: {
    model(value) {
      if (value != null) {
        this.tab = 0;
        this.setSelect(value);
        this.playMusic(value);
      } else {
        this.tab = null;
      }
    },
    search(value) {
      this.searchResults(value);
    },
  },
};
</script>
