import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { devUrl, droneRoutes, allData, getOne, addData, editData, deleteData } from 'src/app/constants';


@Injectable({
  providedIn: 'root'
})
export class DroneroutesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Promise<any> {
    return this.http.get(devUrl + droneRoutes + allData).toPromise();
  }

  getOne(droneRouteId: string): Promise<any> {
    return this.http.get(devUrl + droneRoutes + getOne + droneRouteId).toPromise();
  }

  addDrone(newDroneRoute: any): Promise<any> {
    return this.http.post(devUrl + droneRoutes + addData, newDroneRoute).toPromise();
  }

  editDrone(updatedDroneRoute: any): Promise<any> {
    return this.http.put(devUrl + droneRoutes + editData, updatedDroneRoute).toPromise();
  }

  deleteDrone(droneRouteId: string): Promise<any> {
    return this.http.delete(devUrl + droneRoutes + deleteData + droneRouteId).toPromise();
  }
}
