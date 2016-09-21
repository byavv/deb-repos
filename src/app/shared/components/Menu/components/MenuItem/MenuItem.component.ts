import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'menu-item',
  styles: [require('./MenuItem.scss')],
  template: require('./MenuItem.html'),  
})
export class MenuItem {

  @Input() menuItem:any;
  @Input() child:boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  public onHoverItem($event):void {
    this.itemHover.emit($event);
  }

  //TODO в menu.servise
  public onToggleSubMenu($event, item):boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }
}
