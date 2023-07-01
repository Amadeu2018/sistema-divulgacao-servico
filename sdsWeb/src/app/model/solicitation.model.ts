import {Servicing} from './servicing.model';
import {User} from './user.model';

export class Solicitation {
  id?: any;
  date?: any;
  hour?: string;
  userId?: any;
  serviceId?: any;
  status?: boolean;
  user?: User;
  // user?: {
  //   displayName?: string;
  // };
  // service?: {
  //   name?: string;
  //   description?: string;
  // };
  service?: Servicing;

  constructor(obj?: any) {
    this.id = obj?.id || null;
    this.date = obj?.date || null;
    this.hour = obj?.hour || null;
    this.userId = obj?.userId || null;
    this.serviceId = obj?.serviceId || null;
    this.status = obj?.status || null;
    this.user = obj?.user || null;
    this.service = obj?.service || null;
  }
}
