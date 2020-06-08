import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/models/users';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsers: User[];
  adminUsers: User[];
  standardUsers: User[];
  displayedColumns = ['name', 'email', 'delete'];
  displayedColumns1 = ['name', 'email'];
  userDialog: any;


  constructor(
    private userService: UserService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
    await this.userService.getAll().then((data) => {
      this.allUsers = data.message;
      this.adminUsers = this.allUsers.filter((userData) => {
        if (userData.role === 1) {
          return userData;
        }
      });
      this.standardUsers = this.allUsers.filter((userData) => {
        if (userData.role === 0) {
          return userData;
        }
      });
    });
  }


  addUser(formData): Promise<boolean> {
    const userData = {
      user: {
        name: formData.name,
        email: formData.email
      }
    };

    return this.userService.addUser(userData).then((data) => {
      if (data.status === 201) {
        return true;
      }
    }).catch((err) => {
      console.log(err);
      return false;
    });
  }


  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.userDialog = this.dialog.open(UserAddDialogComponent, dialogConfig);

    this.userDialog.afterClosed().subscribe(async result => {
      if (result != null) {
        const isAdded = await this.addUser(result);
        if (isAdded === true) {
          this.snackBar.open('User Added Successfully', 'Dismiss', { duration: 5000 });
          this.getData();
        }
      }
    });
  }

  deleteUser(data): void {
    this.userService.deleteUser(data.id).then((res) => {
      if (res.status === 200) {
        this.snackBar.open('User Deleted Successfully', 'Dismiss', { duration: 5000 });
        this.getData();
      }
    }).catch((err) => {
      console.log(err);
      this.snackBar.open('User Delete Failed', 'Dismiss', { duration: 5000 });
     });
  }

}


@Component({
  selector: 'app-user-add-dialog',
  templateUrl: './user-add-dialog.html',
  styleUrls: ['./user-add-dialog.css']
})
export class UserAddDialogComponent implements OnInit {

  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserAddDialogComponent>,
    public fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]]
    });

  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.valid) {
      // console.log(this.form.value);
      this.dialogRef.close(this.form.value);
    } else {
      this.snackBar.open('Invalid Details', 'Dismiss', { duration: 5000 });
    }

  }
}
