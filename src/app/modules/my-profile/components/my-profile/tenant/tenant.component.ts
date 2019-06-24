import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { PhotoUploadModalService } from '../../../../../shared/services/modal/photo-upload-modal.service';
import { PhotoEditModalService } from '../../../../../shared/services/modal/photo-edit-modal.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { DateSelectService } from '../../../../../shared/services/date-select.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

import { Tenant } from '../../../../../shared/models';
import { environment } from '../../../../../../environments/environment';
import { Countries } from '../../../../../../config/countries';
import { Validate } from '../../../../../../config/validate';
import { MyProfileService } from '../../../services/my-profile.service';

@Component({
  selector: 'app-my-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  tenant: Tenant;
  photo: string;
  photoDeleted = true;
  countries = Countries;
  years: string[];
  pattern = Validate;
  rate: number;

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

  tenantForm: FormGroup;

  constructor(
    private router: Router,
    private location: Location,
    private photoUploadModalService: PhotoUploadModalService,
    private photoEditModalService: PhotoEditModalService,
    private storageService: StorageService,
    private myProfileService: MyProfileService,
    private authService: AuthService,
    private dateSelectService: DateSelectService,
    private imageUploaderService: ImageUploaderService,
    private toastrService: ToastrService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private datepickerConfig: NgbDatepickerConfig
  ) {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    datepickerConfig.minDate = { year: year - 100, month: 1, day: 1};
    datepickerConfig.maxDate = { year: year - 18, month, day };
  }

  async ngOnInit() {
    try {
      const tenantId = this.storageService.get('tenantId');
      const tenantResponse = await this.authService.getTenant(tenantId);
      const tenant = tenantResponse.tenant;
      if (tenant.feedback.length !== 0) {
        const totalRate = tenant.feedback.reduce((total, currentValue) => {
          return total + currentValue.feedbackStar;
        }, 0);

        this.rate = parseInt((totalRate / tenant.feedback.length).toFixed(0), 10) - 1;
      }

      this.tenant = tenant;

      this.buildTenantForm();
    } catch (e) {
      console.log('TenantComponent->ngOnInit', e);
    }

    this.photoEditModalService.photoChanged.subscribe(photoURIData => {
      this.photo = photoURIData;
      this.uploadProfilePicture(photoURIData);
      this.photoDeleted = false;
    });

    this.years = this.dateSelectService.getYears();
  }

  buildTenantForm() {
    this.tenantForm = new FormGroup({
      lookingRent: new FormControl(this.tenant.lookingRent, Validators.required),
      mobile: new FormControl(this.tenant.mobile),
      placeOfBirth: new FormControl(this.tenant.placeOfBirth),
      dateOfBirth: new FormControl(this.tenant.dateOfBirth),
      nationality: new FormControl(this.tenant.nationality),
      spokenLanguages: new FormControl(this.tenant.spokenLanguages),
      currentCity: new FormControl(this.tenant.currentCity),
      highestLevelOfQualification: new FormControl(this.tenant.highestLevelOfQualification),
      education: new FormArray(this.tenant.education.length !== 0 ? this.tenant.education.map(education => {
        return new FormGroup({
          nameOfSchool: new FormControl(education.nameOfSchool),
          yearOfGraduation: new FormControl(education.yearOfGraduation)
        });
      }) : [new FormGroup({
        nameOfSchool: new FormControl(null),
        yearOfGraduation: new FormControl(null)
      })]),
      jobTitle: new FormArray(this.tenant.jobTitle.length !== 0 ? this.tenant.jobTitle.map(jobTitle => {
        return new FormControl(jobTitle);
      }) : [new FormControl(null)]),
      universitySpeciality: new FormControl(
        this.tenant.universitySpeciality
      ),
      currentWorkplace: new FormControl(
        this.tenant.currentWorkplace
      ),
      formerWorkplaces: new FormArray(this.tenant.formerWorkplaces.length !== 0 ? this.tenant.formerWorkplaces.map(formerWorkplaces => {
        return new FormControl(formerWorkplaces);
      }) : [new FormControl(null)]),
      monthlyIncome: new FormControl(this.tenant.monthlyIncome),
      otherText: new FormControl(this.tenant.otherText),
      freeTextIntroduction: new FormControl(
        this.tenant.freeTextIntroduction
      ),
      profilePicture: new FormControl(this.tenant.profilePicture)
    });
  }

  get jobTitle() {
    return this.tenantForm.get('jobTitle') as FormArray;
  }

  addJobTitle() {
    this.jobTitle.push(new FormControl(null));
  }

  get formerWorkplaces() {
    return this.tenantForm.get('formerWorkplaces') as FormArray;
  }

  addFormerWorkplaces() {
    this.formerWorkplaces.push(new FormControl(null));
  }

  get education() {
    return this.tenantForm.get('education') as FormArray;
  }

  addEducation() {
    this.education.push(new FormGroup({
      nameOfSchool: new FormControl(null),
      yearOfGraduation: new FormControl(null)
    }));
  }

  handleRentChange(address: Address) {
    this.tenantForm.get('lookingRent').setValue(address.formatted_address);
  }

  handlePlaceChange(address: Address) {
    this.tenantForm.get('placeOfBirth').setValue(address.formatted_address);
  }

  handleCurrentCityChange(address: Address) {
    this.tenantForm.get('currentCity').setValue(address.formatted_address);
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
    if (this.photo) {
      return 'url(' + this.photo + ')';
    } else if (this.tenantForm.get('profilePicture').value) {
      return `url(${environment.uploadBase}${this.tenantForm.get('profilePicture').value})`;
    } else {
      return '';
    }
  }

  onDeletePhoto() {
    this.tenantForm.patchValue({profilePicture: null});
    this.photo = '';
  }

  async uploadProfilePicture(photoURIData) {
    try {
      const blobData = this.imageUploaderService.b64toBlob(photoURIData);
      const filenames = await this.imageUploaderService.upload(blobData);
      this.tenantForm.patchValue({profilePicture: filenames[0]});
    } catch (e) {
      console.log('TenantComponent->uploadProfilePicture->error', e);
      this.toastrService.error('Something went wrong', 'Error');
    }
  }

  dateFormat(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('.');
  }

  async submit() {
    if (this.tenantForm.valid) {
      const tenantData = {
        ...this.tenantForm.value,
      };

      try {
        const tenant = {
          _id: this.tenant._id,
          ...tenantData
        };
        await this.myProfileService.updateTenant(tenant);

        this.toastrService.success('The tenant is updated successfully.', 'Success!');
      } catch (e) {
        console.log('TenantComponent->update->error', e);

        this.toastrService.error('Something went wrong', 'Error');
      }
    } else {
      this.validateFormFieldsService.validate(this.tenantForm);
    }
  }

}
