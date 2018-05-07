import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ScrollService {

  private subject: Subject<boolean>;

  constructor() {
    this.subject = new Subject();
  }

  public setScrolledPastPoint(scrollStatus: boolean) {
    this.subject.next(scrollStatus);
  }

  public subscribe(success, error?, compelete?): Subscription {
    return this.subject.subscribe(success, error, compelete);
  }

}
