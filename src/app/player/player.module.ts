import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { MaterialModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [PlayerComponent],
  declarations: [PlayerComponent]
})
export class PlayerModule { }
