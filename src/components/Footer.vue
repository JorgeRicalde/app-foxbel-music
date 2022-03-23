<template>
  <v-footer padless app>
    <v-card class="flex" flat tile>
      <v-progress-linear
        :value="timePorcentage"
        class="my-0"
        height="10"
      ></v-progress-linear>

      <v-list dark color="#EB5757">
        <v-list-item>
          <v-list-item-content v-if="music">
            <v-list-item-title
              v-text="`${music.title} - ${formatCurrentTime}/${formatMaxTime}`"
            >
            </v-list-item-title>
            <v-list-item-subtitle v-text="music.artist.name">
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content v-else>
            <v-list-item-title v-text="'Añada nueva musica para reproducir'">
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn icon @click="previousMusic">
              <v-icon>mdi-rewind</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon
            v-if="isPlay"
            :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }"
          >
            <v-btn icon @click="pause">
              <v-icon>mdi-pause</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-icon
            v-else
            :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }"
          >
            <v-btn icon @click="play">
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon
            class="ml-0"
            :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
          >
            <v-btn icon @click="nextMusic">
              <v-icon>mdi-fast-forward</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <v-slider
              :value="volume"
              hide-details
              max="100"
              step="5"
              min="0"
              append-icon="mdi-volume-high"
              @change="volumeChange"
            ></v-slider>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <audio ref="reproductor"></audio>
  </v-footer>
</template>

<script>
import { useMusicPlayerStore } from '@/store/MusicPlayerStore';
import { toRefs } from 'vue-demi';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',

  mounted() {
    this.setReproduct(this.$refs.reproductor);
    this.$nextTick(() => {
      setInterval(this.updateTime, 1000);
    });
  },

  setup() {
    const store = useMusicPlayerStore();
    const {
      music,
      isPlay,
      timePorcentage,
      volume,
      formatCurrentTime,
      formatMaxTime,
    } = toRefs(store);
    const {
      pause,
      play,
      nextMusic,
      previousMusic,
      setReproduct,
      volumeChange,
      updateTime,
    } = store;
    return {
      timePorcentage,
      music,
      isPlay,
      volume,
      formatCurrentTime,
      formatMaxTime,
      pause,
      play,
      nextMusic,
      previousMusic,
      setReproduct,
      volumeChange,
      updateTime,
    };
  },
};
</script>
