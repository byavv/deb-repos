import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import {
  Menu,
  MenuItem,
  PageTop
} from './components';

import {
  ScrollPosition,
  SlimScroll
} from './directives';


/*import {

} from './pipes';*/


import {
    Charge,
  //  ElasticSearch,
    PreLoad
} from './services';

/*import {

} from './validators';*/

const NGA_COMPONENTS = [
  Menu,
  MenuItem,
  PageTop
];

const NGA_DIRECTIVES = [
  ScrollPosition,
  SlimScroll
];

/*const NGA_PIPES = [

];*/

const NGA_SERVICES = [
  Charge,
  PreLoad
];

/*const NGA_VALIDATORS = [

];*/

@NgModule({
  declarations: [
    //...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    //...NGA_VALIDATORS,
    ...NGA_SERVICES
  ],
  exports: [
    //...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ]
})
export class SharedModule {
}
