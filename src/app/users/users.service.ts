import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { UserDetail } from '../model/user-detail';
import { AuthService } from '../auth/auth.service';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private store: Store<any>,
              private http: HttpClient,
              private authService: AuthService) { }

  public getUsersList(): Observable<UserDetail[]> {
    return this.authService.getAuthHeader().pipe<UserDetail[]>(mergeMap<any, Observable<any>>(headers => {
      return this.http.get<UserDetail[]>(`${environment.API_URL}users`, headers);
    }));
    // .pipe<UserDetail[]>(map(data => {
    //   console.log(data)
    //   return data;
    // }));
  }
}
