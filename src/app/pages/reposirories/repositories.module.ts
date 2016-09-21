import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { Repositories } from './repositories.component';
import { routing }       from './repositories.routing';

//modules
import { SearchModule } from './search/search.module';
import { Compon } from './component';

//providers
import { PackagesService} from '../../shared/services/ElasticSearch';

//import {Navigation} from "./navigation/navigation.component";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SearchModule,
    routing
  ],
  declarations: [
    /*Navigation,*/
    Repositories,
    Compon
  ],
  providers: [
    PackagesService
  ]
})
export default class RepositoriesModule {

}
