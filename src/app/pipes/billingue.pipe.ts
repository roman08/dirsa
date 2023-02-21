import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billingue'
})
export class BillinguePipe implements PipeTransform {

  transform(value: number): string {
    return  value == 1 ? 'Si' : 'No';

  }

}
