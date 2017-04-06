import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MusicService } from '../../music.service';
import { NgProgressService } from 'ng2-progressbar';
import { Music } from '../music';
import { AnimationLoadService } from '../../animation-load/animation-load.service';

const urlInter = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/ZHxmtkhSLJzWCykFJTDHLn';


@Component({
    selector: 'pt-inter-music',
    templateUrl: './inter-music.component.html',
    styleUrls: ['./inter-music.component.scss']
})
export class InterMusicComponent implements OnInit {
    listMusicInter: Music[];
    // number songs to display
    @Input('numbersongs') numbersongs: number;
    // width 100% for item children
    @Input('isBlock') isBlock: boolean;
    @Output('checkLoaded') checkLoaded = new EventEmitter<boolean>();

    constructor(
        private musicService: MusicService,
        private animationloadServide: AnimationLoadService,
        private pService: NgProgressService,
    )
    { }

    ngOnInit() {
        this.getListMusicInter();
    }
    // get list music Viet Nam
    getListMusicInter() {
        this.animationloadServide.start();
        this.pService.start();
        this.musicService.getListMusic(urlInter).subscribe(
            (listMusicInter) => {
                this.listMusicInter = listMusicInter;
            },
            (e) => {
                console.log("Error: ", e)
            },
            () => {
                // load finish
                this.checkLoaded.emit(true);
                this.animationloadServide.done();
                this.pService.done();
            }
        )

    }

}
