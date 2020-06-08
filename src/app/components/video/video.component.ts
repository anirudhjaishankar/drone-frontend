import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {Location} from '@angular/common';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private location: Location
  ) {
    this.matIconRegistry.addSvgIcon(
      'back',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/arrow_back-24px.svg'));
  }

  ngOnInit(): void {

  }

  goBack() {
    this.location.back();
  }

}
