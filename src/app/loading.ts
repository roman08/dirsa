import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'loading',
  template: ` <div class="preloaders">
    <div class="loaders">
      <div class="loader__figures"></div>
      <p class="loader__labels">Do It Right</p>
    </div>
  </div>`,
  styleUrls: ['loading.scss'],
})
export class LoadingComponent {}
