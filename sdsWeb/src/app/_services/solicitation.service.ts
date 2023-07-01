import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Solicitation} from '../model/solicitation.model';
import {AppConstants} from '../common/app.constants';
import {Observable, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Page} from '../model/page.model';
import {SolicitationRequest} from '../model/SolicitationRequest';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SolicitationService {

  private baseUrl = AppConstants.SOLICITATION_URL;

  constructor(private https: HttpClient,
              private _snack: MatSnackBar) {
  }

  listAll(page: number, size: number): Observable<Page<Solicitation>> {
    return this.https.get<Page<Solicitation>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  listAllWithStatusTrue(page: number, size: number): Observable<Page<Solicitation>> {
    return this.https.get<Page<Solicitation>>(`${this.baseUrl}/status/true`);
  }

  findById(id: string): Observable<Solicitation | null> {
    const url = `${this.baseUrl}/${id}`;
    return this.https.get<Solicitation>(url).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }),
      map(res => res || null) // adiciona a verificação para retornar null se res estiver vazio ou null
    );
  }

  getSolicitationsByServiceId(serviceId: any): Observable<Solicitation[]> {
    return this.https.get<Solicitation[]>(`/api/solicitations?serviceId=${serviceId}`);
  }

  requestService(userId: any, serviceId: any): Observable<string> {
    const url = `${this.baseUrl}/request?userId=${userId}&serviceId=${serviceId}`;
    return this.https.post<string>(url, null);
  }

  createSolicitation(userId: number, serviceId: number): Observable<Solicitation> {
    const request: SolicitationRequest = {
      userId,
      serviceId,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    };

    return this.saveSolicitation(request);
  }


  // createSolicitation(userId: number, serviceId: number): Observable<Solicitation> {
  //   const request: SolicitationRequest = {
  //     userId,
  //     serviceId,
  //     date: new Date().toISOString().split('T')[0],
  //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //   };
  //
  //   return this.checkIfSolicitationExists(userId, serviceId).pipe(
  //     switchMap(exists => {
  //       if (exists) {
  //         // Já existe uma solicitação para o usuário e serviço selecionados
  //         return throwError('Já existe uma solicitação para este serviço.');
  //       } else {
  //         // Nenhuma solicitação encontrada, pode prosseguir com a criação da solicitação
  //         return this.saveSolicitation(request);
  //       }
  //     })
  //   );
  // }

  // checkIfSolicitationExists(userId: number, serviceId: number): Observable<boolean> {
  //   return this.http.get<boolean>(`${this.baseUrl}/check-solicitation?userId=${userId}&serviceId=${serviceId}`);
  // }

  saveSolicitation(request: SolicitationRequest): Observable<Solicitation> {
    const url = `${this.baseUrl}/request?userId=${request.userId}&serviceId=${request.serviceId}`;

    return this.https.post<Solicitation>(url, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.message === 'Você já fez uma solicitação para este serviço') {
          return throwError('Já foi feita uma solicitação para este serviço.');
        } else {
          return throwError('Ocorreu um erro ao criar a solicitação.');
        }
      })
    );
  }


  getStatus(solicitation: Solicitation): Observable<any> {
    return this.https.patch(`${this.baseUrl}/${solicitation.id}/status`, null);
  }

  openSnackBar(message: string, action: string): void {
    this._snack.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  // delete(id: any, solicitation: Solicitation): Observable<any> {
  //   return;
  // }

  delete(id: string, data: any): Observable<any> {
    data.price = +data.price;
    const url = `${this.baseUrl}/admin/${id}`;
    return this.https.delete(url, data).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }

}
