import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { SharedModule } from '../shared/shared.module';

import { Pages } from './pages.component';

@NgModule({
  imports: [CommonModule, SharedModule, routing],
  declarations: [Pages]
})

export class PagesModule {}
