import axios from 'axios';
import qs from 'qs';
import IOrderService from './IOrderService';

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export default class OrderService {
  constructor (ios: any){
    ios = axios;
  }
  postOrder(order:IOrderService) {
    axios
      .post(
        'http://lt.vir999.net/pt/mem/ajax/shoppingcart/order.json?timestamp=1552273833448',
        qs.stringify(order),
        config,
      )
      .then((response) => {
        alert('投注成功');
      })
      .catch((error) => {
        alert('投注失敗');
      });
  }
}
