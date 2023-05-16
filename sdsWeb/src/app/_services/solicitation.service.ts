import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Solicitation} from '../model/solicitation.model';
import {AppConstants} from '../common/app.constants';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitationService {

  private baseUrl = AppConstants.SOLICITATION_URL;

  constructor(private https: HttpClient) { }

  listAll(page: number, size: number): Observable<Page<Solicitation>> {
    // return this.https.get<Page<Solicitation>>(`${this.baseUrl}?page=${page}&size=${size}`);
    return this.https.get<Page<Solicitation>>(`${this.baseUrl}`);
  }

  createSolicitation(servicingId: number, solicitation: Solicitation): Observable<Solicitation> {
    return this.https.post<Solicitation>(`${this.baseUrl}/servicing/${servicingId}/solicitations`, solicitation);
  }

  soliciting(solicitation: Solicitation): Observable<any> {
    return this.https.patch(`${this.baseUrl}/${solicitation.id}/solicitations`, null);
  }

}
