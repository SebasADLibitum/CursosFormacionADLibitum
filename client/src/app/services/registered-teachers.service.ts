import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { RegisteredTeacher } from '../interfaces/registered-teachers';

@Injectable({
  providedIn: 'root'
})
export class RegisteredTeachersService {

  private myAppUrl: string;
  private myApiUrlRegisteredTeachers: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000';
    this.myApiUrlRegisteredTeachers = '/api/registered-teachers';
  }

  getRegisteredTeachers(): Observable<RegisteredTeacher[]> {
    return this.http.get<RegisteredTeacher[]>(`${this.myAppUrl}${this.myApiUrlRegisteredTeachers}`)
  }
}
