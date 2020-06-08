import { Component, OnInit } from '@angular/core';
import { DroneroutesService } from 'src/app/services/droneroutes/droneroutes.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

  addDroneRouteDialogRef: any;
  editDroneRouteDialogRef: any;

  allDroneRoutes: any[];

  zoom = 15;
  latitude: any = 13.0827;
  longitude: any = 80.2707;


  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private droneRouteService: DroneroutesService
  ) {
    this.matIconRegistry.addSvgIcon(
      'add',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/add-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/delete-24px.svg'));
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<any> {
    await this.droneRouteService.getAll().then(data => {
      console.log(data.message);
      this.allDroneRoutes = data.message;
    });
  }


  addDroneRoute(formData): Promise<boolean> {
    const routeData = {
      droneRoute: {
        pathName: formData.name,
        numberOfCheckpoints: formData.locations.length,
        checkpoints: formData.locations,
        createdBy: localStorage.getItem('NAME')
      }
    };

    return this.droneRouteService.addDrone(routeData).then((data) => {
      if (data.status === 201) {
        return true;
      }
    }).catch((err) => {
      console.log(err);
      return false;
    });
  }

  addDroneRouteDialogOpen() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.addDroneRouteDialogRef = this.dialog.open(DroneRouteAddDialogComponent, dialogConfig);
    this.addDroneRouteDialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        const isAdded = await this.addDroneRoute(result);
        if (isAdded) {
          this.snackBar.open('Drone Route added successfully', 'Dismiss', { duration: 5000 });
          this.getData();
        } else {
          this.snackBar.open('Failed to add drone route', 'Dismiss', { duration: 5000 });
        }
      }
    });
  }

  // Delete drone route
  deleteDroneRoute(droneRouteId): void {
    this.droneRouteService.deleteDrone(droneRouteId).then(res => {
      if (res.status === 200) {
        this.snackBar.open('Drone Route deleted successfully', 'Dismiss', { duration: 5000 });
        this.getData();
      }
    }).catch(err => {
      this.snackBar.open('Failed to delete drone route', 'Dismiss', { duration: 5000 });
    });
  }




}


@Component({
  selector: 'app-drone-route-add-dialog',
  templateUrl: './drone-route-add-dialog.html',
  styleUrls: ['./drone-route-add-dialog.css']
})
export class DroneRouteAddDialogComponent implements OnInit {

  form: FormGroup;
  latitude: any = 13.0827;
  longitude: any = 80.2707;
  initialLocationName = 'A';
  zoom = 15;
  numberOfCheckpoints = 1;
  currentSelectedLocation: any;
  locations = [
    {
      name: 'Origin',
      latitude: this.latitude,
      longitude: this.longitude
    },

  ];

  constructor(
    public dialogRef: MatDialogRef<DroneRouteAddDialogComponent>,
    public fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });

  }

  close(): void {
    this.dialogRef.close();
  }

  submit(formValue): void {
    if (this.form.valid) {
      const sendData = {
        name: formValue.name,
        locations: this.locations
      };
      // console.log(sendData);
      this.dialogRef.close(sendData);
    } else {
      this.snackBar.open('Invalid Details', 'Dismiss', { duration: 5000 });
    }
  }

  placeMarker($eventData) {
    this.currentSelectedLocation.latitude = $eventData.coords.lat;
    this.currentSelectedLocation.longitude = $eventData.coords.lng;
  }

  addNewLocation() {
    this.locations.push({
      name: this.initialLocationName,
      latitude: this.latitude,
      longitude: this.longitude
    });

    console.log(this.locations);
    this.initialLocationName = String.fromCharCode(this.initialLocationName.charCodeAt(0) + 1);
  }

  changePosition($event) {
    const index = this.locations.findIndex(element => element.name === this.currentSelectedLocation.name);
    this.locations[index].latitude = $event.coords.lat;
    this.locations[index].longitude = $event.coords.lng;
  }

}
