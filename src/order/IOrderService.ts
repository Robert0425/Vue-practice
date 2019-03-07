import IOrder from './IOrder';

export default interface IOrderService {
  game: string;
  game_num: number;
  entrance: number;
  platform: number;
  portal: number;
  client: number;
  orders: IOrder[];
  add(order: IOrder): number;
  delete(index: number): void;
  getChoose(index: number): string;
  error(): string;
}