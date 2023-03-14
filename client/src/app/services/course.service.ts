import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private myAppUrl: string;
  private myApiUrlCourses: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000';
    this.myApiUrlCourses = '/api/courses';
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.myAppUrl}${this.myApiUrlCourses}`)
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.myAppUrl}${this.myApiUrlCourses}/${id}`);
  }

  addCourse(course: Course): Observable<void> {
    console.log('Estamos en course Service')
    console.log(course)
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrlCourses}`, course);
  }

  updateCourse(id: number, course: Course): Observable<void> {
    console.log(id)
    console.log(course)
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrlCourses}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrlCourses}/${id}`);
  }
}
