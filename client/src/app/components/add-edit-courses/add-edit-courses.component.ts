import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/interfaces/courses';
import { TypeCourse } from 'src/app/interfaces/types-courses';
import { CoursesService } from 'src/app/services/course.service';
import { TypesCoursesService } from 'src/app/services/types-courses.service';

@Component({
  selector: 'app-add-edit-courses',
  templateUrl: './add-edit-courses.component.html',
  styleUrls: ['./add-edit-courses.component.css']
})
export class AddEditCoursesComponent implements OnInit {

  loading: boolean = false;
  isRequired: boolean = false;
  modo: string = 'Añadir';

  @Input() item: any;
  @Input() rowData: any;
  course: Course = {
    idpresentacion: 0,
    titulo: '',
    tipo: 0,
    cliente: '',
    sitio: '',
    fecha: new Date,
    notas: '',
    registrableweb: 1,
    camposobligatorios: 0
  };

  typeCourses: TypeCourse[] = [];

  constructor(private coursesService: CoursesService, private toastr: ToastrService, private router: Router, private typeCourseService: TypesCoursesService){}
  ngOnInit(): void {
    this.typeCourseService.getTypesCourses().subscribe({
      next: (data) => {
        this.typeCourses = data;
      },
      error: () => {},
      complete: () => {}
    })
  }



  addCourse(){
    if (this.course.titulo == '' || this.course.tipo == 0 || this.course.sitio == '' || this.course.notas == '') {
      this.toastr.error('Debe rellenar todos los campos', 'Error :')
      this.router.navigateByUrl("/courses")
    } else {

        if (this.course.idpresentacion) {
          console.log('Hay ID')

          this.course = {
            idpresentacion: this.course.idpresentacion,
            titulo: this.course.titulo,
            tipo: this.course.tipo,
            cliente: this.course.cliente,
            sitio: this.course.sitio,
            fecha: this.course.fecha,
            notas: this.course.notas,
            registrableweb: 1,
            camposobligatorios: 0
          }

          this.loading = true;
          this.coursesService.updateCourse(this.course.idpresentacion, this.course).subscribe({
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
          this.course = {
            idpresentacion: this.course.idpresentacion,
            titulo: this.course.titulo,
            tipo: this.course.tipo,
            cliente: this.course.cliente,
            sitio: this.course.sitio,
            fecha: this.course.fecha,
            notas: this.course.notas,
            registrableweb: 1,
            camposobligatorios: 0
          }

          this.loading = true;

          this.coursesService.addCourse(this.course).subscribe({
            next: (data) => {
              this.router.navigate(['/dashboard']);
              console.log(this.course)
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

    open(rowData: any) {

      this.modo = 'Editar'
      this.isRequired = false
      if (rowData.fecha == null) {
        const fecha = new Date("1900/01/01 20:30:45")
        rowData.fecha = fecha;
      }

      this.coursesService.getCourse(rowData.idpresentacion).subscribe({
        next: () => {
          this.course = {
            idpresentacion: rowData.idpresentacion,
            titulo: rowData.titulo,
            tipo: rowData.tipo,
            cliente: rowData.cliente,
            sitio: rowData.sitio,
            fecha: rowData.fecha.toISOString().slice(0, 10),
            notas: rowData.notas,
            registrableweb: 1,
            camposobligatorios: 0
          }
        },
        error: () => { },
        complete: () => { }
      })
    }

    public borrar() {
      this.modo = 'Añadir';
      this.isRequired = true
      this.course = {
        idpresentacion: 0,
        titulo: '',
        tipo: 0,
        cliente: '',
        sitio: '',
        fecha: new Date,
        notas: '',
        registrableweb: 1,
        camposobligatorios: 0
      };
    }

    deleteCourse(idpresentacion: number){
      if (confirm('Estás seguro que deseas eliminar el registro?')) {
        this.coursesService.deleteCourse(this.course.idpresentacion).subscribe({
          next: () => {
            console.log(`Se ha borrado el usuario con el ID : ${idpresentacion}`)
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

  }
