import {UserType} from '../../../../@core/userType';
import {TransactionType} from "../../../../@core/TransactionType";

export class Message {
  id: number;
  fromRole: number;
  toRole: UserType;
  toId: number;
  fromId: number;
  message: string;
  status: any;
  date: Date;
  transactionType: TransactionType;
  itemName: string;
  transactionAmount: number;

}
