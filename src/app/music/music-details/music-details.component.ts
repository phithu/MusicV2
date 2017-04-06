import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { state, trigger, style, animate, transition } from '@angular/animations';
import { NgProgressService } from "ng2-progressbar";
import { Music } from '../music';
import { MusicService } from '../../music.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ShareDataService } from '../../share-data.service';
import { AnimationLoadService } from '../../animation-load/animation-load.service';

const urlVN = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/knxHtLCkZQLmzykFcybHLm';
const urlInter = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/ZHxmtkhSLJzWCykFJTDHLn';

@Component({
    selector: 'pt-music-details',
    templateUrl: './music-details.component.html',
    styleUrls: ['./music-details.component.scss'],
    animations: [
        trigger('toggleResponsive', [
            state('active', style(
                {
                    display: 'block',
                    transform: 'scale(1)',
                    opacity: 1
                }
            )),
            state('inactive', style(
                {
                    display: 'none',
                    transform: 'scale(0.8)',
                    opacity: 0.7

                }
            )),
            transition("active <=> inactive", animate(700))
        ]),
        trigger('togglleContainer', [
            state('active', style(
                {
                    display: 'flex',
                    transform: 'scale(1)',
                    opacity: 1
                }
            )),
            state('inactive', style(
                {
                    display: 'none',
                    transform: 'scale(1.1)',
                    opacity: 0.7

                }
            )),
            transition("active <=> inactive", animate(300))
        ]),
    ]
})
export class MusicDetailsComponent implements OnInit {

    public song: any;
    public singerCurrent: string;
    public id: string;
    public listMusic: Music[];
    public typeSong: boolean;
    private autoNextSong: boolean = true;
    public checkCategorySong: boolean;
    public linkName: string;
    public loaded: boolean = false;
    public responsiveState: string = 'inactive';
    public containerState: string = 'active';
    @ViewChild('container') container: ElementRef;
    private listMusicVN: Music[];
    private listMusicInter: Music[];
    public listMusicCheck: Music[];
    public paramsValid: boolean;

    constructor(
        private musicService: MusicService,
        private shareDataService: ShareDataService,
        private activatedRoute: ActivatedRoute,
        private pService: NgProgressService,
        private router: Router,
        private title: Title,
        private animationloadServide: AnimationLoadService

    ) { }

    ngOnInit() {
        // this.getSingleSong();
        this.getListMusicVN_Inter();
        this.checkRouterCurrent();
    }
    checkRouterCurrent() {
        this.router.events.subscribe((navigationEnd: NavigationEnd) => {
            let urlCurrent = navigationEnd.url;
            let position = urlCurrent.search('/nhacviet/');
            // position = 0 is 'nhacviet'
            if (position === 0) {
                this.checkCategorySong = true;
                this.linkName = '/nhacviet';
                this.getListMusic(urlVN);
            }
            // position != 0 is 'nhacquocte
            else {
                this.checkCategorySong = false;
                this.linkName = '/nhacquocte';
                this.getListMusic(urlInter);
            }

        })
    }
    getListMusic(urlAPI: string) {
        this.musicService.getListMusic(urlAPI).subscribe(listMusic => {
            this.listMusic = listMusic;
        })
    }
    // xử lí như thế này không hay, cần phải xem xét lại.(Giải pháp tạm thời)
    getListMusicVN_Inter() {
        // get viet nam music
        this.musicService.getListMusic(urlVN).subscribe(
            listMusicVN => {
                this.listMusicVN = listMusicVN;
            },
            (e) => console.log("Error: ", e),
            () => {
                // get internation music 
                this.musicService.getListMusic(urlInter).subscribe(
                    listMusicInter => {
                        this.listMusicInter = listMusicInter
                    },
                    (e) => console.log("Error: ", e),
                    () => {
                        // join list music VN and inter music become listmusic
                        this.listMusicCheck = this.listMusicVN.concat(this.listMusicInter);
                        this.getSingleSong();
                    }
                )
            }
        )
    }
    checkParamsValid(id: string) {
        this.listMusicCheck.forEach(music => {
            if (music.id === id) {
                this.paramsValid = true;
                return;
            }
        })
    }
    getSingleSong() {
        // get id params
        this.activatedRoute.params
            // covert params argument to string 'id'
            .map(params => params['id'])
            .subscribe(
            // next
            (id: string) => {
                // start process bar
                this.pService.start();
                this.animationloadServide.start();
                this.id = id;
                this.checkParamsValid(this.id);
                if (this.paramsValid) {
                    this.musicService.getSong(this.id).subscribe(song => {
                        this.song = song;
                        this.singerCurrent = this.song.artist;
                        this.shareDataService.onNext(this.song);
                        // set title for page
                        if (this.checkCategorySong) {
                            this.title.setTitle("Nhạc việt | " + song.title);
                        }
                        else {
                            this.title.setTitle("Nhạc quốc tế | " + song.title);
                        }
                        this.pService.done();
                        this.animationloadServide.done();
                    })
                }
                else {
                    this.pService.done();
                    this.animationloadServide.done();
                }

            },
        )
    }
    // check autoPlay
    onChangeSide(event) {
        this.autoNextSong = event.checked;
    }
    showListMusicResponsive() {
        this.responsiveState = (this.responsiveState === 'active' ? 'inactive' : 'active');
        this.containerState = (this.responsiveState === 'active' ? 'inactive' : 'active');
    }


}
