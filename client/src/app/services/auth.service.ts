import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrlUsers: string;
  private myApiUrlAuth: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000';
    this.myApiUrlUsers = '/api/users';
    this.myApiUrlAuth = '/api/auth';
  }

  signIn(user: User):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrlUsers}`, user);
  }

  signUp(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrlAuth}/login`, user);
  }

  getUsers(): Observable<any>{
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrlUsers}`);
  }

}
