import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { DronesComponent } from 'src/app/components/drones/drones.component';
import { RoutesComponent } from 'src/app/components/routes/routes.component';
import { FeedComponent } from 'src/app/components/feed/feed.component';
import { LocationComponent } from 'src/app/components/location/location.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { UserViewComponent } from './user-view.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: UserViewComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'dashboard', component: DashboardComponent
    },
    {
      path: 'drones', component: DronesComponent
    },
    {
      path: 'routes', component: RoutesComponent
    },
    {
      path: 'feeds', component: FeedComponent
    },
    {
      path: 'location', component: LocationComponent
    },
    {
      path: 'settings', component: SettingsComponent
    }]
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserViewRoutingModule { }
