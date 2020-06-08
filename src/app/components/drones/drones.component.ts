import { Component, OnInit, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DroneService } from 'src/app/services/drone/drone.service';

@Component({
  selector: 'app-drones',
  templateUrl: './drones.component.html',
  styleUrls: ['./drones.component.scss']
})
export class DronesComponent implements OnInit {

  addDroneDialogRef: any;
  editDroneDialogRef: any;

  allDrones: any[];
  onlineDrones: any[];
  offlineDrones: any[];
  engagedDrones: any[];
  standbyDrones: any[];



  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private droneService: DroneService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.matIconRegistry.addSvgIcon(
      'add',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/add-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/edit-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/delete-24px.svg'));
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<any> {
    await this.droneService.getAll().then((data) => {
      console.log(data.message);
      this.allDrones = data.message;
      if (this.allDrones.length !== 0) {
        this.onlineDrones = this.allDrones.filter((droneData) => {
          if (droneData.status === 0) {
            return droneData;
          }
        });
        this.standbyDrones = this.allDrones.filter((droneData) => {
          if (droneData.role === 1) {
            return droneData;
          }
        });
        this.offlineDrones = this.allDrones.filter((droneData) => {
          if (droneData.role === 2) {
            return droneData;
          }
        });
        this.engagedDrones = this.allDrones.filter((droneData) => {
          if (droneData.role === 3) {
            return droneData;
          }
        });
      }
    });
  }

  // Functions to add drone

  addDrone(formData): Promise<boolean> {
    const droneData = {
      drone: {
        name: formData.name,
        status: 0,
        currentLocation: {
          name: 'origin',
          latitude: formData.location.lat,
          longitude: formData.location.long
        }
      }
    };

    return this.droneService.addDrone(droneData).then((data) => {
      if (data.status === 201) {
        return true;
      }
    }).catch((err) => {
      console.log(err);
      return false;
    });
  }

  addDroneDialogOpen() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.addDroneDialogRef = this.dialog.open(DroneAddDialogComponent, dialogConfig);

    this.addDroneDialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        const isAdded = await this.addDrone(result);
        if (isAdded) {
          this.snackBar.open('Drone added successfully', 'Dismiss', { duration: 5000 });
          this.getData();
        } else {
          this.snackBar.open('Failed to add drone', 'Dismiss', { duration: 5000 });
        }
      }
    });
  }


  // Functions to edit drone

  editDrone(updatedData): Promise<boolean> {

    const updatedDroneData = {
      drone: updatedData
    };

    return this.droneService.editDrone(updatedDroneData).then((data) => {
      if (data.status === 200) {
        return true;
      }
    }).catch((err) => {
      console.log(err);
      return false;
    });
  }

  editDroneDialogOpen(droneData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = droneData;
    this.editDroneDialogRef = this.dialog.open(DroneEditDialogComponent, dialogConfig);

    this.editDroneDialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        const isEdited = await this.editDrone(result);
        if (isEdited) {
          this.snackBar.open('Drone edited successfully', 'Dismiss', { duration: 5000 });
          this.getData();
        } else {
          this.snackBar.open('Failed to edit drone', 'Dismiss', { duration: 5000 });
        }
      }
    });
  }





  // Functions to delete drone


  deleteDrone(droneId): void {
    this.droneService.deleteDrone(droneId).then(res => {
      if (res.status === 200) {
        this.snackBar.open('Drone deleted successfully', 'Dismiss', { duration: 5000 });
        this.getData();
      }
    }).catch(err => {
      this.snackBar.open('Failed to delete drone', 'Dismiss', { duration: 5000 });
    });
  }
}


@Component({
  selector: 'app-drone-add-dialog',
  templateUrl: './drone-add-dialog.html',
  styleUrls: ['./drone-add-dialog.css']
})
export class DroneAddDialogComponent implements OnInit {

  form: FormGroup;
  latitude: any = 13.0827;
  longitude: any = 80.2707;
  zoom = 15;
  isPlacedMarker = false;

  constructor(
    public dialogRef: MatDialogRef<DroneAddDialogComponent>,
    public fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });

  }

  close(): void {
    this.dialogRef.close();
  }

  submit(formValue): void {
    if (this.form.valid) {
      const sendData = {
        name: formValue.name,
        location: {
          lat: this.latitude,
          long: this.longitude
        }
      };
      this.dialogRef.close(sendData);
    } else {
      this.snackBar.open('Invalid Details', 'Dismiss', { duration: 5000 });
    }
  }

  placeMarker($eventData) {
    this.latitude = $eventData.coords.lat;
    this.longitude = $eventData.coords.lng;
    this.isPlacedMarker = true;
  }

}

@Component({
  selector: 'app-drone-edit-dialog',
  templateUrl: './drone-edit-dialog.html',
  styleUrls: ['./drone-edit-dialog.css']
})
export class DroneEditDialogComponent implements OnInit {

  form: FormGroup;
  latitude: any = this.data.currentLocation.latitude;
  longitude: any = this.data.currentLocation.longitude;
  zoom = 15;
  isPlacedMarker = true;

  constructor(
    public dialogRef: MatDialogRef<DroneEditDialogComponent>,
    public fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: [this.data.name, [Validators.required]]
    });

  }

  close(): void {
    this.dialogRef.close();
  }

  submit(formValue): void {
    if (this.form.valid) {
      this.data.name = formValue.name;
      this.data.currentLocation.latitude = this.latitude;
      this.data.currentLocation.longitude = this.longitude;
      this.dialogRef.close(this.data);
    } else {
      this.snackBar.open('Invalid Details', 'Dismiss', { duration: 5000 });
    }
  }

  placeMarker($eventData) {
    this.latitude = $eventData.coords.lat;
    this.longitude = $eventData.coords.lng;
    this.isPlacedMarker = true;
  }

}
