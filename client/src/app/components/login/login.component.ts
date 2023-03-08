import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/users';
import { UserService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  visible:boolean = true;

  username: string = '';
  password: string = '';

  constructor(private toastr: ToastrService, private userService: UserService,  private router: Router){}

  ngOnInit(): void{}

  login(){
    if (this.username == '' || this.password == ''){
      this.toastr.error('Debe rellenar todos los campos', 'Error :')
      return
    }

    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true;

    this.userService.signUp(user).subscribe({
      next: (data) => {
        this.router.navigate(['/dashboard'])
        localStorage.setItem('token', data)
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.text){
          this.toastr.error(err.error.text, 'Error :')
        }else{
          this.toastr.error('Upps, ha ocurrido un error con el servidor.\n Por favor, pongase en contacto con el administrador.', 'Error :')
        }
        this.loading = false;
        console.log(err)
      },
      complete: () => {
        this.loading = false;
        this.toastr.success('Inicio de sesion completado con exito', 'Succes :')
      }
    })
  }

  togglePassword(){
    if (this.visible){
      this.visible = false;
      this.toastr.error(`${this.visible}`, 'Error :')

    }else {
      this.visible = true;
      this.toastr.error(`${this.visible}`, 'Error :')

    }
  }

}
