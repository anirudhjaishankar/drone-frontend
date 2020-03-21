import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import 'firebase/firestore';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  username: string;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) { }


  login(): Promise<any> {
    return this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res) => {
      this.fireStore.collection('users').doc(res.user.uid).get().subscribe(data => {
        if (data.exists) {
          this.setLocalStorage(res, data.get('role'));
          return Promise.resolve();
        }
      });
    },
      (rej) => {
        return Promise.reject();
      }).catch(err => {
        console.log(err);
        return Promise.reject(err);
      });
  }


  setLocalStorage(res, role) {
    localStorage.clear();
    this.username = res.additionalUserInfo.profile.name;
    localStorage.setItem('ID_TOKEN', res.credential.idToken);
    localStorage.setItem('ACCESS_TOKEN', res.credential.accessToken);
    localStorage.setItem('EMAIL', res.additionalUserInfo.profile.email);
    localStorage.setItem('USERNAME', this.username);
    localStorage.setItem('ROLE', role);

  }
}
