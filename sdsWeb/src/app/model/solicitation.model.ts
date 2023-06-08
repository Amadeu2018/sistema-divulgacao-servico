export class Solicitation {
  id?: any;
  date?: any;
  hour?: string;
  status?: any;
  userId?: any;
  serviceId?: any;

  constructor(obj?: any) {
  this.id = obj?.id || null;
  this.date = obj?.date || null;
  this.hour = obj?.hour || null;
  this.status = obj?.status || null;
  this.userId = obj?.userId || null;
  this.serviceId = obj?.serviceId || null;
}
}
