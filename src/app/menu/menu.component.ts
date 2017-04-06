import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { SearchFormComponent } from './search-form/search-form.component';

@Component({
  selector: 'pt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {


  @Input("sidenavMenu") sidenavMenu: any;
  @Input("sidenavSearch") sidenavSearch: any;
  @Input('searchformComponent') searchformComponent:any;

  constructor() { }

  ngOnInit() {

  }
  // toggle sidenav menu
  toggleSideMenu() {
    this.sidenavMenu.toggle();
  }
  // open sidenav search
  toggleSideSearch() {
    // set state search form component is activeWidth
    this.searchformComponent.state = 'activeWidth';
    this.sidenavSearch.open();
  }

}
