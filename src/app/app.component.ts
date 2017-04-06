import { Component } from '@angular/core';


@Component({
    selector: 'pt-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor() {}

    // hidden height body
    hiddenBody() {
        document.body.style.overflowY = 'hidden';
    }
    // show height body
    scrollBody() {
        document.body.style.overflowY = 'inherit';
    }
}
