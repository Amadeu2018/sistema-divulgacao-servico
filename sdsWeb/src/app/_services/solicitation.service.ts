import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Solicitation} from '../model/solicitation.model';
import {AppConstants} from '../common/app.constants';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Page } from '../model/page.model';
import {SolicitationRequest} from '../model/SolicitationRequest';


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

  getSolicitationsByServiceId(serviceId: any): Observable<Solicitation[]> {
    return this.https.get<Solicitation[]>(`/api/solicitations?serviceId=${serviceId}`);
  }


  // createSolicitation(request: SolicitationRequest): Observable<Solicitation> {
  //   return this.https.post<Solicitation>(this.baseUrl, request);
  // }

  createSolicitation(userId: any, serviceId: any): Observable<Solicitation> {
    const request: SolicitationRequest = {
      serviceId,
      userId,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    return this.https.post<Solicitation>(`${this.baseUrl}/request?userId=${userId}&serviceId=${serviceId}`, request);
  }

  getStatus(solicitation: Solicitation): Observable<any> {
    return this.https.patch(`${this.baseUrl}/${solicitation.id}/status`, null);
  }


}
