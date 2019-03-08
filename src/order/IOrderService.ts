import IOrder from './IOrder';

export default interface IOrderService {
  game: string;
  game_num: number;
  entrance: number;
  platform: number;
  portal: number;
  client: number;
  orders: string;
  add(order: IOrder): string;
  // delete(index: number): string;
  // getChoose(index: number): string;
  // error(): string;
}