import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  title: string;
  userLoggedIn: boolean = false;
  user: any = {};

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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
    this.userLoggedIn = true;
    this.user.userName = 'Anirudh Jaishanakar';
  }

}
