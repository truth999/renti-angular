import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'app-my-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  data: any;
  cropperSettings: CropperSettings;

  constructor(
    private location: Location,
    private router: Router
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 140;
    this.cropperSettings.height = 140;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};
  }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

  onMyProperties() {
    this.router.navigate(['/app/rentals/my-properties']);
  }

  onSettings() {
    this.router.navigate(['/app/settings']);
  }

}
