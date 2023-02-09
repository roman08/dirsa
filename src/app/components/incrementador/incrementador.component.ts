import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input() progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor(item: number) {
    if (this.progreso >= 100 && item >= 0) {
      this.valorSalida.emit(100);
      return (this.progreso = 100);
    }

    if (this.progreso <= 0 && item < 0) {
      this.valorSalida.emit(0);
      return (this.progreso = 0);
    }
    this.progreso = this.progreso + item;
    this.valorSalida.emit(this.progreso);
    return;
  }

  onChange( nuevoValor: number) {

    if( nuevoValor >= 100){
      this.progreso = 100;
    }else if( nuevoValor <= 0){
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
    
  }
}
