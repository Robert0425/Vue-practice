<template>
    <div>
      <button @click = 'postdata'>Post</button>
    </div>
</template>


<script lang = 'ts'>
import axios from 'axios';
import qs from 'qs';
import { Component, Vue } from 'vue-property-decorator';
import IOrderService from '../order/IOrderService';

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

// const send = new OrderService(axios);
@Component
export default class Order extends Vue {
  order: IOrderService = {
    game: 'LDDR',
    game_num: 201903110071,
    entrance: 7,
    platform: 0,
    portal: 0,
    client: 0,        
    orders: JSON.stringify([[{ "choose":"ODD:END", "odds":{"ODD:END":1.97}, "tag":"main-page", "gold":5,"bets":1 }]]),
  }
  //methods
  public postdata() {  
    axios
      .post(
        'http://lt.vir999.net/pt/mem/ajax/shoppingcart/order.json?timestamp=1552281905135',
        qs.stringify(this.order),
        config,
      )
      .then((response: any) => {
        alert('投注成功');
      })
      .catch((error: any) => {
        alert('投注失敗');
      })
  }  
};
</script>


// import axios from 'axios';
// import OrderService from '../order/OrderService';

// export default {
//   data() {
//     return {
//        order: {
//         game: 'LDDR',
//         game_num: 201903110030,
//         entrance: 7,
//         platform: 0,
//         portal: 0,
//         client: 0,
//         orders: JSON.stringify([[{ "choose":"ODD:END", "odds":{"ODD:END":1.97}, "tag":"main-page", "gold":5,"bets":1 }]]),
//       }
//     }
//   },
//   created() {
//     this.send = new OrderService(axios);
//   },
//   methods: {
//     postdata() {
//       this.send.postOrder(this.order);
//     }
//   },
// }
// </script>