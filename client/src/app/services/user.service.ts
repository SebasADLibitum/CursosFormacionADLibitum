import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private myAppUrl: string;
  private myApiUrlUsers: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000';
    this.myApiUrlUsers = '/api/users';
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrlUsers}`)
  }

  getCourse(id: number): Observable<User> {
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrlUsers}/${id}`);
  }

  public addCourse(user: User): Observable<User> {
    return this.http.post<User>(`${this.myAppUrl}${this.myApiUrlUsers}`, user);
  }

  public updateCourse(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.myAppUrl}${this.myApiUrlUsers}/${id}`, user);
  }

  deleteCourse(id: number): Observable<User> {
    return this.http.delete<User>(`${this.myAppUrl}${this.myApiUrlUsers}/${id}`);
  }
}
