<template>
  <v-app-bar app>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            chips
            clearable
            hide-details
            hide-selected
            append-icon="mdi-magnify"
            item-text="name"
            item-value="symbol"
            label="Buscar"
            solo
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
                <span v-text="item.name"></span>
              </v-chip>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-avatar
                color="indigo"
                class="text-h5 font-weight-light white--text"
              >
                {{ item.name.charAt(0) }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="item.symbol"
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
            <v-icon color="#E86060">mdi-account</v-icon>
            Jorge Ricalde {{ this.items2 }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style>
.usuario-cuenta {
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
}
</style>

<script>
export default {
  name: 'NavBar',

  props: {
    items2: Array,
  },

  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
  }),

  mounted() {},

  methods: {},

  watch: {
    model(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;
      console.log(val);
      this.isLoading = true;
      // Lazily load input items
      fetch('https://api.coingecko.com/api/v3/coins/list')
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
