import {Component, OnInit, Input, Output} from '@angular/core';
import {Routes, Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {MenuService} from './Menu.service';
import {MenuItem} from './components/MenuItem/MenuItem.component';

@Component({
  selector: 'menu',
  styles: [require('./Menu.scss')],
  template: require('./Menu.html'),
  
  providers:[MenuService]
})

export class Menu implements OnInit{
  @Input() menuRoutes:Routes = [];
  public menuItems:any[];
  protected _onRouteChange:Subscription;

  constructor(private _router:Router, private _service:MenuService){
    this._onRouteChange = this._router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          // on page load we have to wait as event is fired before menu elements are prepared
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });
  }

  //get parsed menu from routes
  public ngOnInit():void {
    this.menuItems = this._service.convertRoutesToMenus(this.menuRoutes);

    console.log('this.menuItems', this.menuItems);

  }

  public selectMenuAndNotify():void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
    }
  }

}
