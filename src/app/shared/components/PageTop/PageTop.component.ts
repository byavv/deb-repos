import {Component} from '@angular/core';
import {Menu} from '../Menu/Menu.component';
import {MENU} from '../../../../app/app.menu';
import * as _ from 'lodash';

@Component({
  selector: 'page-top',
  styles: [require('./PageTop.scss')],
  template: require('./PageTop.html') 
})

export class PageTop{
  public routes = _.cloneDeep(MENU);
}