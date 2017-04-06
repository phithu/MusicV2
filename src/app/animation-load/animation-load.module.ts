import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationLoadComponent } from './animation-load/animation-load.component';
import { AnimationLoadService } from './animation-load.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [AnimationLoadComponent],
    declarations: [AnimationLoadComponent],
    providers: [
        AnimationLoadService
    ]
})
export class AnimationLoadModule { }
