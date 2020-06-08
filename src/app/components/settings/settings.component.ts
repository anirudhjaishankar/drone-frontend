import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models/users';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  changePasswordForm: FormGroup;
  userData: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {

    this.changePasswordForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    const user = await this.getData();
    this.userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    };
    this.changePasswordForm.patchValue({
      name: this.userData.name,
      email: this.userData.email
    });

  }

  submit(formData) {
    console.log(this.changePasswordForm.valid);
    if (this.changePasswordForm.valid) {
      if (formData.password !== formData.confirmPassword) {
        this.snackBar.open('Password not confirmed', 'Dismiss', { duration: 5000 });
      } else {
        this.userData.email = formData.email;
        this.userData.password = formData.password;
        this.userData.name = formData.name;
        const updatedUser = {
          user: this.userData
        };
        console.log(updatedUser);
        this.userService.editUser(updatedUser).then((res) => {
          this.snackBar.open('User Data Updated', 'Dismiss', { duration: 5000 });
        }).catch((rej) => {
          this.snackBar.open('Update Failed', 'Dismiss', { duration: 5000 });
        });
      }
    } else {
      this.snackBar.open('Invalid Details Submitted', 'Dismiss', { duration: 5000 });
    }
  }

  async getData(): Promise<any> {
    const userId = localStorage.getItem('ID');
    return this.userService.getOne(userId).then((res) => {
      return res.message;
    }).catch((err) => {
      console.log(err);
      this.snackBar.open('Data retrieve Failed', 'Dismiss', { duration: 5000 });
    });
  }


}
