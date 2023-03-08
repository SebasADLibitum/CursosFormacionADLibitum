import { Component, OnInit, ViewChild } from '@angular/core';
import { TypesCoursesService } from 'src/app/services/types-courses.service';
import { TypeCourse } from 'src/app/interfaces/types-courses';
import { ToastrService } from 'ngx-toastr';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { ModalCoursesComponent } from '../modal-courses/modal-courses.component';

@Component({
  selector: 'app-list-types-courses',
  templateUrl: './list-types-courses.component.html',
  styleUrls: ['./list-types-courses.component.css']
})
export class ListTypesCoursesComponent implements OnInit {

  typeCourses: TypeCourse[] = [];
  excel: TypeCourse[] = [];
  columns: any[] = [];

  @ViewChild('myGrid', { static: false }) myGrid: any = jqxGridComponent;
  @ViewChild('myModal') myModal: any = ModalCoursesComponent;


  constructor(private typesCoursesService: TypesCoursesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.typesCoursesService.getTypesCourses().subscribe({
      next: (data) => {
        this.excel = data
        this.typeCourses = new jqx.dataAdapter({
          datafields: [
            { name: 'id', },
            { name: 'color' },
            { name: 'nombre' },
          ],
          localdata: data
        })

        this.columns = [
          { text: 'Id', align: 'center', datafield: 'id', cellsalign: 'center', width: 50},
          { text: 'Color', align: 'center', datafield: 'color', cellsalign: 'center', width: 100 },
          { text: 'Nombre', align: 'center', datafield: 'nombre', cellsalign: 'center'},
        ];
      },
      error: (err) => { this.toastr.error('No se han podido cargar los datos', 'Error :'), console.log(err) },
      complete: () => { this.toastr.success('Datos cargado correctamente', 'Succes :'), console.log(this.typeCourses) }
    })
  }

  getStyle(color: string){
    return {'background-color': color}
  }
}
