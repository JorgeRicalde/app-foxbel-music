import { defineStore } from 'pinia';

const formatTime = (time) => {
  let it = parseInt(time);
  let m = parseInt(it / 60);
  let s = parseInt(it % 60);
  return (
    (m < 10 ? '0' : '') +
    parseInt(it / 60) +
    ':' +
    (s < 10 ? '0' : '') +
    parseInt(it % 60)
  );
};

export const useMusicPlayerStore = defineStore('musicPlayer', {
  state: () => ({
    isPlay: false,
    currentTime: 0,
    maxTime: 0,
    volume: 20,
    musicIndex: 0,
    reproduct: null,
    musicList: [],
  }),
  getters: {
    music: (state) => state.musicList[state.musicIndex],
    formatCurrentTime: (state) => formatTime(state.currentTime),
    formatMaxTime: (state) => formatTime(state.maxTime),
    timePorcentage: (state) => (state.currentTime / state.maxTime) * 100,
    musicCount: (state) => state.musicList.length,
  },
  actions: {
    setReproduct(value) {
      this.reproduct = value;
      this.volumeChange(this.volume);
    },
    updateTime() {
      if (!this.reproduct) {
        return;
      }
      if (this.reproduct.readyState) {
        this.maxTime = this.reproduct.duration;
      }
      this.isPlay = !this.reproduct.paused;
      this.currentTime = this.reproduct.currentTime;
      if (this.maxTime == this.currentTime) this.nextMusic();
    },
    pause() {
      this.reproduct?.pause();
      this.isPlay = false;
    },
    play() {
      if (!this.reproduct || !this.music) {
        return;
      }
      if (!this.isPlay && this.musicIndex < this.musicList.length) {
        this.reproduct.src = this.music.preview;
      }
      this.reproduct.play();
      this.isPlay = true;
    },
    addMusic(value) {
      this.musicList.push(value);
    },
    playMusic(value) {
      if (this.isPlay) this.pause();
      this.musicList = [];
      this.musicList.push(value);
      this.musicIndex = 0;
      this.play();
    },
    nextMusic() {
      if (this.musicIndex < this.musicList.length) {
        this.pause();
        this.musicIndex++;
        this.play();
      }
    },
    previousMusic() {
      if (this.musicIndex >= 0) {
        this.pause();
        this.musicIndex--;
        this.play();
      }
    },
    clearList() {
      this.musicList = [];
    },
    volumeChange(value) {
      if (this.reproduct) {
        this.volume = value;
        this.reproduct.volume = value / 100;
      }
    },
  },
});
