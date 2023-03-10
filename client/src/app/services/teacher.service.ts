import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Teacher } from '../interfaces/teachers';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private myAppUrl: string;
  private myApiUrlTeachers: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000';
    this.myApiUrlTeachers = '/api/teachers';
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.myAppUrl}${this.myApiUrlTeachers}`)
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.myAppUrl}${this.myApiUrlTeachers}/${id}`);
  }

  addTeacher(teacher: Teacher): Observable<void> {
    console.log(teacher)
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrlTeachers}`, teacher);
  }

  updateTeacher(id: number, teacher: Teacher): Observable<void> {
    console.log(id)
    console.log(teacher)
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrlTeachers}/${id}`, teacher);
  }

  deleteteacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrlTeachers}/${id}`);
  }
}
