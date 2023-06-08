export class SolicitationRequest {
  serviceId: any;
  userId: any;
  date: any;
  time: any;

  constructor(obj?: any) {
    this.serviceId = obj?.serviceId || null;
    this.userId = obj?.userId || null;
    this.date = obj?.date || null;
    this.time = obj?.time || null;
  }
}
