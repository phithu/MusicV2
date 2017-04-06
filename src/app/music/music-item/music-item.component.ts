import { Component, OnInit, Input } from '@angular/core';
import { Music } from '../music';

@Component({
  selector: 'pt-music-item',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.scss']
})
export class MusicItemComponent implements OnInit {


  @Input('song') song: Music;
  // navigate to routes LinkName
  @Input('linkName') linkName: string;

  constructor() { }

  ngOnInit() {
  }

}
