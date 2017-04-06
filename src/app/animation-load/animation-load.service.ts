import { Injectable, Output, EventEmitter } from '@angular/core';
import { AnimationLoadComponent } from './animation-load/animation-load.component';

@Injectable()
export class AnimationLoadService {

  @Output('Loading') private Loading = new EventEmitter();

  constructor() { }
  start() {
    this.Loading.emit(true);
  }
  done() {
    this.Loading.emit(false)
  }
  getValue() {
    return this.Loading;
  }
}
