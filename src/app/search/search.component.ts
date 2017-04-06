import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Music } from '../music/music';
import { MusicService } from '../music.service';
import { NgProgressService } from 'ng2-progressbar';
import { AnimationLoadService } from '../animation-load/animation-load.service';
import { Title } from '@angular/platform-browser';

const urlInter = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/ZHxmtkhSLJzWCykFJTDHLn';
const urlVN = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/knxHtLCkZQLmzykFcybHLm';

@Component({
    selector: 'pt-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    public keyword: string;
    private listMusicVN: Music[];
    private listMusicInter: Music[];
    public listMusic: Music[];
    public checkSearch: boolean = true;
    public listMusicSearing: Array<Music>;
    public linkName: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private musicService: MusicService,
        private pService: NgProgressService,
        private animationloadServide: AnimationLoadService,
        private title: Title,
        private router: Router
    ) { }

    ngOnInit() {
        this.getParamsFromRouter();
    }
    // reformat keyword (remove "-" and replace by " ")
    ReformatKeyword(keyword: string): string {
        let arrayKeyword = keyword.split("_");
        let result = arrayKeyword.join(" ");
        return result;
    }
    // get keyword params from router
    getParamsFromRouter() {
        this.activatedRoute.params
            .map(params => this.ReformatKeyword(params['keyworkd']))
            .subscribe(keyword => {
                this.pService.start();
                this.animationloadServide.start();
                this.keyword = keyword;
                this.title.setTitle("Tìm kiếm | " + this.keyword)
                this.getListMusic();
            })
    }
    // get list music from music service
    getListMusic() {
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
                        this.listMusic = this.listMusicVN.concat(this.listMusicInter);
                        this.onSearch(this.listMusic)
                    }
                )
            }
        )
    }
    onSearch(listMusic: Music[]) {
        this.listMusicSearing = [];
        this.listMusic.forEach((music: Music, index: number) => {
            let positionName: number = -1;
            let positonArtist: number = -1;
            let nameSong = music.name.toLowerCase();
            let artistSong = music.artist.toLowerCase();
            positionName = nameSong.search(this.keyword.toLowerCase());
            positonArtist = artistSong.search(this.keyword.toLowerCase());
            if (positionName !== -1 || positonArtist !== -1) {
                this.listMusicSearing.push(music);
            }
        })
        if (this.listMusicSearing.length === 0) {
            this.checkSearch = false;
        }
        else {
            this.checkSearch = true;
            this.getCatogorySong(this.listMusicSearing[0]);
        }
        // done process bar
        this.pService.done();
        this.animationloadServide.done();
    }
    // get category song to navigate route /nhacviet or /nhacquocte
    getCatogorySong(music: Music) {
        this.musicService.getSong(music.id).subscribe(song => {
            if (song.genre_name === 'Âu Mỹ, Pop') {
                this.linkName = '/nhacquocte';
            }
            else {
                this.linkName = '/nhacviet';

            }
        })
    }
    goBack() {
        this.router.navigate(['']);
    }

}
