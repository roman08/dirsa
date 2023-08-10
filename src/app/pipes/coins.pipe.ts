import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coins'
})
export class CoinsPipe implements PipeTransform {

  transform(value: any): unknown {
    let currency = 'MXN';
    switch (value) {
      case 1:
        currency ='MXN';
        break;
      case 2:
        currency = 'USD'
        break;
    }
    return currency;
  }

}
