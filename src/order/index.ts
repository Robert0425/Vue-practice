import OrderService from "./OrderService";
import IOrderService from "./IOrderService";
 
const orderService: IOrderService = new OrderService('LDRS');

orderService.add({
  choose: 'ODD:END',
  odds: 1.97,
  tag: 'local',
  gold: 5,
  bets: 1
});

orderService.delete(1);

orderService.getChoose(1);

orderService.error();
