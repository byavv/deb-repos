import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common'; //без него не работает ngFor
//base component
import { Search } from './search.component';

//components
import { Aggregations } from './aggregations/aggregations.component';
import { AutoComplete } from './auto-complete/auto-complete.component';



@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [
    Aggregations,
    AutoComplete,
      Search
  ],
  exports: [ Search ]
})

export class SearchModule {}
