import {Component/*, ViewEncapsulation*/} from '@angular/core';
@Component({
  selector: 'pages',
  //encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
      <page-top></page-top>
      <div class="main">
          <router-outlet></router-outlet>
      </div>
      <footer class="al-footer clearfix"></footer>
    `
})
export class Pages {

  constructor() {
  }

}
