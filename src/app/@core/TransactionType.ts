export enum TransactionType {
  ORDER = 'ORDER',
  TOPUP = 'TOPUP',
  CANCEL = 'CANCEL'
}
export namespace TransactionType {

  export function values() {
    return Object.keys(TransactionType).filter(
      (type) => isNaN(type as any) && type !== 'values'
    );
  }
}
