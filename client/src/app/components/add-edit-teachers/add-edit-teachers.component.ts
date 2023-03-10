import { Component, Input, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/interfaces/teachers';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-edit-teachers',
  templateUrl: './add-edit-teachers.component.html',
  styleUrls: ['./add-edit-teachers.component.css']
})
export class AddEditTeachersComponent implements OnInit {

  loading: boolean = false;
  modo: string = 'Añadir nuevo usuario';
  @Input() item: any;
  @Input() rowData: any;
  teacher: Teacher = {
    idpersona: 0,
    nombre: '',
    dni: '',
    fecha_nacimiento: new Date,
    ciudad: '',
    provincia: '',
    pais: '',
    cp: '',
    direccion: '',
    telefono1: '',
    email: ''
  };

  constructor(private teacherService: TeacherService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {


  }

  addUser() {

    if (this.teacher.nombre == '' || this.teacher.dni == '' || this.teacher.ciudad == '' || this.teacher.provincia == '' || this.teacher.cp == '' || this.teacher.direccion == '' || this.teacher.telefono1 == '' || this.teacher.email == '') {
      this.toastr.error('Debe rellenar todos los campos', 'Error :')

    } else {

      if (!this.validarDni(this.teacher.dni)) {
        this.toastr.error('El DNI introducido no es correcto', 'Error :')

      } else {
        console.log(this.teacher.idpersona)
        if (this.teacher.idpersona) {
          this.teacher = {
            idpersona: this.teacher.idpersona,
            nombre: this.teacher.nombre,
            profesion: '',
            dni: this.teacher.dni,
            nuss: this.teacher.nuss,
            fecha_nacimiento: this.teacher.fecha_nacimiento,
            ciudad: this.teacher.ciudad,
            provincia: this.teacher.provincia,
            pais: 'España',
            cp: this.teacher.cp,
            direccion: this.teacher.direccion,
            telefono1: this.teacher.telefono1,
            telefono2: '',
            email: this.teacher.email.toLowerCase(),
            web: '',
            codimd5: '',
            caducidadmd5: new Date()

          }

          this.loading = true;

          console.log(this.teacher)
          console.log(this.teacher.idpersona)

          this.teacherService.updateTeacher(this.teacher.idpersona, this.teacher).subscribe({
            next: (data) => {
              // this.router.navigate(['/teachers']);
              console.log(data)
              console.log('first')
            },
            error: (err: HttpErrorResponse) => {
              if (err.error.text) {
                this.toastr.error(err.error.text, 'Error :')
              } else {
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

        } else {
          this.teacher = {
            idpersona: this.teacher.idpersona,
            nombre: this.teacher.nombre,
            dni: this.teacher.dni,
            nuss: this.teacher.nuss,
            fecha_nacimiento: this.teacher.fecha_nacimiento,
            ciudad: this.teacher.ciudad,
            provincia: this.teacher.provincia,
            pais: 'España',
            cp: this.teacher.cp,
            direccion: this.teacher.direccion,
            telefono1: this.teacher.telefono1,
            telefono2: '',
            email: this.teacher.email.toLowerCase()
          }

          this.loading = true;

          this.teacherService.addTeacher(this.teacher).subscribe({
            next: (data) => {
              this.router.navigate(['/teachers']);
            },
            error: (err: HttpErrorResponse) => {
              if (err.error.text) {
                this.toastr.error(err.error.text, 'Error :')
              } else {
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

      }
    }

  }

  open(rowData: any) {

    this.modo = 'Editar Usuario'
    this.teacherService.getTeacher(rowData.idpersona).subscribe({
      next: () => {
        this.teacher = {
          idpersona: rowData.idpersona,
          nombre: rowData.nombre,
          dni: rowData.dni,
          nuss: rowData.nuss,
          fecha_nacimiento: rowData.fecha_nacimiento.toISOString().slice(0, 10),
          ciudad: rowData.ciudad,
          provincia: rowData.provincia,
          pais: rowData.pais,
          cp: rowData.cp,
          direccion: rowData.direccion,
          telefono1: rowData.telefono1,
          email: rowData.email
        };
      },
      error: () => { },
      complete: () => { }
    })


    console.log(rowData)
  }

  public borrar() {
    this.modo = 'Añadir nuevo usuario';
    this.teacher = {
      idpersona: 0,
      nombre: '',
      dni: '',
      fecha_nacimiento: new Date,
      ciudad: '',
      provincia: '',
      pais: '',
      cp: '',
      direccion: '',
      telefono1: '',
      email: ''
    };
  }

  validarDni(dni: string): boolean {
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const regex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    const match = dni.match(regex);
    if (!match) {
      return false;
    }
    const numero = parseInt(dni.substr(0, 8), 10);
    const letra = dni.substr(8, 1).toUpperCase();
    const resto = numero % 23;
    const letraCalculada = letras.charAt(resto);
    return letra === letraCalculada;
  }

  deleteUser(idpersona: number) {
    this.teacherService.deleteteacher(this.teacher.idpersona).subscribe({
      next: () => {
        console.log(`Se ha borrado el usuario con el ID : ${idpersona}`)
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.text) {
          this.toastr.error(err.error.text, 'Error :')
        } else {
          this.toastr.error('Upps, ha ocurrido un error con el servidor.\n Por favor, pongase en contacto con el administrador.', 'Error :')
        }
        this.loading = false;
        console.log(err)
      },
      complete: () => {
        this.loading = false;
        this.toastr.success('Usuario borrado con exito', 'Succes :')
      },


    })
  }


}
