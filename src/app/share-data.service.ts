import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ShareDataService {

  public Data = new BehaviorSubject(null);

  public onNext(data: any) {
    this.Data.next(data);
  }

  constructor() { }

}
