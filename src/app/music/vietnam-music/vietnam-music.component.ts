import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MusicService } from '../../music.service';
import { NgProgressService } from 'ng2-progressbar';
import { Music } from '../music';
import { AnimationLoadService } from '../../animation-load/animation-load.service';

const urlVN = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/knxHtLCkZQLmzykFcybHLm';

@Component({
    selector: 'pt-vietnam-music',
    templateUrl: './vietnam-music.component.html',
    styleUrls: ['./vietnam-music.component.scss']
})
export class VietnamMusicComponent implements OnInit {

    public listMusicVN: Music[];

    public listImagesAlbum: Array<string> = [];

    // number songs to display
    @Input('numbersongs') numbersongs: number;

    // width children item
    @Input('isBlock') isBlock: boolean;
    @Output('checkLoaded') checkLoaded = new EventEmitter<boolean>();

    constructor(
        private musicService: MusicService,
        private animationloadServide: AnimationLoadService,
        private pService: NgProgressService,
    )
    { }

    ngOnInit() {
        this.getListMusicVietNam();
    }
    // get list music Viet Nam
    getListMusicVietNam() {
        this.animationloadServide.start();
        this.pService.start();
        this.musicService.getListMusic(urlVN).subscribe(
            (listMusicVN) => {
                this.listMusicVN = listMusicVN;
            },
            (e) => {
                console.log("Error: ", e)
            },
            () => {
                this.animationloadServide.done();
                this.pService.done();
                // load finish
                this.checkLoaded.emit(true);
            }
        )
    }

}
