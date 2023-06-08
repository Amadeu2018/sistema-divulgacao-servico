import {Solicitation} from './solicitation.model';

export class Servicing {
  id?: any;
  name?: string;
  description?: string;
  price?: any;
  images?: any;
  photo?: any;
  solicitations?: any[];
  solicitationStatus?: Solicitation;
  buttonProperties?: {
    color: string;
    text: string;
  };
  // dateRegistration?: string;

  constructor(obj?: any) {
    this.id = obj?.id || null;
    this.name = obj?.name || null;
    this.description = obj?.description || null;
    this.price = obj?.price || null;
    this.images = obj?.images || null;
    this.photo = obj?.photo || null;
    this.solicitations = obj?.solicitations || null;
    this.solicitationStatus = obj?.solicitationStatus || { status: null }; // Adicione esta linha
  }

}
