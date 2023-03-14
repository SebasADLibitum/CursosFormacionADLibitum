import { Component, Input } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/interfaces/teachers';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-edit-teachers',
  templateUrl: './add-edit-teachers.component.html',
  styleUrls: ['./add-edit-teachers.component.css']
})
export class AddEditTeachersComponent {

  loading: boolean = false;
  isRequired: boolean = false;
  modo: string = 'Añadir';

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

  constructor(private teacherService: TeacherService, private toastr: ToastrService, private router: Router, private http: HttpClient) { }


  addUser() {
    if (this.teacher.nombre == '' || this.teacher.dni == '' || this.teacher.ciudad == '' || this.teacher.provincia == '' || this.teacher.cp == '' || this.teacher.direccion == '' || this.teacher.telefono1 == '' || this.teacher.email == '') {
      this.toastr.error('Debe rellenar todos los campos', 'Error :')
      this.router.navigateByUrl("/teachers")
    } else {
      if (!this.validarDni(this.teacher.dni)) {
        this.toastr.error('El DNI introducido no es correcto', 'Error :')
        this.router.navigateByUrl("/teachers")
      } else {
        if (this.teacher.idpersona) {
          console.log('Hay ID')

          this.teacher = {
            idpersona: this.teacher.idpersona,
            nombre: this.teacher.nombre,
            profesion: this.teacher.profesion,
            dni: this.teacher.dni,
            nuss: this.teacher.nuss,
            fecha_nacimiento: this.teacher.fecha_nacimiento,
            ciudad: this.teacher.ciudad,
            provincia: this.teacher.provincia,
            pais: 'España',
            cp: this.teacher.cp,
            direccion: this.teacher.direccion,
            telefono1: this.teacher.telefono1,
            telefono2: this.teacher.telefono2,
            email: this.teacher.email.toLowerCase(),
            web: this.teacher.web,
            codimd5: this.teacher.codimd5,
            caducidadmd5: this.teacher.caducidadmd5
          }

          this.loading = true;
          this.teacherService.updateTeacher(this.teacher.idpersona, this.teacher).subscribe({
            next: (data) => {
              this.router.navigate(['/dashboard']);
            },
            error: (err: HttpErrorResponse) => {
              if (err.error.text) { this.toastr.error(err.error.text, 'Error :') }
              else { this.toastr.error('Upps, ha ocurrido un error con el servidor.\n Por favor, pongase en contacto con el administrador.', 'Error :') }
              this.loading = false;
              console.log(err)
            },
            complete: () => {
              this.loading = false; this.toastr.success('Usuario registrado con exito', 'Succes :')

            },
          });

        } else {
          console.log('No hay ID')
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
              this.router.navigate(['/dashboard']);
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

    this.modo = 'Editar'
    this.isRequired = false
    if (rowData.fecha_nacimiento == null) {
      const fecha = new Date("1900/01/01 20:30:45")
      rowData.fecha_nacimiento = fecha;
    }

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
    this.modo = 'Añadir';
    this.isRequired = true
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
    if (confirm('Estás seguro que deseas eliminar el registro?')) {
      this.teacherService.deleteteacher(this.teacher.idpersona).subscribe({
        next: () => {
          console.log(`Se ha borrado el usuario con el ID : ${idpersona}`)
          this.router.navigate(['/dashboard']);
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
        }
      })
    }
  }

  onPostalCodeChange() {
    const postalCode = this.teacher.cp;
    if (postalCode && postalCode.length === 5) {
      // this.http.get(`https://geocode.xyz/${postalCode}?region=ES&auth=448863363299939302052x1702&json=1&scantext=1&geoit=JSON`)
      this.http.get(`https://api.opencagedata.com/geocode/v1/json?q=${postalCode}&countrycode=es&key=e5830b75b8ba4e11b4264469b1b76318`)
        .subscribe((data: any) => {
          if (data.results.length > 0) {
            const components = data.results[0].components;
            this.teacher.ciudad = components.city || components.town || components.county;
            this.teacher.provincia = components.state || components.province || components.region;
          }
        });
    }
  }

}
