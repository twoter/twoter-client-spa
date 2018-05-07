import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ScrollService {

  public scrolledPastPoint: EventEmitter<boolean>;

  constructor() {
    this.scrolledPastPoint = new EventEmitter();
  }

  public setScrolledPastPoint(scrollStatus: boolean) {
    this.scrolledPastPoint.emit(scrollStatus);
  }

  public subscribe(success, error?, compelete?) {
    return this.scrolledPastPoint.subscribe(success, error, compelete);
  }

}
