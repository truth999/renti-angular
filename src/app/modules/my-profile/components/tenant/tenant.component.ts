import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { PhotoUploadModalService } from '../../../../shared/services/modal/photo-upload-modal.service';
import { PhotoEditModalService } from '../../../../shared/services/modal/photo-edit-modal.service';
import { StorageService } from '../../../../core/services/storage.service';
import { TenantService } from '../../services/tenant.service';

import { Tenant } from '../../../../shared/models';

@Component({
  selector: 'app-my-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  tenantId: string;
  tenant: Tenant;
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

  constructor(
    private router: Router,
    private location: Location,
    private photoUploadModalService: PhotoUploadModalService,
    private photoEditModalService: PhotoEditModalService,
    private storageService: StorageService,
    private tenantService: TenantService
  ) { }

  async ngOnInit() {
    this.tenantId = this.storageService.get('tenantId');

    try {
      if (!!this.tenantId) {
        const response = await this.tenantService.getTenant(this.tenantId);
        this.tenant = response.tenant;
      }
      this.buildTenantForm();
    } finally {
    }

    this.photoEditModalService.photoChanged.subscribe(photo => {
      this.photo = photo;
      this.photoDeleted = false;
    });
  }

  buildTenantForm() {
    const dateOfBirthArray = !!this.tenant ? this.tenant.dateOfBirth.split('-') : '';

    this.tenantForm = new FormGroup({
      mobile: new FormControl(!!this.tenant ? this.tenant.mobile : '', Validators.required),
      placeOfBirth: new FormGroup({
        country: new FormControl(!!this.tenant ? this.tenant.placeOfBirth.country : '', Validators.required),
        city: new FormControl(!!this.tenant ? this.tenant.placeOfBirth.city : '', Validators.required)
      }),
      dateOfBirth: new FormGroup({
        day: new FormControl(!!this.tenant ? dateOfBirthArray[0] : '', Validators.required),
        month: new FormControl(!!this.tenant ? dateOfBirthArray[1] : '', Validators.required),
        year: new FormControl(!!this.tenant ? dateOfBirthArray[2] : '', Validators.required)
      }),
      nationality: new FormControl(!!this.tenant ? this.tenant.nationality : '', Validators.required),
      spokenLanguages: new FormControl(!!this.tenant ? this.tenant.spokenLanguages : '', Validators.required),
      currentCity: new FormGroup({
        country: new FormControl(!!this.tenant ? this.tenant.currentCity.country : '', Validators.required),
        city: new FormControl(!!this.tenant ? this.tenant.currentCity.city : '', Validators.required)
      }),
      highestLevelOfQualification: new FormControl(!!this.tenant ? this.tenant.highestLevelOfQualification : '', Validators.required),
      education: new FormArray(!!this.tenant ? this.tenant.education.map(education => {
        return new FormGroup({
          nameOfSchool: new FormControl(education.nameOfSchool),
          yearOfGraduation: new FormControl(education.yearOfGraduation)
        });
      }) : [new FormGroup({
        nameOfSchool: new FormControl(''),
        yearOfGraduation: new FormControl('')
      })]),
      jobTitle: new FormArray(!!this.tenant ? this.tenant.jobTitle.map(jobTitle => {
        return new FormControl(jobTitle, Validators.required);
      }) : [new FormControl('', Validators.required)]),
      universitySpeciality: new FormControl(!!this.tenant ? this.tenant.universitySpeciality : '', Validators.required),
      currentWorkplace: new FormControl(!!this.tenant ? this.tenant.currentWorkplace : '', Validators.required),
      formerWorkplaces: new FormArray(!!this.tenant ?  this.tenant.formerWorkplaces.map(formerWorkplaces => {
        return new FormControl(formerWorkplaces);
      }) : [new FormControl('')]),
      monthlyIncome: new FormControl(!!this.tenant ? this.tenant.monthlyIncome : '', Validators.required),
      otherText: new FormControl(!!this.tenant ? this.tenant.otherText : ''),
      freeTextIntroduction: new FormControl(!!this.tenant ? this.tenant.freeTextIntroduction : ''),
    });
  }

  get jobTitle() {
    return this.tenantForm.get('jobTitle') as FormArray;
  }

  addJobTitle() {
    this.jobTitle.push(new FormControl(''));
  }

  get formerWorkplaces() {
    return this.tenantForm.get('formerWorkplaces') as FormArray;
  }

  addFormerWorkplaces() {
    this.formerWorkplaces.push(new FormControl(''));
  }

  get education() {
    return this.tenantForm.get('education') as FormArray;
  }

  addEducation() {
    this.education.push(new FormGroup({
      nameOfSchool: new FormControl(''),
      yearOfGraduation: new FormControl('')
    }));
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

  async update() {
    const tenantData = {
      userId: this.storageService.get('userId'),
      ...this.tenantForm.value,
      profilePicture: 'aaa'
    };

    tenantData.dateOfBirth = tenantData.dateOfBirth.day + '-' + tenantData.dateOfBirth.month + '-' + tenantData.dateOfBirth.year;

    this.tenant = {...this.tenant, ...tenantData};

    try {
      if (!this.tenantId) {
        const response = await this.tenantService.createTenant(this.tenant);
        this.tenant = response.tenant;
        this.storageService.save('tenantId', this.tenant._id);
      } else {
        await this.tenantService.updateTenant(this.tenant);
      }
      this.router.navigate(['/app/profile/tenant']);
    } finally {
    }
  }

}
