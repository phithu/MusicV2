import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Music } from '../music/music';
import { NgProgressService } from "ng2-progressbar";
import { AnimationLoadService } from '../animation-load/animation-load.service';

@Component({
    selector: 'pt-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


    constructor(
        private pService: NgProgressService,
        private animationloadServide: AnimationLoadService
    ) { }

    @ViewChild('container') container: ElementRef;

    ngOnInit() {
        this.pService.start();
        this.animationloadServide.start();
    }
    loadedMusic(e) {
        if (e === true) {
            this.pService.done();
            this.animationloadServide.done();
        }
    }


}
