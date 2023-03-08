import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], columna: string, ordenAscendente: boolean): any[] {
    if (!array || !columna || columna === '') { return array; }

    return array.sort((a: any, b: any) => {
      const columnaA = isNaN(a[columna]) ? a[columna].toUpperCase() : a[columna];
      const columnaB = isNaN(b[columna]) ? b[columna].toUpperCase() : b[columna];

      if (columnaA < columnaB) {
        return ordenAscendente ? -1 : 1;
      } else if (columnaA > columnaB) {
        return ordenAscendente ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
