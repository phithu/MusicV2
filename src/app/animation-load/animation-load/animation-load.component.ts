import { Component, OnInit } from '@angular/core';
import { AnimationLoadService } from '../animation-load.service';
import { state, trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'pt-animation-load',
    templateUrl: './animation-load.component.html',
    styleUrls: ['./animation-load.component.scss'],
    animations: [
        trigger('loading', [
            state('active', style(
                {
                    display: 'flex'
                }
            )),
            state('inactive', style(
                {
                    display: 'none'
                }
            )),
            transition('acitve <=> inactive', animate(300))
        ])
    ]

})
export class AnimationLoadComponent implements OnInit {

    public state: string;
    constructor(private animationloadService: AnimationLoadService) { }
    ngOnInit() {
        this.animationloadService.getValue().subscribe(value => {
            this.state = (value ? 'active' : 'inactive');
        })

    }

}
