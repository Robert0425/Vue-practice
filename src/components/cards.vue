<template>
  <div class="cards">
    <div class="card">
      <h4>No. {{game_num}}</h4>
      <h3>{{game_name}}</h3>
      <h1 :class="{'green':isGreen,'red':isRed,'gray':isGray}">{{game_time}}</h1>
    </div>
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
      game_num: '',
      servertime: '',
      closeTime: '',
      game_time: '',
      game_name: 'BB 深海派對',
      isGreen: '',
      isRed: '',
      isGray: '',
    }
  },
  async mounted() {
    await this.getlobby();
    console.log('我做完了！換下一個人');
    this.timer = setInterval(this.countdown,1000);
  },
  methods: {
    async getlobby() {
      axios.defaults.withCredentials = true
      //current num
      console.log('我發送了！');
      await axios
        .get('http://lt.vir999.net/pt/mem/ajax/bb500/lobby?data=%5B%22game_info%22%5D&timestamp=1552370214906')
        .then(response => {
          console.log('我回來了！');
          // 旗號
          this.game_num = response.data.game.info.BBPT.current.num;
          // 伺服器時間
          this.servertime = response.data.server_time;
          //結束時間
          this.closeTime = response.data.game.info.BBPT.current.close_timestamp;
          //遊戲名稱
          // this.game_name = response.data.game.info;
        })
    },
    countdown() {
      this.servertime++;
      let timeleft = this.closeTime - this.servertime;
      const hr = Math.floor(timeleft / 3600);
      const min = Math.floor((timeleft % 3600) / 60);
      const sec = Math.floor(timeleft % 60);
      const h = this.addzero(hr);
      const m = this.addzero(min);
      const s = this.addzero(sec);
      this.game_time = `${h}:${m}:${s}`;
      if(timeleft <= 0){
        this.restart();
        this.isRed = false;
        this.isGray = true;
        this.game_time = `00:00:00`;
      }
      if(timeleft <= 10){
        this.isRed = true;
        this.isGreen = false;
      }
      if(timeleft > 10){
        this.isGray = false;
        this.isRed = false;
        this.isGreen = true;
      }
    },
    addzero(i) {
      return i < 10 ? `0${i}`:i;
    },
    restart() {
      this.getlobby();
    },
    destroyed() {
      clearInterval(this.timer);
    },
  },
};
</script>
<style lang='scss'>
  .cards{
    border:1px solid #ccc;
    border-radius:10px;
    margin: auto;
    width: 222px;
    height: 196px;
    .card{
      h4{
        color:#ccc;
      }
      .green{
        color:#0fa;
      }
      .red{
        color: red;
      }
      .gray{
        color:#777;
      }
    }
  }
</style>

