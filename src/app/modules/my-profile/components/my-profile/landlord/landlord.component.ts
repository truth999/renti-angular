import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PhotoEditModalService } from '../../../../../shared/services/modal/photo-edit-modal.service';
import { PhotoUploadModalService } from '../../../../../shared/services/modal/photo-upload-modal.service';
import { LandlordService } from '../../../services/landlord.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { DateSelectService } from '../../../../../shared/services/date-select.service';

import { Landlord } from '../../../../../shared/models';
import { config } from '../../../../../../config';

@Component({
  selector: 'app-my-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  user: any;
  landlordId: string;
  landlord: Landlord;
  photo: string;
  photoDeleted = true;
  countries = config.countries;
  days: string[];
  months: string[];
  years: string[];

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
    private imageUploaderService: ImageUploaderService,
    private authService: AuthService,
    private dateSelectService: DateSelectService
  ) { }

  async ngOnInit() {
    try {
      const userResponse = await this.authService.getUser();
      this.user = userResponse.user;
      this.landlordId = userResponse.user.landlordId;
    } finally {
    }

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

    this.days = this.dateSelectService.getDays();
    this.months = this.dateSelectService.getMonths();
    this.years = this.dateSelectService.getYears();
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
        day: new FormControl(!!this.landlord ? dateOfBirthArray[0] : '', Validators.required),
        month: new FormControl(!!this.landlord ? dateOfBirthArray[1] : '', Validators.required),
        year: new FormControl(!!this.landlord ? dateOfBirthArray[2] : '', Validators.required)
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

  setBirthDate() {
    let daysInMonth = null;
    const date = new Date();

    if (this.landlordForm.get('dateOfBirth').get('year').value) {
      date.setFullYear(+this.landlordForm.get('dateOfBirth').get('year').value);
    }

    if (this.landlordForm.get('dateOfBirth').get('month').value) {
      date.setMonth(+this.landlordForm.get('dateOfBirth').get('month').value, 0);
      daysInMonth = date.getDate();
      this.days = this.dateSelectService.getDays(daysInMonth);

      if (typeof daysInMonth === 'number' && daysInMonth < +this.landlordForm.get('dateOfBirth').get('day').value) {
        this.landlordForm.get('dateOfBirth').get('day').setErrors(Validators.required);
      }
    }
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
        await this.landlordService.createLandlord(this.landlord);
      } else {
        await this.landlordService.updateLandlord(this.landlord);
      }
      this.router.navigate(['/app/profile']);
    } finally {
    }
  }

}
