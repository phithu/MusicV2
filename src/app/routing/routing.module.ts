import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SearchComponent } from '../search/search.component';
import { NotfoundpageComponent } from '../notfoundpage/notfoundpage.component';

const routesApp: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'search', children: [
            {
                path: ':keyworkd', component: SearchComponent
            },
            {
                path: '', component: NotfoundpageComponent
            }
        ]
    },
    {
        path: '**', component: NotfoundpageComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routesApp)
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule { }
