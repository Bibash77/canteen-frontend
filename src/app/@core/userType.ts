import {User} from '../canteen/component/modal/user';

export enum UserType {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  KITCHENER = 'KITCHENER'
}

export namespace UserType {

  export function values() {
    return Object.keys(UserType).filter(
      (type) => isNaN(type as any) && type !== 'values'
    );
  }
}
