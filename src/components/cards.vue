<template>
  <div class="cards">
    <h2 class="nowTime">現在時間 : {{serverTime($store.state.servertime)}}</h2>
    <ul>
      <li v-for="(game, index) in $store.state.games" :key="index">
        <h4>No. {{game.current.num}}</h4>
        <h3>{{index}}</h3>
        <h3 :style="{color: getColor(game.current.close_timestamp - $store.state.servertime)}">{{countdown(game.current.close_timestamp - $store.state.servertime)}}</h3>
        <router-link :to="{name:'game', params:{id:index}}"><button class='btn'>遊戲連結</button></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../store.ts';

export default {
  data() {
    return {
      
    };
  },
  mounted() {
    store.dispatch('getlobby');
    store.dispatch('servertime');
    store.dispatch('getOdds');
    this.lobby = setInterval(() => {store.dispatch('getlobby')}, 10000);
    this.server = setInterval(() => {store.dispatch('servertime')}, 1000);
  },
  methods: {
    countdown(timeleft) {
      let game_time;
      let time = timeleft;
      let hr = this.addzero(Math.floor(time / 3600)) < 0 ? '00' : this.addzero(Math.floor(time / 3600));
      let min = this.addzero(Math.floor((time % 3600) / 60)) < 0 ? '00' : this.addzero(Math.floor((time % 3600) / 60));
      let sec = this.addzero(Math.floor(time % 60)) < 0 ? '00' : this.addzero(Math.floor(time % 60));
      return `${hr}:${min}:${sec}`;
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
    serverTime(now) {
      const date = new Date(now * 1000);
      const y = date.getFullYear();
      const mo = this.addzero(date.getMonth() + 1);
      const d = this.addzero(date.getDate());
      const h = this.addzero(date.getHours());
      const m = this.addzero(date.getMinutes());
      const s = this.addzero(date.getSeconds());
      return `${y}/${mo}/${d} ${h}:${m}:${s}`;
    },
    addzero(i) {
      return i < 10 && i >= 0 ? `0${i}` : i;
    },
  },
  destroyed() {
    clearInterval(this.lobby);
    clearInterval(this.server);
  },
};
</script>
<style lang='scss'>
  .cards{
    h2{
      white-space: nowrap;
      color:#cdbc9d;
    }
    ul{
      display:flex;
      flex-wrap:wrap;
      list-style:none;
      li{
        h4{
          color:#bbb;
        }
        h3{
          color:#007979;
        }
        border:1px solid #ccc;
        border-radius:10px;
        width: 222px;
        height: 196px;
        padding-left:20px;
        text-align: left;
      }
      .btn{
        width: 100px;
        height: 30px;
        background-color:#cdbc9d;
        position: relative;
        bottom: 10px;
        font-size:17px;
        color:#555;
      }
    }
  }
</style>
