import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent {
  @Input() data: any;
  @Input() title: string = 'Sin titulo';
  // Doughnut
  // public doughnutChartLabels: string[] = [
  //   'Download Sales',
  //   'In-Store Sales',
  //   'Mail-Order Sales',
  // ];
  // public doughnutChartData: ChartData<'doughnut'> = {
  //   labels: this.doughnutChartLabels,
  //   datasets: [
  //     {
  //       data: [350, 450, 100],
  //       backgroundColor: ['#9E120E', '#FF5800', '#FFB414'],
  //     },
  //   ],
  // };
}
