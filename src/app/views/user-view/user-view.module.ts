import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { DronesComponent } from 'src/app/components/drones/drones.component';
import { RoutesComponent } from 'src/app/components/routes/routes.component';
import { FeedComponent } from 'src/app/components/feed/feed.component';
import { LocationComponent } from 'src/app/components/location/location.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { UserViewRoutingModule } from './user-view-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    DronesComponent,
    RoutesComponent,
    FeedComponent,
    LocationComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    UserViewRoutingModule
  ]
})
export class UserViewModule { }
