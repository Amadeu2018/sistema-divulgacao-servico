import {Roles} from './roles';

export class User {
  id?: any;
  displayName?: any;
  email?: string;
  phone?: any;
  role?: any[];

  constructor(obj?: any) {
    this.id = obj?.id || null;
    this.displayName = obj?.displayName || null;
    this.email = obj?.email || null;
    this.phone = obj?.phone || null;
    this.role = obj?.role || null;
  }
}
