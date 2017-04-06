/* Modules */
import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '@angular/material';
import { MusicModule } from './music/music.module';
import { NgProgressModule } from 'ng2-progressbar';
import { AnimationLoadModule } from './animation-load/animation-load.module';
enableProdMode()
/* Component */
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { SearchFormComponent } from './menu/search-form/search-form.component';
import { MenuLinkComponent } from './menu/menu-link/menu-link.component';
import { SearchComponent } from './search/search.component';


/* Routing */
import { RoutingModule } from './routing/routing.module';
/* Servide */
import { MusicService } from './music.service';
import { ShareDataService } from './share-data.service';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MenuComponent,
        SearchFormComponent,
        MenuLinkComponent,
        SearchComponent,
    ],
    imports: [
        MusicModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RoutingModule,
        MaterialModule,
        NgProgressModule,
        AnimationLoadModule,

    ],
    providers: [
        MusicService,
        ShareDataService,
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
