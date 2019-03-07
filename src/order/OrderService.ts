import IOrderService from './IOrderService';
import IOrder from './IOrder';

export default class OrderService implements IOrderService {
  game: string;
  game_num: number = 201331313;
  entrance: number = 7;
  platform: number = 0;
  portal: number = 0;
  client: number = 0;
  orders: IOrder[] = [];
  constructor(game: string) {
    this.game = game
  }
  add(order: IOrder): number{
    return 1;
  }
  delete(index: number): void{}
  getChoose(index: number): string{
    return 'GG';
  }
  error() {
    return 'error';
  }
}