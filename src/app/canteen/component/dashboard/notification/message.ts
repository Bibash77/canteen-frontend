import {UserType} from '../../../../@core/userType';

export class Message {
  id: number;
  fromRole: number;
  toRole: UserType;
  toId: number;
  fromId: number;
  message: string;
  status: any;
  date: Date;
  actionType: string;
  itemName: string;
  orderCode: string;
  transactionAmount: number;
  quantity: number;
  isSeen: boolean;

}
