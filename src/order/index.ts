import OrderService from "./OrderService";
import IOrderService from "./IOrderService";

const orderService: IOrderService = new OrderService();

orderService.add({
  choose: 'ODD:END',
  odds: {"ODD:END": 1.97},
  tag: 'main-page',
  gold: 5,
  bets: 1,
});

export var Service = orderService;
// orderService.delete(1);

// orderService.getChoose(1);

// orderService.error();
