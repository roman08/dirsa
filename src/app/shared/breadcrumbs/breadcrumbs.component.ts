import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent  implements OnDestroy  {

  public titulo: string = '';
  public tituloSubs$: Subscription | undefined;
  
  constructor( private router: Router) {

    this.tituloSubs$ = this.getArgumentosRuta()
       .subscribe({
         next: (data: ActivationEnd) => {
           this.titulo = data.snapshot.data['titulo'];
           document.title = `Admin Pro - ${this.titulo}`;
         },
       });
  }
  ngOnDestroy(): void {
    this.tituloSubs$?.unsubscribe();
  }


  getArgumentosRuta(){
    return this.router.events
       .pipe(
         filter(
           (event: any) =>
             event instanceof ActivationEnd &&
             event.snapshot.firstChild === null &&
             event.snapshot.data != null
         ));
  }
 

}
