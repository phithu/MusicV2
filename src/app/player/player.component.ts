import { Component, OnInit, Input, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ShareDataService } from '../share-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Music } from '../music/music';
import { MusicService } from '../music.service';

const urlVN = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/knxHtLCkZQLmzykFcybHLm';
const urlInter = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/ZHxmtkhSLJzWCykFJTDHLn';

@Component({
    selector: 'pt-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewChecked {

    public song: any;
    public loaded: boolean = false;
    private durationTime: any;
    public currentTime: any;
    private songIdCurent: string;
    public currentTimeHover: string;
    public showTime: string;
    private tooglePlay: boolean = false;
    public checkAnimationCover: boolean = false;
    private indexSongCurrent: number;
    private toogleLoopSong: boolean = false;
    @Input('listMusic') listMusic: Music[];
    @Input('mdSlideToggle') mdSlideToggle: any;
    @Input('mdSlideToggleMobile') mdSlideToggleMobile: any;
    @Input('autoNextSong') autoNextSong: boolean;
    @Input('checkCategorySong') checkCategorySong: boolean;
    @ViewChild('player') player: ElementRef;
    @ViewChild('processBar') processBar: ElementRef;
    @ViewChild('showTimeHover') showTimeHover: ElementRef;
    @ViewChild('iconPlay') iconPlay: ElementRef;
    @ViewChild('iconVolume') iconVolume: ElementRef;
    @ViewChild('iconloopSong') iconloopSong: ElementRef;
    @ViewChild('nextButton') nextButton: ElementRef;
    @ViewChild('backButton') backButton: ElementRef;

    constructor(
        private shareDataService: ShareDataService,
        private musicService: MusicService,
        private activatedRouter: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.getSongFromMusicDetails();
    }
    ngAfterViewChecked() {
        if (typeof this.player !== 'undefined') {
            if (!this.loaded) {
                this.updateTiming();
                this.player.nativeElement.load();
                setTimeout(() => {
                    this.player.nativeElement.play();
                }, 150);
            }
            if (this.iconloopSong) {
                // allow auto next song
                if (this.autoNextSong) {
                    // decrease opacity's icon loop song
                    this.iconloopSong.nativeElement.style.opacity = '0.6';
                    // turn of loop audio
                    this.player.nativeElement.loop = false;
                    // show next song button and back song button
                    this.nextButton.nativeElement.style.display = 'block';
                    this.backButton.nativeElement.style.display = 'block';
                }
                // disallow auto next song
                else {
                    // increase opacity's icon loop song
                    this.iconloopSong.nativeElement.style.opacity = '1';
                    // turn on loop audio
                    this.player.nativeElement.loop = true;
                    // hidden next song button and back song button
                    this.nextButton.nativeElement.style.display = 'none';
                    this.backButton.nativeElement.style.display = 'none';

                }
            }
            this.getdurationTime();
        }
        if (this.listMusic && !this.loaded) {
            this.loaded = true;
            this.indexSongCurrent = this.getIndexSongCurrent(this.songIdCurent)
        }
    }
    // get song from music details
    getSongFromMusicDetails() {
        this.shareDataService.Data.subscribe(song => {
            if (song) {
                this.song = song;
                this.guardRouterChange();
            }
        })
    }
    // get index current song
    getIndexSongCurrent(id: string): number {
        let indexCurrent;
        this.listMusic.forEach((value: Music, index: number) => {
            if (id === value.id) {
                indexCurrent = index;
            }
        })
        return indexCurrent;
    }
    // if router changes
    guardRouterChange() {
        this.activatedRouter.params
            .map(params => params['id'])
            .subscribe(params => {
                this.songIdCurent = params;
                this.loaded = false;
            });
        this.checkAnimationCover = true;
    }
    // get duration a song
    getdurationTime() {
        if (isNaN(this.player.nativeElement.duration) === false) {
            this.durationTime = this.player.nativeElement.duration;
            this.showTime = this.convertSecondstoMinutes(this.durationTime * 1000);
        }
    }
    // convert from seconds to mitutes using moment js
    convertSecondstoMinutes(value): string {
        let time = moment.duration(value);
        let Minutes = time.minutes();
        let Second: any = time.seconds();
        if (Second === 0) {
            Second = Second + "0";
        }
        if (Second > 0 && Second < 10) {
            Second = "0" + Second;
        }
        return (Minutes + ":" + Second);
    }
    // update time audio
    updateTiming() {
        setInterval(() => {
            let Duration = this.player.nativeElement.duration;
            let currentTime = this.player.nativeElement.currentTime;
            this.currentTime = this.convertSecondstoMinutes(currentTime * 1000)
            let percentage = (currentTime / Duration) * 100;
            Math.round(percentage);
            this.processBar.nativeElement.style.width = percentage + "%";
        }, 100)
    }
    // next song
    nextSong() {
        let UrlNavagate = (this.checkCategorySong ? '/nhacviet' : '/nhacquocte');
        // console.log(UrlNavagate)
        if (this.indexSongCurrent === this.listMusic.length - 1) {
            let id = this.listMusic[0].id;
            this.router.navigate([UrlNavagate, id]);
        }
        else {
            let id = this.listMusic[this.indexSongCurrent + 1].id;
            this.router.navigate([UrlNavagate, id]);
        }
    }
    // back song
    backSong() {
        let UrlNavagate = (this.checkCategorySong ? '/nhacviet' : '/nhacquocte');
        if (this.indexSongCurrent === 0) {
            let id = this.listMusic[this.listMusic.length - 1].id;
            this.router.navigate([UrlNavagate, id]);
        }
        else {
            let id = this.listMusic[this.indexSongCurrent - 1].id;
            this.router.navigate([UrlNavagate, id]);
        }
    }
    // play audio
    playAudio() {
        if (!this.tooglePlay) {
            this.checkAnimationCover = false;
            this.player.nativeElement.pause();
            this.iconPlay.nativeElement.className = "fa fa-play";
        }
        else {
            this.checkAnimationCover = true;
            this.player.nativeElement.play();
            this.iconPlay.nativeElement.className = "fa fa-pause";
        }
        this.tooglePlay = !this.tooglePlay;
    }
    // go to a value a processbar
    goToValue(event) {
        let widthProcessBar = this.processBar.nativeElement.parentElement.clientWidth;
        let widthCurrent = event.offsetX;
        let valuePercent = (widthCurrent / widthProcessBar);
        this.player.nativeElement.currentTime = (valuePercent * this.durationTime);
        this.player.nativeElement.play();
    }
    //show time in processbar
    mouseoverShowTiming(event) {
        let widthProcessBar = this.processBar.nativeElement.parentElement.clientWidth;
        let widthCurrent = event.offsetX;
        let positionLeft = event.layerX;
        let valuePercent = (widthCurrent / widthProcessBar);
        let milisecondCurrent = (valuePercent * this.durationTime);
        this.currentTimeHover = this.convertSecondstoMinutes(milisecondCurrent * 1000);
        this.showTimeHover.nativeElement.style.display = "block";
        this.showTimeHover.nativeElement.style.left = `${positionLeft}px`;
    }
    // hiden time when mouseleave
    removeShowTiming() {
        this.showTimeHover.nativeElement.style.display = "none";
    }
    songEnd() {
        // stop animation cover
        this.checkAnimationCover = false;
        if (this.autoNextSong === true) {
            this.nextSong();
        }
    }
    loopSong() {
        this.mdSlideToggle.toggle();
        this.mdSlideToggleMobile.toggle();
        // disallow loop song
        if (this.toogleLoopSong) {
            // decrease opacity's icon loop song
            this.iconloopSong.nativeElement.style.opacity = '0.6';
            // turn of loop audio
            this.player.nativeElement.loop = false;
            this.autoNextSong = true;
            // show next song button and back song button
            this.nextButton.nativeElement.style.display = 'block';
            this.backButton.nativeElement.style.display = 'block';

        }
        // allow loop song
        else {
            // increase opacity's icon loop song
            this.iconloopSong.nativeElement.style.opacity = '1';
            // turn on loop audio
            this.player.nativeElement.loop = true;
            this.autoNextSong = false;
            // hidden next song button and back song button
            this.nextButton.nativeElement.style.display = 'none';
            this.backButton.nativeElement.style.display = 'none';
        }
        this.toogleLoopSong = !this.toogleLoopSong;
    }
    controlVolume(event) {
        let volume = event.value;
        if (volume < 50 && volume !== 0) {
            this.iconVolume.nativeElement.className = 'fa fa-volume-down';

        }
        else if (volume === 0) {
            this.iconVolume.nativeElement.className = 'fa fa-volume-off';
        }
        else {
            this.iconVolume.nativeElement.className = 'fa fa-volume-up';
        }
        this.player.nativeElement.volume = (event.value / 100);
    }


}
