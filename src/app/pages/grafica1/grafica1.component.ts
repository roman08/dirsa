import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public doughnutChartLabels = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public data = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ['#9E120E', '#FF5800', '#FFB414'],
      },
    ],
  };

  // TODO: GRAFICA2
  public doughnutChartLabels2 = ['Ciudad', 'Estado', 'Pais'];
  public data2 = {
    labels: this.doughnutChartLabels2,
    datasets: [
      {
        data: [25, 230, 150],
        backgroundColor: ['#9E120E', '#FF5800', '#FFG414'],
      },
    ],
  };
}
