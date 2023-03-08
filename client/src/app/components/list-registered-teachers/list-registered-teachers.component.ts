import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisteredTeachersService } from 'src/app/services/registered-teachers.service';
import { RegisteredTeacher } from 'src/app/interfaces/registered-teachers';
import { ToastrService } from 'ngx-toastr';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { ModalCoursesComponent } from '../modal-courses/modal-courses.component';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-list-registered-teachers',
  templateUrl: './list-registered-teachers.component.html',
  styleUrls: ['./list-registered-teachers.component.css']
})
export class ListRegisteredTeachersComponent implements OnInit {

  registeredTeachers: RegisteredTeacher[] = [];
  excel: RegisteredTeacher[] = [];
  columns: any[] = [];

  @ViewChild('myGrid', { static: false }) myGrid: any = jqxGridComponent;
  @ViewChild('myModal') myModal: any = ModalCoursesComponent;

  constructor(private registeredTeachersService: RegisteredTeachersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registeredTeachersService.getRegisteredTeachers().subscribe({
      next: (data) => {
        this.excel = data
        this.registeredTeachers = new jqx.dataAdapter({
          datafields: [
            { name: 'id', },
            { name: 'nombre' },
            { name: 'escuela' },
            { name: 'fecha_alta', type: 'date' },
            { name: 'titulo' },
            { name: 'nombrealmacen'}
          ],
          localdata: data
        })

        this.columns = [
          { text: 'Id', align: 'center', datafield: 'id', cellsalign: 'center', width: 50},
          { text: 'Nombre', align: 'center', datafield: 'nombre', cellsalign: 'center'},
          { text: 'Escuela', align: 'center', datafield: 'escuela', cellsalign: 'center' },
          { text: 'Fecha Alta', align: 'center', datafield: 'fecha_alta', cellsformat: 'dd-MM-yyyy', cellsalign: 'center', width: 150 },
          { text: 'Curso', align: 'center', datafield: 'titulo', cellsalign: 'center', width: 600},
          { text: 'Escuela Regente', align: 'center', datafield: 'nombrealmacen', cellsalign: 'center' , width: 300},
        ];
      },
      error: (err) => { this.toastr.error('No se han podido cargar los datos', 'Error :'), console.log(err) },
      complete: () => { this.toastr.success('Datos cargado correctamente', 'Succes :'), console.log(this.registeredTeachers) }
    })

  }
  selectedItem: any;

  exportToExcel(data: any[]): void {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Profes Reg.');
    XLSX.writeFile(workbook, 'Profesores registrados.xlsx');
  }


  clearFiltering(): void {
    this.myGrid.clearfilters();

  }

}
