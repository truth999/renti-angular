import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { PhotoUploadModalService } from '../../../../shared/services/modal/photo-upload-modal.service';
import { PhotoEditModalService } from '../../../../shared/services/modal/photo-edit-modal.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { StorageService } from '../../../../core/services/storage.service';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-my-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  photo = '/assets/images/profile/tenant.png';
  photoDeleted = false;

  spokenLanguages = [
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

  tenantForm: FormGroup;

  educationCount = [];
  jobTitleValue = [];
  formerWorkplacesCount = [];

  constructor(
    private router: Router,
    private location: Location,
    private photoUploadModalService: PhotoUploadModalService,
    private photoEditModalService: PhotoEditModalService,
    private storageService: StorageService,
    private tenantService: TenantService
  ) { }

  ngOnInit() {
    this.photoEditModalService.photoChanged.subscribe(photo => {
      this.photo = photo;
      this.photoDeleted = false;
    });

    this.educationCount.length = 1;
    this.formerWorkplacesCount.length = 1;

    if (this.storageService.get('tenantId') !== '') {
      this.tenantService.get(this.storageService.get('tenantId'));
      this.tenantService.tenantChanged.subscribe(tenants => {
        const dateOfBirthArray = tenants.dateOfBirth.split('-');
        this.tenantForm.patchValue({
          mobile: tenants.mobile,
          placeOfBirth: {
            country: tenants.placeOfBirth.country,
            city: tenants.placeOfBirth.city
          },
          dateOfBirth: {
            day: dateOfBirthArray[0],
            month: dateOfBirthArray[1],
            year: dateOfBirthArray[2]
          },
          nationality: tenants.nationality,
          spokenLanguages: tenants.spokenLanguages,
          currentCity: {
            country: tenants.currentCity.country,
            city: tenants.currentCity.city
          },
          highestLevelOfQualification: tenants.highestLevelOfQualification,
          education: {
            nameOfSchool: tenants.education.nameOfSchool,
            yearOfGraduation: tenants.education.yearOfGraduation
          },
          jobTitle: tenants.jobTitle,
          universitySpeciality: tenants.universitySpeciality,
          currentWorkplace: tenants.currentWorkplace,
          formerWorkplaces: tenants.formerWorkplaces,
          monthlyIncome: tenants.monthlyIncome,
          otherText: tenants.otherText,
          freeTextIntroduction: tenants.freeTextIntroduction
        });
      });
    }

    this.tenantForm = new FormGroup({
      mobile: new FormControl(null),
      placeOfBirth: new FormGroup({
        country: new FormControl(null),
        city: new FormControl(null)
      }),
      dateOfBirth: new FormGroup({
        day: new FormControl(null),
        month: new FormControl(null),
        year: new FormControl(null)
      }),
      nationality: new FormControl(null),
      spokenLanguages: new FormControl(null),
      currentCity: new FormGroup({
        country: new FormControl(null),
        city: new FormControl(null)
      }),
      highestLevelOfQualification: new FormControl(null),
      education: new FormGroup({
        nameOfSchool: new FormControl(null),
        yearOfGraduation: new FormControl(null)
      }),
      jobTitle: new FormArray([
        new FormControl(null)
      ]),
      universitySpeciality: new FormControl(null),
      currentWorkplace: new FormControl(null),
      formerWorkplaces: new FormControl(null),
      monthlyIncome: new FormControl(null),
      otherText: new FormControl(null),
      freeTextIntroduction: new FormControl(null),
    });
  }

  get jobTitle() {
    return this.tenantForm.get('jobTitle') as FormArray;
  }

  addJobTitle() {
    this.jobTitle.push(new FormControl(null));
  }

  onSettings() {
    this.router.navigate(['/app/settings']);
  }

  onBack() {
    this.location.back();
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

  update() {
    const tenantData = {
      userId: this.storageService.get('userId'),
      ...this.tenantForm.value,
      profilePicture: 'aaa'
    };

    tenantData.dateOfBirth = tenantData.dateOfBirth.day + '-' + tenantData.dateOfBirth.month + '-' + tenantData.dateOfBirth.year;

    if (this.storageService.get('tenantId') === '') {
      this.tenantService.create(tenantData);
    } else {
      this.tenantService.update(this.storageService.get('tenantId'), tenantData);
    }
  }

}
