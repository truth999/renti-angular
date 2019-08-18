import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { PhotoUploadModalService } from '../../../../../shared/services/modal/photo-upload-modal.service';
import { PhotoEditModalService } from '../../../../../shared/services/modal/photo-edit-modal.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { DateSelectService } from '../../../../../shared/services/date-select.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';
import { MyProfileService } from '../../../services/my-profile.service';

import { Tenant } from '../../../../../shared/models';

import { environment } from '../../../../../../environments/environment';

import { Countries } from '../../../../../../config/countries';
import { Validate } from '../../../../../../config/validate';
import { config } from '../../../../../../config';
import { CONFIG_CONST } from '../../../../../../config/config-const';

declare var FB: any;
declare var IN: any;

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
  feedbackNumber: number;
  userConfig = config.user;
  Object = Object;
  AccountTypes = CONFIG_CONST.accountType;
  placeOptions = config.googleplaceOptions;

  tenantForm: FormGroup;

  keepOrder = (a, b) => {
    return a;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    private datepickerConfig: NgbDatepickerConfig,
    private translate: TranslateService
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
          return total + currentValue.feedbackStar.overall;
        }, 0);

        this.rate = totalRate / tenant.feedback.length;
        this.feedbackNumber = tenant.feedback.length;
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

    this.facebookInit();

    this.route.queryParams.subscribe(async (params: Params) => {
      if (params.code) {
        this.router.navigate([], {
          queryParams: { code: null },
          queryParamsHandling: 'merge'
        });

        try {
          const response = await this.myProfileService.getInstagramUserDetails(params.code);
          const instagramProfileUrl = `https://www.instagram.com/${response.data}`;
          this.tenantForm.get('socialMediaAvailabilities').get('instagram').setValue(instagramProfileUrl);
        } catch (e) {
          console.log('TenantComponent->getInstagramUserDetails', e);
        }
      }
    });
  }

  buildTenantForm() {
    this.tenantForm = new FormGroup({
      lookingRent: new FormGroup({
        address: new FormControl(!!this.tenant.lookingRent ? this.tenant.lookingRent.address : null, Validators.required),
        location: new FormControl(!!this.tenant.lookingRent ? this.tenant.lookingRent.location : null),
        addressTypes: new FormControl(!!this.tenant.lookingRent ? this.tenant.lookingRent.addressTypes : null)
      }),
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
      socialMediaAvailabilities: new FormGroup({
        facebook: new FormControl(!!this.tenant.socialMediaAvailabilities ? this.tenant.socialMediaAvailabilities.facebook : null),
        linkedin: new FormControl(!!this.tenant.socialMediaAvailabilities ? this.tenant.socialMediaAvailabilities.linkedin : null),
        instagram: new FormControl(!!this.tenant.socialMediaAvailabilities ? this.tenant.socialMediaAvailabilities.instagram : null)
      }),
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
    const addressTypes = {};

    address.address_components.map(addressComponent => {
      addressTypes[addressComponent.types[0]] = addressComponent.short_name;
    });

    this.tenantForm.get('lookingRent').get('address').setValue(address.formatted_address);
    this.tenantForm.get('lookingRent').get('location').setValue({
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    });
    this.tenantForm.get('lookingRent').get('addressTypes').setValue(addressTypes);
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
      const alert = this.translate.instant('ALERT.SOMETHING_WENT_WRONG');
      const error = this.translate.instant('ALERT.ERROR');
      this.toastrService.error(alert, error);
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

  facebookInit() {
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: environment.facebook.appId,
        cookie: true,
        xfbml: true,
        version: environment.facebook.version
      });
    };

    ((d, s, id) => {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  loginFacebook() {
    FB.login((response) => {
      if (response.status === 'connected') {
        FB.api('/me', res => {
          const urlName = res.name.toLowerCase().split(' ').join('');
          const profileUrl = 'https://www.facebook.com/' + urlName;
          this.tenantForm.get('socialMediaAvailabilities').get('facebook').setValue(profileUrl);
        });
      } else {
      }
    });
  }

  loginInstagram() {
    const clientId = environment.instagram.clientId;
    const redirectUri = environment.instagram.redirectUri;
    window.location.href = `
      https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code
    `;
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

        const alert = this.translate.instant('ALERT.PROFILE_UPDATED');
        const success = this.translate.instant('ALERT.SUCCESS');
        this.toastrService.success(alert, success);
      } catch (e) {
        console.log('TenantComponent->update->error', e);

        const alert = this.translate.instant('ALERT.SOMETHING_WENT_WRONG');
        const error = this.translate.instant('ALERT.ERROR');
        this.toastrService.error(alert, error);
      }
    } else {
      this.validateFormFieldsService.validate(this.tenantForm);
    }
  }

}
