import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { ToastrService } from 'ngx-toastr';
import { Teacher } from 'src/app/interfaces/teachers';
import { TeacherService } from 'src/app/services/teacher.service';
import * as XLSX from 'xlsx';
import { ModalCoursesComponent } from '../modal-courses/modal-courses.component';

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.css']
})

export class ListTeachersComponent implements OnInit {

  teachers: Teacher[] = [];
  excel: Teacher[] = [];
  columns: any[] = [];

  @ViewChild('myGrid', { static: false }) myGrid: any = jqxGridComponent;
  @ViewChild('myModal') myModal: any = ModalCoursesComponent;

  constructor(private teacherService: TeacherService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        this.excel = data
        this.teachers = new jqx.dataAdapter({
          datafields: [
            { name: 'idpersona', },
            { name: 'nombre' },
            { name: 'dni' },
            { name: 'nuss' },
            { name: 'fecha_nacimiento', type: 'date' },
            { name: 'ciudad' },
            { name: 'provincia' },
            { name: 'cp' },
            { name: 'direccion' },
            { name: 'telefono1' },
            { name: 'email' },
          ],
          localdata: data
        })

        this.columns = [
          { text: 'Id', align: 'center', datafield: 'idpersona', cellsalign: 'center', width: 50},
          { text: 'Nombre', align: 'center', datafield: 'nombre', cellsalign: 'center', width: 300},
          { text: 'Dni', align: 'center', datafield: 'dni', cellsalign: 'center' , width: 150},
          { text: 'Nuss', align: 'center', datafield: 'nuss', cellsalign: 'center', width: 150},
          { text: 'Fecha Nac.', align: 'center', datafield: 'fecha_nacimiento', cellsformat: 'dd-MM-yyyy', cellsalign: 'center' , width: 150},
          { text: 'Ciudad', align: 'center', datafield: 'ciudad', cellsalign: 'center' , width: 150},
          { text: 'Provincia', align: 'center', datafield: 'provincia', cellsalign: 'center', width: 150},
          { text: 'CP', align: 'center', datafield: 'cp', cellsalign: 'center', width: 150 },
          { text: 'Direccion', align: 'center', datafield: 'direccion', cellsalign: 'center', width: 150},
          { text: 'Telefono', align: 'center', datafield: 'telefono1', cellsalign: 'center' , width: 150},
          { text: 'Email', align: 'center', datafield: 'email', cellsalign: 'center' },
        ];
      },
      error: (err) => { this.toastr.error('No se han podido cargar los datos', 'Error :'), console.log(err) },
      complete: () => { this.toastr.success('Datos cargado correctamente', 'Succes :'), console.log(this.teachers) }
    })
  }

  exportToExcel(data: any[]): void {
    console.log(this.teachers)
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Profesores');
    XLSX.writeFile(workbook, 'Altas profesores.xlsx');
    this.toastr.success('Datos exportados a Excel correctamente', 'Succes :')

  }

}

