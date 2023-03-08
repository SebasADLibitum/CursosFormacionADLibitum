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

  public addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.myAppUrl}${this.myApiUrlCourses}`, course);
  }

  public updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.myAppUrl}${this.myApiUrlCourses}/${id}`, course);
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.myAppUrl}${this.myApiUrlCourses}/${id}`);
  }
}
