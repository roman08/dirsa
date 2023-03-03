import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  getDayDifference( initDate: string, endDate: Date) {
    const fecha1: Date = new Date(initDate);
    // const endDate: Date = new Date('2023-03-10');

    const diffTime: number = Math.abs(endDate.getTime() - fecha1.getTime());
    const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays; // Output: 4
  }
}
