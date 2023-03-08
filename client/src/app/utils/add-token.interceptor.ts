import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {


  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token')

    if(token){
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401){
          if (err.error.text){
            this.toastr.error(err.error.text, 'Error :')
          }else{
            this.toastr.error('Upps, ha ocurrido un error con el servidor.\n Por favor, pongase en contacto con el administrador.', 'Error :')
          }
          this.router.navigate(['/login'])
        }

        return throwError(()=> err)
      })
    );
  }
}
