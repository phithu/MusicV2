import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicRoutingModule } from './music-routing/music-routing.module';
import { VietnamMusicComponent } from './vietnam-music/vietnam-music.component';
import { InterMusicComponent } from './inter-music/inter-music.component';
import { MusicDetailsComponent } from './music-details/music-details.component';
import { ListMusicComponent } from './list-music/list-music.component';
import { MusicItemComponent } from './music-item/music-item.component';
import { PlayerModule } from '../player/player.module';
import { MaterialModule } from '@angular/material';
import { ShowBySingerPipe } from './show-by-singer.pipe';
import { AnimationLoadModule } from '../animation-load/animation-load.module';
import { NotfoundpageComponent } from '../notfoundpage/notfoundpage.component';
@NgModule({
    imports: [
        CommonModule,
        MusicRoutingModule,
        PlayerModule,
        MaterialModule,
        AnimationLoadModule
    ],
    exports: [
        VietnamMusicComponent,
        InterMusicComponent,
        MusicDetailsComponent,
        ListMusicComponent,
        MusicItemComponent,
        NotfoundpageComponent
    ],
    declarations: [
        VietnamMusicComponent,
        InterMusicComponent,
        MusicDetailsComponent,
        ListMusicComponent,
        MusicItemComponent,
        NotfoundpageComponent,
        ShowBySingerPipe
    ]
})
export class MusicModule { }
