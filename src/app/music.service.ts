import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Http, Response } from '@angular/http'
import { Music } from './music/music';
@Injectable()
export class MusicService {

  constructor(private http: Http) { }

  // get list music from api
  public getListMusic(url: string): Observable<Music[]> {
    return this.http.get(url)
      .map(response => response.json().data)
      .catch(this.handleError);
  }
  // get  a song from api
  public getSong(id: string): Observable<any> {
    let url = `https://cors-anywhere.herokuapp.com/http://api.mp3.zing.vn/api/mobile/song/getsonginfo?requestdata=%7B"id":"${id}"%7D`;
    return this.http.get(url)
      .map(response => response.json())
      .catch(this.handleError);

  }
  // get lyric's song
  public getLyric(urlLyric: string): Observable<string> {
    return this.http.get(urlLyric).map(response => response.text())
  }
  // handle error
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
