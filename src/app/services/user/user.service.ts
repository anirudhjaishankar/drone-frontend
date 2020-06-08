import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { devUrl, users, allData, getOne, addData, editData, deleteData,  } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Promise<any> {
    return this.http.get(devUrl + users + allData).toPromise();
  }

  getOne(userId: string): Promise<any> {
    return this.http.get(devUrl + users + getOne + userId).toPromise();
  }

  addUser(newUser: any): Promise<any> {
    return this.http.post(devUrl + users + addData, newUser).toPromise();
  }

  editUser(updatedUser: any): Promise<any> {
    return this.http.put(devUrl + users + editData, updatedUser).toPromise();
  }

  deleteUser(userId: string): Promise<any> {
    return this.http.delete(devUrl + users + deleteData + userId).toPromise();
  }
}
