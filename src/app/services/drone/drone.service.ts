import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { devUrl, drones, allData, getOne, addData, editData, deleteData } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  constructor(
    private http: HttpClient
  ) { }


  getAll(): Promise<any> {
    return this.http.get(devUrl + drones + allData).toPromise();
  }

  getOne(droneId: string): Promise<any> {
    return this.http.get(devUrl + drones + getOne + droneId).toPromise();
  }

  addDrone(newDrone: any): Promise<any> {
    return this.http.post(devUrl + drones + addData, newDrone).toPromise();
  }

  editDrone(updatedDrone: any): Promise<any> {
    return this.http.put(devUrl + drones + editData, updatedDrone).toPromise();
  }

  deleteDrone(droneId: string): Promise<any> {
    return this.http.delete(devUrl + drones + deleteData + droneId).toPromise();
  }
}
