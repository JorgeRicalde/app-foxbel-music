<template>
  <v-main>
    <v-container fluid>
      <v-row align="center" justify="center" v-if="carouselResults.length > 0">
        <v-col
          ><v-carousel
            cycle
            height="100%"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item v-for="result in carouselResults" :key="result.id">
              <v-container fluid>
                <v-row>
                  <v-col cols="4" class="mx-0 px-0">
                    <v-img height="100%" :src="result.album.cover_medium">
                    </v-img>
                  </v-col>
                  <v-col cols="8" class="mx-0 px-0">
                    <v-card
                      outlined
                      dark
                      :style="`height: 100%; background: linear-gradient(0deg, rgba(167, 0, 0, 0.7), rgba(167, 0, 0, 0.7)), url(${result.album.cover_medium})  no-repeat;  background-size: 100%; mix-blend-mode: normal; opacity: 0.5; `"
                    >
                      <v-list-item class="ml-2 mt-5" three-line>
                        <v-list-item-content>
                          <v-list-item-title
                            class="text-h4 mb-1"
                            v-text="result.title"
                          >
                          </v-list-item-title>
                          <v-list-item-subtitle
                            class="mb-1"
                            v-text="`Lo mejor de ${result.artist.name}`"
                          >
                          </v-list-item-subtitle>
                          <v-card-text>
                            <div><lorem-ipsum add="60w" /></div>
                          </v-card-text>
                        </v-list-item-content>
                      </v-list-item>
                      <v-card-actions class="ml-2">
                        <v-btn
                          rounded
                          color="#EB5757"
                          @click="playMusic(result)"
                        >
                          Reproducir
                        </v-btn>
                        <v-btn rounded color="#EB5757"> Seguir </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2 class="ml-5 pl-5" style="color: #e86060">Resultados</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="result in results" :key="result.id">
          <v-card class="mx-auto" max-width="300px">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="result.album.cover_medium"
            >
            </v-img>

            <v-card-title v-text="result.title"> </v-card-title>
            <v-card-subtitle class="pb-0" v-text="result.artist.name">
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="#e86060" text @click="playMusic(result)">
                Reproducir
              </v-btn>
              <v-btn color="#e86060" text @click="addMusic(result)">
                Añadir a la lista
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { useSearchStore } from '@/store/SearchStore';
import { useMusicPlayerStore } from '@/store/MusicPlayerStore';
import { toRefs } from 'vue-demi';
import LoremIpsum from 'vue-lorem-ipsum';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Main',

  components: {
    LoremIpsum,
  },

  mounted() {
    this.setReproduct(this.$refs.reproductor);
    this.$nextTick(() => {
      setInterval(this.updateTime, 1000);
    });
  },

  setup() {
    const { addMusic, playMusic, setReproduct, updateTime } =
      useMusicPlayerStore();
    const { results, carouselResults } = toRefs(useSearchStore());
    return {
      results,
      carouselResults,
      addMusic,
      playMusic,
      setReproduct,
      updateTime,
    };
  },
};
</script>
