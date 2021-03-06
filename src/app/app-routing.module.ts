import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppAuthGuard } from './app-authguard';

import { HomeComponent } from './home/home.component';
import { SearchAnimeComponent } from './search-anime/search-anime.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchUsersComponent } from './search-users/search-users.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'search', component: SearchAnimeComponent },
  { path: 'details', component: AnimeDetailsComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AppAuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'users',
    component: SearchUsersComponent,
    canActivate: [AppAuthGuard]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
