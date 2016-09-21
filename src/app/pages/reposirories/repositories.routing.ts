import { Routes, RouterModule }  from '@angular/router';
import {Repositories} from "./repositories.component";
import { Compon } from "./component"
 
const routes: Routes = [
  {
    path: '',
    component: Repositories,
    children: [
      { path: 'some',  component: Compon},
      { path: '**',  redirectTo:'some'},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
