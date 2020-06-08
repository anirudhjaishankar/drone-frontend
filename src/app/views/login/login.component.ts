import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private  authService: AuthService,
    private router: Router,
    private fromBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fromBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(formData) {
    if (this.loginForm.valid) {
      this.authService.login(formData).then((data) => {
        localStorage.setItem('NAME', data.userData.userName);
        localStorage.setItem('ID', data.userData.userId);
        localStorage.setItem('ROLE', data.userData.userRole);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        this.authService.isLoggedIn = true;
        this.authService.name = data.userData.userName;
        this.authService.userRole = data.userData.userRole;
        this.router.navigate(['./home/dashboard']);
      }).catch(rej => {
        if (rej.status === 401) {
          this.snackBar.open('Wrong Credentials', 'Dismiss', { duration: 5000 });
        } else {
          console.log(rej);
          this.snackBar.open('Error Occured during login', 'Dismiss', { duration: 5000 });
        }

      });
    } else {
      this.snackBar.open('Invalid Details', 'Dismiss', { duration: 5000 });
    }

  }

}
