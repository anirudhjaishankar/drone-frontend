import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { DronesComponent } from 'src/app/components/drones/drones.component';
import { RoutesComponent, DroneRouteAddDialogComponent } from 'src/app/components/routes/routes.component';
import { FeedComponent } from 'src/app/components/feed/feed.component';
import { LocationComponent } from 'src/app/components/location/location.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { UserViewRoutingModule } from './user-view-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DashboardComponent,
    LocationComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    UserViewRoutingModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule
  ]
})
export class UserViewModule { }
