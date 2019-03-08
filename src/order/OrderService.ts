import IOrderService from './IOrderService';
import IOrder from './IOrder';

export default class OrderService implements IOrderService {
  game: string = 'LDRS';
  game_num: number = 20190307046;
  entrance: number = 7;
  platform: number = 0;
  portal: number = 0;
  client: number = 0;
  orders: IOrder[] = JSON.stringify([[{"choose":"ODD:END","odds":{"ODD:END":1.97},"tag":"main-page","gold":5,"bets":1}]]);
  // constructor(game: string) {
  //   this.game = game
  // }
  add(order: IOrder): string{
    return 'Success add';
  }
  // delete(index: number): string{
  //   return 'Success delete';
  // }
  // getChoose(index: number): string{
  //   return 'GG';
  // }
  // error() {
  //   return 'error';
  // }
}

