<template>
  <div class="game">
      <h4>No. {{ $store.getters.getGameCurrentInfo($route.params.id).num }}</h4>
      <h3 class="gameName">{{$route.params.id}}</h3>
      <h2 id="gametime" :style="{color: getColor($store.getters.getGameCurrentInfo($route.params.id).close_timestamp - $store.state.servertime)}">{{ countdown($store.getters.getGameCurrentInfo($route.params.id).close_timestamp - $store.state.servertime) }}</h2>
      <h3>{{$store.state.servertime}}</h3>
      <div class="items" id="items">
        <button v-for="(odd, index) in $store.state.ret.odds" :key="index" :class="choose.includes(index) ? 'active' : ''" @click="confirm(index, odd)">{{index}} {{odd}}</button>
      </div>
      每注：<input v-model.number="money" type="number" id="money">
      <br>
      <div class="orderNum">投注數：{{orderNum}}</div>
      <button @click="addOrder" id="addOrder">添加至注單</button>
      <div class="orderList" v-for="(order, index) in orderList" :key="index">
        投注項目：{{order}}
        <button @click="cancel(index)" class="delete" >X</button>
      </div>
      <div class="allNum">總注數：{{allNum}}</div>
      <div class="allMoney">總下注金額：{{allMoney}}</div>
      <button @click="cancelAll" id="clear">全部清除</button>
      <button @click="sendOrder" id="betting" :disabled="isbet">投注</button>
  </div>
</template>

<script>
import store from '../store.ts';
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import OrderAxios from '../order/OrderAxios';

export default {
  data() {
    return {
      orderNum: 0,
      money: 0,
      isActive: false,
      choose: [],
      odds: [],
      orderList: [],
      allNum: null,
      allMoney: null,
      isbet: true,
    }
  },
  created() {
    this.orderAxios = new OrderAxios(axios);
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
      //已經選擇
      if(key > -1) {
        this.choose.splice(key, 1);
        this.odds.splice(key, 1);
      //選擇
      }else {
        this.choose.push(i);
        this.odds.push(odd);
      }
      this.orderNum = this.choose.length;
    },
    cancel(index) {
      this.allNum = this.allNum - this.orderList[index][0].length;
      this.allMoney = this.allMoney - this.orderList[index][2] * this.orderList[index][0].length;
      this.orderList.splice(index, 1);
      if(this.orderList = []){
        this.isbet = true;
      }
    },
    cancelAll() {
      this.orderList = [];
      this.isbet = true;
      this.allNum = null;
      this.allMoney = null;
    },
    addOrder() {
      if(this.money <= 0) {
        window.alert("請輸入正確金額");
      }else if(this.orderNum <= 0) {
        window.alert("請選擇投注項目");
      }else{
        const order = [this.choose, this.odds, this.money];
        this.allMoney = this.allMoney + order[2]*this.orderNum;
        this.allNum = this.allNum + this.orderNum;
        this.orderList.push(order);
        this.isbet = false;
        this.orderNum = 0;
        this.choose = [];
        this.odds = [];
      }
    },
    produceOrder() {
      const orders = [];
      this.orderList.forEach((order) => {
        order[0].forEach((item) => {
          orders.push({
            choose: item,
            odds: { [item]: store.state.ret.odds[item] },
            tag: 'main-page',
            gold: order[2],
            bets: 1,
          });
        });
      });
      return {
        game: 'LDRS',
        game_num: store.getters.getGameCurrentInfo('LDRS').num,
        entrance: 7,
        platform: 0,
        portal: 0,
        client: 0,
        orders: JSON.stringify([orders]),
      };
    },
    sendOrder() {
      const order = this.produceOrder();
      this.orderAxios.postOrder(order);
      this.orderList = [];
      this.allNum = null;
      this.allMoney = null;
      this.isbet = true;
    }
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

