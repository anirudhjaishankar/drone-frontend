import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserViewComponent } from './views/user-view/user-view.component';
import { UserViewModule } from './views/user-view/user-view.module';
import { LoginComponent } from './views/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { HttpRequestInterceptor } from './services/HttpRequestInterceptor';
import { UsersComponent, UserAddDialogComponent } from './components/users/users.component';
import { gMapsApiKey } from './constants';
import { DronesComponent, DroneAddDialogComponent, DroneEditDialogComponent } from './components/drones/drones.component';
import { RoutesComponent, DroneRouteAddDialogComponent } from './components/routes/routes.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FeedComponent, DroneScheduleAddDialogComponent } from './components/feed/feed.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { VideoComponent } from './components/video/video.component';
import { MatVideoModule } from 'mat-video';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserViewComponent,
    UsersComponent,
    UserAddDialogComponent,
    // drones
    DronesComponent,
    DroneAddDialogComponent,
    DroneEditDialogComponent,

    // drone routes
    RoutesComponent,
    DroneRouteAddDialogComponent,


    // drone shedules
    FeedComponent,
    DroneScheduleAddDialogComponent,
    VideoComponent,


  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatRadioModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    UserViewModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: gMapsApiKey,
      libraries: ['places']
    }),
    NgbModule,
    FileUploadModule,
    MatVideoModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
