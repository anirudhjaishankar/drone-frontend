import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  title: string;
  username: string;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router
  ) {
    this.matIconRegistry.addSvgIcon(
      'drone',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/airplanemode_active-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'route',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/timeline-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/dashboard-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'feed',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/ondemand_video-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'location',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/my_location-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'settings',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/settings-24px.svg'));
    this.matIconRegistry.addSvgIcon(
      'logout',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/power_settings_new-24px.svg'));
  }

  ngOnInit() {
    this.title = 'DroneBlaze';
    setTimeout(() => {
      this.username = this.authService.username;
    }, 1000);
  }

  logout() {
    this.authService.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
