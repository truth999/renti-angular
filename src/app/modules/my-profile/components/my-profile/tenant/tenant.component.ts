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
import { TenantService } from '../../../services/tenant.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { DateSelectService } from '../../../../../shared/services/date-select.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';
import { CursorWaitService } from '../../../../../core/services/cursor-wait.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

import { Tenant, User } from '../../../../../shared/models';
import { environment } from '../../../../../../environments/environment';
import { Countries } from '../../../../../../config/countries';
import { Validate } from '../../../../../../config/validate';

@Component({
  selector: 'app-my-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  user: User;
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
    private tenantService: TenantService,
    private authService: AuthService,
    private dateSelectService: DateSelectService,
    private imageUploaderService: ImageUploaderService,
    private toastrService: ToastrService,
    private cursorWaitService: CursorWaitService,
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
      this.cursorWaitService.enable();

      const response = await this.authService.getAuthUser();
      this.user = response.user;

      if (!!response.user.tenant) {
        this.tenant = response.user.tenant;
        this.rate = response.user.tenant.rank * .05;
      }

      this.buildTenantForm();
    } catch (e) {
      console.log('TenantComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
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
      lookingRent: new FormControl(!!this.tenant ? this.tenant.lookingRent : null, Validators.required),
      mobile: new FormControl(!!this.tenant ? this.tenant.mobile : null),
      placeOfBirth: new FormControl(!!this.tenant ? this.tenant.placeOfBirth : null),
      dateOfBirth: new FormControl(!!this.tenant ? this.tenant.dateOfBirth : null),
      nationality: new FormControl(!!this.tenant ? this.tenant.nationality : null),
      spokenLanguages: new FormControl(!!this.tenant ? this.tenant.spokenLanguages : null),
      currentCity: new FormControl(!!this.tenant ? this.tenant.currentCity : null),
      highestLevelOfQualification: new FormControl(!!this.tenant ? this.tenant.highestLevelOfQualification : null),
      education: new FormArray(!!this.tenant ? this.tenant.education.map(education => {
        return new FormGroup({
          nameOfSchool: new FormControl(education.nameOfSchool),
          yearOfGraduation: new FormControl(education.yearOfGraduation)
        });
      }) : [new FormGroup({
        nameOfSchool: new FormControl(null),
        yearOfGraduation: new FormControl(null)
      })]),
      jobTitle: new FormArray(!!this.tenant ? this.tenant.jobTitle.map(jobTitle => {
        return new FormControl(jobTitle);
      }) : [new FormControl(null)]),
      universitySpeciality: new FormControl(
        !!this.tenant ? this.tenant.universitySpeciality : null
      ),
      currentWorkplace: new FormControl(
        !!this.tenant ? this.tenant.currentWorkplace : null
      ),
      formerWorkplaces: new FormArray(!!this.tenant ?  this.tenant.formerWorkplaces.map(formerWorkplaces => {
        return new FormControl(formerWorkplaces);
      }) : [new FormControl(null)]),
      monthlyIncome: new FormControl(!!this.tenant ? this.tenant.monthlyIncome : null),
      otherText: new FormControl(!!this.tenant ? this.tenant.otherText : null),
      freeTextIntroduction: new FormControl(
        !!this.tenant ? this.tenant.freeTextIntroduction : null
      ),
      profilePicture: new FormControl(!!this.tenant ? this.tenant.profilePicture : null)
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

  onViewAs() {
    this.router.navigate(['/app/profile', this.user._id]);
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

  // async onDelete() {
  //   try {
  //     await this.tenantService.deleteTenant(this.tenant._id);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async uploadProfilePicture(photoURIData) {
    try {
      this.cursorWaitService.enable();

      const blobData = this.imageUploaderService.b64toBlob(photoURIData);
      const filenames = await this.imageUploaderService.upload(blobData);
      this.tenantForm.patchValue({profilePicture: filenames[0]});
    } catch (e) {
      console.log('TenantComponent->uploadProfilePicture->error', e);
      this.toastrService.error('Something went wrong', 'Error');
    } finally {
      this.cursorWaitService.disable();
    }
  }

  async submit() {
    if (this.tenantForm.valid) {
      const tenantData = {
        userId: this.storageService.get('userId'),
        ...this.tenantForm.value,
      };

      try {
        this.cursorWaitService.enable();

        if (!this.tenant) {
          await this.tenantService.createTenant(tenantData);
        } else {
          this.tenant = {
            ...this.tenant,
            ...tenantData
          };
          await this.tenantService.updateTenant(this.tenant);
        }

        this.toastrService.success('The tenant is updated successfully.', 'Success!');
      } catch (e) {
        console.log('TenantComponent->update->error', e);

        this.toastrService.error('Something went wrong', 'Error');
      } finally {
        this.cursorWaitService.disable();
      }
    } else {
      this.validateFormFieldsService.validate(this.tenantForm);
    }
  }

}
