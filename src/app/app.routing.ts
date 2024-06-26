import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CalendarComponent} from './calendar/calendar.component'
import {CollectionsComponent} from './collections/collections.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {DiscoverComponent} from './discover/discover.component'
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { TvDetailsComponent } from './tv/tv-details/tv-details.component';
import { CollectionDetailsComponent } from './collections/collection-details/collection-details.component';
import { ActorDetailsComponent } from './actor/actor-details/actor-details.component';
import { GenreComponent } from './common/genre/genre.component';
import { DiscoverListComponent } from './discover/discover-list/discover-list.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { EpisodeDetailsComponent } from './tv/episode-details/episode-details.component';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';

const appRoutes: Routes = [
    {path: 'calendar', component: CalendarComponent},
    {path: 'collections', component: CollectionsComponent, canActivate: [AuthGuard], data: {permission: ['user', 'admin']}},
    {path: 'discover', component: DiscoverComponent},
    {path: 'movie/:id', component: MovieDetailsComponent},
    {path: 'tv/:id', component: TvDetailsComponent},
    {path: 'tv/:id/:name/:season/:episode', component: EpisodeDetailsComponent},
    {path: 'collections/:id', component: CollectionDetailsComponent, canActivate: [AuthGuard], data: {permission: ['user', 'admin']}},
    {path: 'actor/:id', component: ActorDetailsComponent},
    {path: 'genre/:type/:id', component: GenreComponent},
    {path: 'discover/:type/:id', component: DiscoverListComponent},
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {permission: ['admin']}},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard/:id', component: DashboardListComponent}
]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'})