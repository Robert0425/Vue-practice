<template>
  <div class="order">
    <button @click="postdata">Post</button>
  </div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'
import axios from 'axios';
import Qs from 'qs';
import OrderService from '@/order/IOrderService';

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export default{
  data() {
    return {
      order: {
        game: 'LDRS',
        game_num: 20190308029,
        entrance: 7,
        platform: 0,
        portal: 0,
        client: 0,
        orders: JSON.stringify([[{"choose":"ODD:END","odds":{"ODD:END":1.97},"tag":"main-page","gold":5,"bets":1}]]),
      },
    };
  },
  created() {
    this.order = new OrderService();
  },
  methods: {
    postdata() {
      
      axios
        .post(
          'http://lt.vir999.net/pt/mem/ajax/shoppingcart/order.json?timestamp=1552025800926',
          Qs.stringify(this.data),
          config,
        )
        .then((response) => {
          alert('投注成功');
        })
        .catch((error) => {
          alert('投注失敗');
        });
    },
  },  
};
</script>
