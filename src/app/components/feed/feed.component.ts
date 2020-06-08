import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DroneroutesService } from 'src/app/services/droneroutes/droneroutes.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  addDroneScheduleDialogRef: any;

  allDroneSchedules: any[];
  ongoingSchedules: any[];
  scheduledSchedules: any[];
  completedSchedules: any[];
  uploadedSchedules: any[];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private droneScheduleService: ScheduleService,
    private dialog: MatDialog,
    private router: Router,
    private currentActivatedRoute: ActivatedRoute) {
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
    await this.droneScheduleService.getAll().then(data => {
      this.allDroneSchedules = data.message;
      console.log(this.allDroneSchedules);

      if (this.allDroneSchedules.length !== 0) {
        this.scheduledSchedules = this.allDroneSchedules.filter((scheduleData) => {
          if (scheduleData.status === 0) {
            return scheduleData;
          }
        });
        this.ongoingSchedules = this.allDroneSchedules.filter((scheduleData) => {
          if (scheduleData.status === 1) {
            return scheduleData;
          }
        });
        this.completedSchedules = this.allDroneSchedules.filter((scheduleData) => {
          if (scheduleData.status === 2) {
            return scheduleData;
          }
        });
        this.uploadedSchedules = this.allDroneSchedules.filter((scheduleData) => {
          if (scheduleData.status === 3) {
            return scheduleData;
          }
        });
      }
    });
  }



  addDroneScheduleDialogOpen() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.addDroneScheduleDialogRef = this.dialog.open(DroneScheduleAddDialogComponent, dialogConfig);
    this.addDroneScheduleDialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        if (result === true) {
          this.snackBar.open('Drone Schedule added successfully', 'Dismiss', { duration: 5000 });
          this.getData();
        } else {
          this.snackBar.open('Failed to add drone Schedule', 'Dismiss', { duration: 5000 });
        }
      }
    });
  }

  // Delete drone route
  deleteDroneSchedule(droneScheduleId): void {
    this.droneScheduleService.deleteDrone(droneScheduleId).then(res => {
      if (res.status === 200) {
        this.snackBar.open('Drone Route deleted successfully', 'Dismiss', { duration: 5000 });
        this.getData();
      }
    }).catch(err => {
      this.snackBar.open('Failed to delete drone route', 'Dismiss', { duration: 5000 });
    });
  }

  redirect(scheduleId) {
    this.router.navigate(['../feeds/' + scheduleId], { relativeTo: this.currentActivatedRoute });
  }

}

@Component({
  selector: 'app-drone-schedule-add-dialog',
  templateUrl: './drone-schedule-add-dialog.html',
  styleUrls: ['./drone-schedule-add-dialog.css']
})

export class DroneScheduleAddDialogComponent implements OnInit {

  form: FormGroup;
  allAvailableDrones: any[];
  allAvailableRoutes: any[];
  dateNow = Date.now();
  time: any;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  hostURL = 'http://localhost:3000/api/schedules/add/';


  isSchedule: string = 'true';


  constructor(
    public dialogRef: MatDialogRef<DroneScheduleAddDialogComponent>,
    public fb: FormBuilder,
    private droneRouteService: DroneroutesService,
    private droneService: DroneService,
    private droneScheduleService: ScheduleService,
  ) {
    this.uploader = new FileUploader({
      url: this.hostURL,
    });


    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;


  }

  ngOnInit(): void {

    this.droneService.getAll().then(data => {
      this.allAvailableDrones = data.message.filter((element) => {
        if (element.status === 0) {
          return element;
        }
      });
    });


    this.droneRouteService.getAll().then(data => {
      this.allAvailableRoutes = data.message;
    });

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      date: [],
      time: [],
      drone: ['', [Validators.required]],
      route: ['', [Validators.required]],
      file: []
    });

  }

  addDroneSchedule(formData) {
    const scheduleData = {
      schedule: {
        name: formData.name,
        drone: formData.drone,
        route: formData.route,
        dateTime: formData.dateTime,
        isVideo: this.isSchedule === 'false'
      }
    };
    console.log(scheduleData);

    return this.droneScheduleService.addDrone(scheduleData).then((data) => {
      if (data.status === 201) {
        this.dialogRef.close(true);
      }
    }).catch((err) => {
      console.log(err);
      this.dialogRef.close(false);
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }



}
