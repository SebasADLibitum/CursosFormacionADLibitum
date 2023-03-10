import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegisteredTeacher } from 'src/app/interfaces/registered-teachers';
import { RegisteredTeachersService } from 'src/app/services/registered-teachers.service';

@Component({
  selector: 'app-modal-courses',
  templateUrl: './modal-courses.component.html',
  styleUrls: ['./modal-courses.component.css']
})
export class ModalCoursesComponent implements OnInit {

  @Input() item: any;
  @Input() rowData: any;
  registeredProfs: RegisteredTeacher[] = [];
  public counter: number = 0;

  constructor(private registeredTeachersService: RegisteredTeachersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registeredTeachersService.getRegisteredTeachers().subscribe({
      next: (data) => { this.registeredProfs = data },
      error: (err) => { this.toastr.error('No se han podido cargar los datos', 'Error :'), console.log(err) },
      complete: () => { this.toastr.success('Datos cargado correctamente', 'Succes :'), console.log(this.registeredProfs) }
    })
  }

  open(rowData: any) {
    this.rowData = rowData;
    this.item = rowData.idpresentacion
  }


}
