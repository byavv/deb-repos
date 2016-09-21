import { Routes, RouterModule }  from '@angular/router';
import {Repositories} from "./repositories.component";


const routes: Routes = [
  {
    path: '',
    component: Repositories,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
