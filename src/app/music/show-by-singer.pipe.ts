import { Pipe, PipeTransform } from '@angular/core';
import { Music } from './music';

@Pipe({
    name: 'showBySinger'
})
export class ShowBySingerPipe implements PipeTransform {

    transform(listMusic: Music[], singer?: string, idCurrent?: string): Music[] {
        let singerSong: Array<Music> = [];
        listMusic.forEach((value: Music, index: number) => {
            let position = -1;
            let Artist = value.artist;
            position = singer.search(Artist);
            if (position !== -1 && value.id !== idCurrent) {
                singerSong.push(value);
            }
        })
        return singerSong;

    }

}
