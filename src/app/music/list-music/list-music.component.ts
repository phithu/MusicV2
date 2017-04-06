import { Component, OnInit, Input } from '@angular/core';
import { Music } from '../music';

@Component({
  selector: 'pt-list-music',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.scss']
})
export class ListMusicComponent implements OnInit {


  @Input('listMusic') listMusic: Music[];
  // navigate to routes linkName
  @Input('linkName') linkName: string;
  // number songs to display
  @Input('numbersongs') numbersongs: number;
  // width 100% for item children
  @Input('isBlock') isBlock: boolean;

  constructor() {

   }

  ngOnInit() {
  }

}
