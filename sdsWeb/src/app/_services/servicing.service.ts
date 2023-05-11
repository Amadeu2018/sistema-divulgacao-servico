import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppConstants} from '../common/app.constants';
import {Servicing} from '../model/servicing.model';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicingService {

  private baseUrl = AppConstants.SERVICE_URL;

  constructor(private https: HttpClient) {
  }

  getServicingContent(): Observable<any> {
    return this.https.get(AppConstants.SERVICE_URL + 'all', {responseType: 'text'});
  }

  // getServicings(): Observable<Servicing[]> {
  //   return this.https.get<Servicing[]>(`${this.baseUrl}/services`);
  // }

  findAll(): Observable<Servicing> {
    const url = `${this.baseUrl}`;
    return this.https.get(url);
  }

  listAll(): Observable<Servicing[]> {
    return this.https.get<any>(`${this.baseUrl}`)
      .pipe(
        map(response => response.content)
      );
  }


  // findById(id: string): Observable<any> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.https.get(url);
  // }

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


  // create(servicing: Servicing, httpOptions: any): Observable<HttpEvent<Servicing>> {
  //   const url = `${this.baseUrl}`;
  //   return this.https.post<Servicing>(url, servicing, httpOptions);
  // }

  // create(servicing: Servicing, httpOptions: any): Observable<Servicing> {
  //   const url = `${this.baseUrl}`;
  //   return this.https.post<Servicing>(url, servicing, httpOptions);
  // }

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

}
