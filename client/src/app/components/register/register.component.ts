import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/users';
import { UserService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  loading: boolean = false;
  visible1:boolean = true;
  visible2:boolean = true;

  constructor(private toastr: ToastrService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  addUser() {
    if (this.username == '' || this.email == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error('Debe rellenar todos los campos', 'Error :')
      return;
    }

    if (this.password != this.confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error :')
      return;
    }

    const user: User = {
      username: this.username,
      email: this.email.toLowerCase(),
      password: this.password
    }

    this.loading = true;

    this.userService.signIn(user).subscribe({
      next: (data) => {
        this.router.navigate(['/login'])
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
        this.toastr.success('Usuario registrado con exito', 'Succes :')
      },
    });
  }

  togglePassword(){
    if (this.visible1){
      this.visible1 = false;
    }else {
      this.visible1 = true;
    }

    if (this.visible2){
      this.visible2 = false;
    }else {
      this.visible2 = true;
    }
  }

}
