import {Item} from './Item';

export class OrderDto {
   id: number;

  userId: number;

   quantity: number;

   orderCode: string;

  itemName: string;

   item: Item;

  orderStatus: string;

  expenditure: number;
}
