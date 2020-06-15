export enum TransactionType {
  ORDER = 'ORDER',
  TOPUP = 'TOPUP',
  CANCEL = 'CANCEL'
}
// tslint:disable-next-line:no-namespace
export namespace TransactionType {

  export function values() {
    return Object.keys(TransactionType).filter(
      (type) => isNaN(type as any) && type !== 'values'
    );
  }
}
