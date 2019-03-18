<template>
  <div class="game">
      <h4>No. {{ $store.getters.getGameCurrentInfo($route.params.id).num }}</h4>
      <h3>{{$route.params.id}}</h3>
      <h2 :style="{color: getColor($store.getters.getGameCurrentInfo($route.params.id).close_timestamp - $store.state.servertime)}">{{ countdown($store.getters.getGameCurrentInfo($route.params.id).close_timestamp - $store.state.servertime) }}</h2>
      <h3>{{$store.state.servertime}}</h3>
      <div class="items">
        <button v-for="(odd, index) in $store.state.ret.odds" :key="index" :class="choose.includes(index) ? 'active' : ''" @click="confirm(index, odd)">{{index}} {{odd}}</button>
      </div>
      每注：<input v-model.number="money" type="number">
      <br>
      <div class="orderNum">投注數：{{orderNum}}</div>
      <button @click="addOrder">添加至注單</button>
      <div class="orderList" v-if="isShow" v-for="(order, index) in orderList" :key="index">
        投注項目：{{order}}
        <button @click="cancel">X</button>
      </div>
      <!-- <button @click="sendOrder">投注</button> -->
  </div>
</template>

<script>
import store from '../store.ts';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      orderNum: 0,
      money: 0,
      isActive: false,
      choose: [],
      odds: [],
      isShow: false,
      orderList: [],
    }
  },
  created() {
    
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
    confirm(i, odd) {
      const key = this.choose.indexOf(i);
      console.log(key);
      if(key > -1) {
        this.choose.splice(key, 1);
        this.odds.splice(key, 1);
      }else {
        this.choose.push(i);
        this.odds.push(odd);
      }
      this.orderNum = this.choose.length;
    },
    cancel() {
      
    },
    addOrder() {
      const order = [this.choose, this.odds, this.money];
      this.orderList.push(order);
      if(this.money <= 0) {
        window.alert("請輸入正確金額");
        this.isShow = false;
      }else if(this.orderNum <= 0) {
        window.alert("請選擇投注項目");
        this.isShow = false;
      }else{
        this.isShow = true;
        this.orderNum = 0;
        this.choose = [];
        this.odds = [];
      }
    },
    delete() {

    },
    // generateOrder() {
    //   const order = [];
    //   order.push({
    //     choose: index,
    //     odds: { [index]: this.odd},

    //   })
    // },
  },
  mounted() {
    store.dispatch('getlobby');
    store.dispatch('servertime');
    store.dispatch('getOdds');
    this.lobby = setInterval(() => {store.dispatch('getlobby')}, 10000);
    this.server = setInterval(() => {store.dispatch('servertime')}, 1000);
  },
  beforeDestroy() {
    clearInterval(this.lobby);
    clearInterval(this.server);
  },
}
</script>

<style lang="scss">
  .game{
    .items{
      .active{
        border:3px solid #fa0;
      }
      button{
        width: 130px;
        height: 50px;
        background-color: #ccc;
        margin: 0 10px;
      }
    }
  }
</style>

