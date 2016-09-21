import {Directive, Input, Output, ElementRef, EventEmitter} from '@angular/core';

import './SlimScroll.loader.ts';

@Directive({
  selector: '[SlimScroll]'
})
export class SlimScroll {

  @Input() public SlimScrollOptions:Object;

  constructor(private _elementRef:ElementRef) {
  }

  ngOnChanges(changes) {
    this._scroll();
  }

  private _scroll() {
    this._destroy();
    this._init();
  }

  private _init() {
    jQuery(this._elementRef.nativeElement).slimScroll(this.SlimScrollOptions);
  }

  private _destroy() {
    jQuery(this._elementRef.nativeElement).slimScroll({ destroy: true });
  }
}
