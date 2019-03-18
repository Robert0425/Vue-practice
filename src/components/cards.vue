<template>
  <div class="cards">
    <h2>現在時間 : {{now}}</h2>
    <ul>
      <li v-for="(game, index) in games">
        <h4>No. {{game.current.num}}</h4>
        <h3>{{index}}</h3>
        <h3 :style="{color: getColor(game.current.close_timestamp - servertime)}">{{countdown(game.current.close_timestamp - servertime)}}</h3>
        <router-link :to="{name:'game', params:{id:index}}"><button class='btn'>遊戲連結</button></router-link>
        <router-view></router-view>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export default {
  data() {
    return {
      games: [],
      servertime: '',
      now: '',
    };
  },
  async mounted() {
    await this.getlobby();
    await setInterval(this.getlobby, 10000);
    console.log('我做完了！換下一個人');
    this.timer = setInterval(this.timeleft, 1000);
    setInterval(this.serverTime, 1000);
  },
  methods: {
    getlobby() {
      axios.defaults.withCredentials = true;
      //current num
      // console.log('我發送了！');
      axios
        .get('http://lt.vir999.net/pt/mem/ajax/bb500/lobby?data=%5B%22game_info%22%5D&timestamp=1552370214906')
        .then(response => {
          // console.log('我回來了！');
          //ALL
          this.games = response.data.game.info;
          // 伺服器時間
          this.servertime = response.data.server_time;
        });
    },
    timeleft() {
      this.servertime++;
    },
    countdown(timeleft) {
      let game_time;
      let time = timeleft;
      let hr = this.addzero(Math.floor(time / 3600)) < 0 ? '00' : this.addzero(Math.floor(time / 3600));
      let min = this.addzero(Math.floor((time % 3600) / 60)) < 0 ? '00' : this.addzero(Math.floor((time % 3600) / 60));
      let sec = this.addzero(Math.floor(time % 60)) < 0 ? '00' : this.addzero(Math.floor(time % 60));
      return game_time = `${hr}:${min}:${sec}`;
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
    serverTime() {
      const date = new Date(this.servertime * 1000);
      const y = date.getFullYear();
      const mo = this.addzero(date.getMonth() + 1);
      const d = this.addzero(date.getDate());
      const h = this.addzero(date.getHours());
      const m = this.addzero(date.getMinutes());
      const s = this.addzero(date.getSeconds());
      this.now = `${y}/${mo}/${d} ${h}:${m}:${s}`;
    },
    addzero(i) {
      return i < 10 && i >= 0 ? `0${i}` : i;
    },
  },
  destroyed() {
    clearInterval(this.timer);
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
