import { Component, OnInit, ViewChild  } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/interfaces/courses';
import { CoursesService } from 'src/app/services/course.service';
import * as XLSX from 'xlsx';
import { ModalCoursesComponent } from '../modal-courses/modal-courses.component'
import { AddEditCoursesComponent } from '../add-edit-courses/add-edit-courses.component';


@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})

export class ListCoursesComponent implements OnInit {
  courses: Course[] = [];
  excel: Course[] = [];
  columns: any[] = [];

  @ViewChild('myGrid', { static: false }) myGrid: any = jqxGridComponent;
  @ViewChild('addCourseModal') addCourseModal: any = AddEditCoursesComponent;
  @ViewChild('myModal') myModal: any = ModalCoursesComponent;

  constructor(private coursesService: CoursesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.excel = data
        this.courses = new jqx.dataAdapter({
          datafields: [
            { name: 'idpresentacion', },
            { name: 'titulo' },
            { name: 'nombre' },
            { name: 'sitio' },
            { name: 'notas' },
            { name: 'fecha', type: 'date' },
          ],
          localdata: data
        })

        this.columns = [
          { text: 'Id', align: 'center', datafield: 'idpresentacion', cellsalign: 'center', width: 50},
          { text: 'Titulo', align: 'center', datafield: 'titulo', cellsalign: 'center'},
          { text: 'Nombre Curso', align: 'center', datafield: 'nombre', cellsalign: 'center'},
          { text: 'Sitio', align: 'center', datafield: 'sitio', cellsalign: 'center' },
          { text: 'Notas', align: 'center', datafield: 'notas', cellsalign: 'center' },
          { text: 'Fecha', align: 'center', datafield: 'fecha', cellsformat: 'dd-MM-yyyy', cellsalign: 'center', width: 150 },
        ];
      },
      error: (err) => { this.toastr.error('No se han podido cargar los datos', 'Error :'), console.log(err) },
      complete: () => { this.toastr.success('Datos cargado correctamente', 'Succes :'), console.log(this.courses) }
    })
  }

  exportToExcel(data: any[]): void {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cursos');
    XLSX.writeFile(workbook, 'Altas cursos.xlsx');
    this.toastr.success('Datos exportados a Excel correctamente', 'Succes :')
  }

  selectedItem: any;
  rowSelected: any;

  Rowclick(event: any): void {
    const row = this.myGrid.getrowdata(event.args.rowindex);
    this.rowSelected = row;
    this.selectedItem = row.idpresentacion
    this.addCourseModal.open(row);
    this.myGrid.elementRef.nativeElement.setAttribute("data-bs-toggle", "modal")
    this.myGrid.elementRef.nativeElement.setAttribute("data-bs-target", "#addCourseModal")
  }

  hideModal(): void {
    this.myGrid.elementRef.nativeElement.removeAttribute("data-bs-toggle")
    this.myGrid.elementRef.nativeElement.removeAttribute("data-bs-target")
  }

  borrarDatos(): void{
    this.addCourseModal.borrar();
  }

  viewProfRegisterd() {
    const row = this.rowSelected;
    this.selectedItem = row.idpresentacion
    this.myModal.open(row);
    this.myGrid.elementRef.nativeElement.setAttribute("data-bs-toggle", "modal")
    this.myGrid.elementRef.nativeElement.setAttribute("data-bs-target", "#myModal")
  }
}
