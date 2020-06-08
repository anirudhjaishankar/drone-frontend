import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { devUrl, schedules, allData, getOne, addData, editData, deleteData } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Promise<any> {
    return this.http.get(devUrl + schedules + allData).toPromise();
  }

  getOne(droneRouteId: string): Promise<any> {
    return this.http.get(devUrl + schedules + getOne + droneRouteId).toPromise();
  }

  addDrone(newDroneRoute: any): Promise<any> {
    return this.http.post(devUrl + schedules + addData, newDroneRoute).toPromise();
  }

  deleteDrone(droneRouteId: string): Promise<any> {
    return this.http.delete(devUrl + schedules + deleteData + droneRouteId).toPromise();
  }
}
