import './app.loader.ts';
import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalState } from './global.state';

import { Charge, PreLoad } from './shared/services';

/*
 * App Component
 */

@Component({
  selector: 'app',
  pipes: [],
  providers: [Charge, PreLoad],
  styles: [require('normalize.css'), require('./app.scss')],
  template: `
     <router-outlet></router-outlet>
  `
})
export class App {

  constructor (private _preload:PreLoad){}

  public ngAfterViewInit():void {
    // hide preload when all loaders are completed
    Charge.load().then((values) => {
      this._preload.hide();
    });
  }
}
