import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TypeCourse } from '../interfaces/types-courses';

@Injectable({
  providedIn: 'root'
})
export class TypesCoursesService {

  private myAppUrl: string;
  private myApiUrlTypesCourses: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000';
    this.myApiUrlTypesCourses = '/api/types-courses';
  }

  getTypesCourses(): Observable<TypeCourse[]> {
    return this.http.get<TypeCourse[]>(`${this.myAppUrl}${this.myApiUrlTypesCourses}`)
  }
}
