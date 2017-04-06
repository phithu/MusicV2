import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pt-menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss']
})
export class MenuLinkComponent implements OnInit {

  @Input("sidenavMenu") sidenavMenu: any;

  constructor() { }

  ngOnInit() {
  }
  onClick(event) {
    let widthWindow = event.view.outerWidth;
    if (widthWindow < 767) {
      this.sidenavMenu.close();
    }
  }

}
