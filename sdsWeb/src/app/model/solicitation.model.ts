export class Solicitation {
  id?: any;
  date?: string;
  hour?: string;
  status?: string;
  user?: any;
  service?: any;

  constructor(obj?: any) {
  this.id = obj?.id || null;
  this.date = obj?.date || null;
  this.hour = obj?.hour || null;
  this.status = obj?.status || null;
  this.user = obj?.user || null;
  this.service = obj?.service || null;
}
}
