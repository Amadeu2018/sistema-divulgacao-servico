export class Roles {
  roleId?: any;
  name?: any;

  constructor(obj?: any) {
    this.roleId = obj?.roleId || null;
    this.name = obj?.name || null;
  }
}
