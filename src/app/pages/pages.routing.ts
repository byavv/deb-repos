import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';

const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'repositories', pathMatch: 'full' },
      { path: 'repositories', loadChildren: () => System.import('./reposirories/repositories.module') }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
