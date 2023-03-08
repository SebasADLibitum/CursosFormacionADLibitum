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

  public addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.myAppUrl}${this.myApiUrlTeachers}`, teacher);
  }

  public updateTeacher(id: string, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.myAppUrl}${this.myApiUrlTeachers}/${id}`, teacher);
  }

  deleteteacher(id: number): Observable<Teacher> {
    return this.http.delete<Teacher>(`${this.myAppUrl}${this.myApiUrlTeachers}/${id}`);
  }
}
