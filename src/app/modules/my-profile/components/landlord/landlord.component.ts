import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PhotoEditModalService } from '../../../../shared/services/modal/photo-edit-modal.service';
import { PhotoUploadModalService } from '../../../../shared/services/modal/photo-upload-modal.service';
import { LandlordService } from '../../services/landlord.service';
import { StorageService } from '../../../../core/services/storage.service';
import { ImageUploaderService } from '../../../../core/services/image-uploader.service';

import { Landlord } from '../../../../shared/models';

@Component({
  selector: 'app-my-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  landlordId: string;
  landlord: Landlord;
  photo = '/assets/images/profile/landlord.png';
  photoDeleted = false;

  spokenLanguagesVal = [
    'Hungarian',
    'English',
    'Arabic',
    'Chinese',
    'French',
    'German',
    'Hindi',
    'Hindi',
    'Japanese',
    'Romanian',
    'Russian',
    'Slovakian',
    'Spanish',
    'Other'
  ];

  password = '';
  passwordStrengthBarLabel = '';
  baseColor = '#dbdce8';
  phone: string;

  isAgency = false;

  landlordForm: FormGroup;

  constructor(
    private location: Location,
    private router: Router,
    private photoEditModalService: PhotoEditModalService,
    private photoUploadModalService: PhotoUploadModalService,
    private landlordService: LandlordService,
    private storageService: StorageService,
    private imageUploaderService: ImageUploaderService
  ) { }

  async ngOnInit() {
    this.landlordId = this.storageService.get('landlordId');

    try {
      if (!!this.landlordId) {
        const response = await this.landlordService.getLandlord(this.landlordId);
        this.landlord = response.landlord;
      }
      this.buildLandlordForm();
      this.isAgency = this.landlord.isPerson !== true;
    } finally {
    }

    this.photoEditModalService.photoChanged.subscribe(photo => {
      this.photo = photo;
      this.photoDeleted = false;
    });
  }

  buildLandlordForm() {
    const dateOfBirthArray = !!this.landlord ? this.landlord.dateOfBirth.split('-') : '';

    this.landlordForm = new FormGroup({
      mobile: new FormControl(!!this.landlord ? this.landlord.mobile : '', Validators.required),
      placeOfBirth: new FormGroup({
        country: new FormControl(!!this.landlord ? this.landlord.placeOfBirth.country : ''),
        city: new FormControl(!!this.landlord ? this.landlord.placeOfBirth.city : '')
      }),
      dateOfBirth: new FormGroup({
        day: new FormControl(!!this.landlord ? dateOfBirthArray[0] : ''),
        month: new FormControl(!!this.landlord ? dateOfBirthArray[1] : ''),
        year: new FormControl(!!this.landlord ? dateOfBirthArray[2] : '')
      }),
      nationality: new FormControl(!!this.landlord ? this.landlord.nationality : ''),
      spokenLanguages: new FormControl(!!this.landlord ? this.landlord.spokenLanguages : '', Validators.required),
      isPerson: new FormControl(!!this.landlord ? this.landlord.isPerson : '', Validators.required),
      nameOfAgency: new FormControl(!!this.landlord ? this.landlord.nameOfAgency : '', Validators.required)
    });
  }

  get mobile() {
    return this.landlordForm.get('mobile');
  }

  get spokenLanguages() {
    return this.landlordForm.get('spokenLanguages');
  }

  get isPerson() {
    return this.landlordForm.get('isPerson');
  }

  get nameOfAgency() {
    return this.landlordForm.get('nameOfAgency');
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

  onChange(event) {
    this.isAgency = event.target.value === '1: false';
  }

  onOpenPhotoUploadModal() {
    this.photoUploadModalService.show();
  }

  onOpenPhotoEditModal() {
    this.photoEditModalService.show(this.photo);
  }

  getPhotoUrl() {
    if (this.photoDeleted) {
      return;
    } else {
      return 'url(' + this.photo + ')';
    }
  }

  onDeletePhoto() {
    this.photoDeleted = true;
  }

  async update() {
    const landlordData = {
      userId: this.storageService.get('userId'),
      ...this.landlordForm.value,
      profilePicture: 'aaa'
    };

    landlordData.dateOfBirth = landlordData.dateOfBirth.day + '-' + landlordData.dateOfBirth.month + '-' + landlordData.dateOfBirth.year;

    if (!this.isAgency) {
      landlordData.nameOfAgency = '';
    }

    this.landlord = {...this.landlord, ...landlordData};

    try {
      if (!this.landlordId) {
        const response = await this.landlordService.createLandlord(this.landlord);
        this.landlord = response.landlord;
        this.storageService.save('landlordId', this.landlord._id);
      } else {
        await this.landlordService.updateLandlord(this.landlord);
      }
      this.router.navigate(['/app/profile/landlord']);
    } finally {
    }
  }

}
