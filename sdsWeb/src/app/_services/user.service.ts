import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppConstants} from '../common/app.constants';
import {Page} from '../model/page.model';
import {User} from '../model/user.model';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = AppConstants.API_URL;

  constructor(private http: HttpClient,
              private snack: MatSnackBar) {
  }

  getPublicContent(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'all', {responseType: 'text'});
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user', {responseType: 'text'});
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'mod', {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'admin', {responseType: 'text'});
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user/me', httpOptions);
  }

  listAll(page: number, size: number): Observable<Page<User>> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));
    return this.http.get<Page<User>>(`${this.baseUrl}`, {params});
  }


  findById(id: any): Observable<User | null> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get<User>(url).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      }),
      map(res => res || null) // adiciona a verificação para retornar null se res estiver vazio ou null
    );
  }

  update(id: string, data: any): Observable<any> {
    data.price = +data.price;
    const url = `${this.baseUrl}${id}`;
    return this.http.put(url, data).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  delete(id: string, data: any): Observable<any> {
    data.price = +data.price;
    const url = `${this.baseUrl}${id}`;
    return this.http.delete(url, data).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }

  message(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }

  messageSuccess(str: string): void {
    this.snack.open(`${str}`, 'OK', {
      duration: 3000
    });
  }

}
