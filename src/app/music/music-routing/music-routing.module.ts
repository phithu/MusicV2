import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { VietnamMusicComponent } from '../vietnam-music/vietnam-music.component';
import { InterMusicComponent } from '../inter-music/inter-music.component';
import { MusicDetailsComponent } from '../music-details/music-details.component';

const MusicRoutes: Routes = [
    {
        path: 'nhacviet', children: [
            {
                path: ':id', component: MusicDetailsComponent
            },
            {
                path: '', component: VietnamMusicComponent
            }
        ]
    },
    {
        path: 'nhacquocte', children: [
            {
                path: ':id', component: MusicDetailsComponent
            },
            {
                path: '', component: InterMusicComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(MusicRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MusicRoutingModule { }
