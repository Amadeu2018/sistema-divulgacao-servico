import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppConstants} from '../common/app.constants';
import {Servicing} from '../model/servicing.model';
import {map, catchError} from 'rxjs/operators';
import {ServicingPage} from '../model/servicingPage';
import {Solicitation} from '../model/solicitation.model';



@Injectable({
  providedIn: 'root'
})
export class ServicingService {
  static  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpOptions = ServicingService.httpOptions;
  private baseUrl = AppConstants.SERVICE_URL;

  constructor(private https: HttpClient) {
  }

  getServicingContent(): Observable<any> {
    return this.https.get(AppConstants.SERVICE_URL + 'all', {responseType: 'text'});
  }

  // getServicings(): Observable<Servicing[]> {
  //   return this.https.get<Servicing[]>(`${this.baseUrl}/services`);
  // }

  findPageable(page, size): Observable<ServicingPage> {
    console.log(page, size);
    const params = new HttpParams().set('page', page).set('size', size);
    return this.https.get<any>(`${this.baseUrl}?${params.toString()}`);
  }

  listAll(): Observable<Servicing[]> {
    return this.https.get<any>(`${this.baseUrl}`)
      .pipe(
        map(response => response.content)
      );
  }


  findById(id: string): Observable<Servicing | null> {
    const url = `${this.baseUrl}/${id}`;
    return this.https.get<Servicing>(url).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }),
      map(res => res || null) // adiciona a verificação para retornar null se res estiver vazio ou null
    );
  }

  save(servicing: Servicing): Observable<Servicing> {
    // const url = 'http://localhost:8080/servicings';
    const url = `${this.baseUrl}`;
    return this.https.post<Servicing>(url, servicing)
      .pipe(
        catchError(error => {
          console.error('Error creating servicing', error);
          throw error;
        })
      );
  }

  update(id: string, data: any): Observable<any> {
    data.price = +data.price;
    const url = `${this.baseUrl}/${id}`;
    return this.https.put(url, data).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }

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

  upload(servicing: Servicing, formData: FormData): Observable<any> {
    return this.https.put(`${this.baseUrl}/${servicing.id}/img`, formData, {
      responseType: 'blob',
    });
  }


  // search(q: string): Observable<Servicing[]> {
  //   if (!q || q === '*') {
  //     q = '';
  //   } else {
  //     q = q.toLowerCase();
  //   }
  //   return this.findAll().pipe(
  //     map((data: Servicing[]) => data
  //       .filter((item: Servicing) => JSON.stringify(item).toLowerCase().includes(q)))
  //   );
  // }

  // soliciting(servicingId: any, solicitation: Solicitation): Observable<any> {
  //   solicitation.date = new Date(); // Define a data atual
  //   solicitation.hour = new Date().toLocaleTimeString(); // Define a hora atual
  //   solicitation.status = 'solicitado'; // Define o status padrão como 'solicitado'
  //   solicitation.service = servicingId; // Define o serviço com o ID passado como parâmetro
  //   solicitation.user = 'usuário logado'; // Substitua 'usuário logado' pelo usuário atualmente logado
  //
  //   return this.https.post(`${this.baseUrl}/service/${servicingId}/solicitations`, solicitation, ServicingService.httpOptions);
  // }



}
