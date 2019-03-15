<template>
  <div class="game">
      <h4>No. {{ $store.getters.getGameCurrentInfo($route.params.id).num }}</h4>
      <h3>{{$route.params.id}}</h3>
      <h2 :style="{color: getColor($store.getters.getGameCurrentInfo($route.params.id).close_timestamp - $store.state.servertime)}">{{ countdown($store.getters.getGameCurrentInfo($route.params.id).close_timestamp - $store.state.servertime) }}</h2>
      <h3>{{$store.state.servertime}}</h3>
  </div>
</template>

<script>
import store from '../store.ts';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      
    }
  },
  methods: {
    countdown(timeleft) {
      let time = timeleft;
      let hr = this.addzero(Math.floor(time / 3600)) < 0 ? '00' : this.addzero(Math.floor(time / 3600));
      let min = this.addzero(Math.floor((time % 3600) / 60)) < 0 ? '00' : this.addzero(Math.floor((time % 3600) / 60));
      let sec = this.addzero(Math.floor(time % 60)) < 0 ? '00' : this.addzero(Math.floor(time % 60));
      return `${hr}:${min}:${sec}`;
    },
    addzero(i) {
      return i < 10 && i >= 0 ? `0${i}` : i;
    },
    getColor(timeleft) {
      if (timeleft > 10)
      {
        return 'green';
      }
      else if (timeleft <= 10 && timeleft > 0)
      {
        return 'red';
      }
      else
      {
        return 'gray';
      }
    },
  },
  // computed: {
  //   ...mapState([
  //     'servertime',
  //     'getlobby',
  //   ])
  // },
  mounted() {
    store.dispatch('getlobby');
    store.dispatch('servertime');
    this.lobby = setInterval(() => {store.dispatch('getlobby')}, 10000);
    this.server = setInterval(() => {store.dispatch('servertime')}, 1000);
  },
  beforeDestroy() {
    clearInterval(this.lobby);
    clearInterval(this.server);
  },
}
</script>

