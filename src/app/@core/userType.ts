export enum UserType {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  KITCHENER = 'KITCHENER'
}

// tslint:disable-next-line:no-namespace
export namespace UserType {

  export function values() {
    return Object.keys(UserType).filter(
      (type) => isNaN(type as any) && type !== 'values'
    );
  }
}
