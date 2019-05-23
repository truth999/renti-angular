import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';

import { PhotoEditModalService } from '../../../../../shared/services/modal/photo-edit-modal.service';
import { PhotoUploadModalService } from '../../../../../shared/services/modal/photo-upload-modal.service';
import { LandlordService } from '../../../services/landlord.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { DateSelectService } from '../../../../../shared/services/date-select.service';

import { Landlord } from '../../../../../shared/models';

import { config } from '../../../../../../config';

import { environment } from '../../../../../../environments/environment';

export const dateOfBirthValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const day = control.get('day');
  const month = control.get('month');
  const year = control.get('year');

  return day && month && year && day.valid === true && month.valid === true && year.valid === true ? null : { required: true } ;
};

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
  isAgency = false;

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
  countries = config.countries;

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
    private dateSelectService: DateSelectService,
    private toastrService: ToastrService,
  ) { }

  async ngOnInit() {
    try {
      const userResponse = await this.authService.getUser();
      this.user = userResponse.user;

      this.landlordId = userResponse.user.landlordId;
      if (!!this.landlordId) {
        const response = await this.landlordService.getLandlord(this.landlordId);
        this.landlord = response.landlord;
      }
      this.buildLandlordForm();
      this.isAgency = !!this.landlord ? this.landlord.isPerson !== true : false;
    } finally {
    }

    this.photoEditModalService.photoChanged.subscribe(photoURIData => {
      this.photo = photoURIData;
      this.uploadProfilePicture(photoURIData);
      this.photoDeleted = false;
    });

    this.days = this.dateSelectService.getDays();
    this.months = this.dateSelectService.getMonths();
    this.years = this.dateSelectService.getYears();

    this.isPerson.value ? this.nameOfAgency.setErrors(null) : this.nameOfAgency.setValidators(Validators.required);
  }

  buildLandlordForm() {
    const dateOfBirthArray = !!this.landlord ? this.landlord.dateOfBirth.split('-') : '';

    this.landlordForm = new FormGroup({
      mobile: new FormControl(!!this.landlord ? this.landlord.mobile : '', Validators.required),
      profilePicture: new FormControl(!!this.landlord ? this.landlord.profilePicture : ''),
      placeOfBirth: new FormControl(!!this.landlord ? this.landlord.placeOfBirth : ''),
      dateOfBirth: new FormGroup({
        day: new FormControl(!!this.landlord ? dateOfBirthArray[0] : '', Validators.required),
        month: new FormControl(!!this.landlord ? dateOfBirthArray[1] : '', Validators.required),
        year: new FormControl(!!this.landlord ? dateOfBirthArray[2] : '', Validators.required)
      }, { validators: dateOfBirthValidator }),
      nationality: new FormControl(!!this.landlord ? this.landlord.nationality : ''),
      spokenLanguages: new FormControl(!!this.landlord ? this.landlord.spokenLanguages : '', Validators.required),
      isPerson: new FormControl(!!this.landlord ? this.landlord.isPerson : '', Validators.required),
      nameOfAgency: new FormControl(!!this.landlord ? this.landlord.nameOfAgency : '')
    });
  }

  get mobile() {
    return this.landlordForm.get('mobile');
  }

  get dateOfBirth() {
    return this.landlordForm.get('dateOfBirth');
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

  handleAddressChange(address: Address) {
    this.landlordForm.get('placeOfBirth').setValue(address.formatted_address);
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

  onViewAs() {
    this.router.navigate(['/app/profile', this.user.id]);
  }

  onIsPersonChange() {
    this.isAgency = !this.isPerson.value;
    this.isPerson.value ? this.nameOfAgency.setErrors(null) : this.nameOfAgency.setValidators(Validators.required);
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
    } else if (this.landlordForm.get('profilePicture').value) {
      return `url(${environment.uploadBase}${this.landlordForm.get('profilePicture').value})`;
    } else {
      return '';
    }
  }

  async onDeletePhoto() {
    try {
      this.landlordForm.patchValue({profilePicture: ''});
      this.photo = '';
      if (this.landlordId) {
        const landlord = new Landlord();
        landlord._id = this.landlord._id;
        landlord.profilePicture = '';
        await this.landlordService.updateLandlord(landlord);
        this.toastrService.success('The profile picture is deleted successfully.', 'Success!');
      }
    } catch (e) {
      console.log('LandlordComponent->onDeletePhoto->error', e);
      this.toastrService.error('Something went wrong', 'Error');
    }
  }

  async uploadProfilePicture(photoURIData) {
    try {
      const blobData = this.imageUploaderService.b64toBlob(photoURIData);
      const filenames = await this.imageUploaderService.upload(blobData);
      this.landlordForm.patchValue({profilePicture: filenames[0]});
    } catch (e) {
      console.log('LandlordComponent->uploadProfilePicture->error', e);
      this.toastrService.error('Something went wrong', 'Error');
    }
  }

  async update() {
    try {
      const landlordData = {
        userId: this.storageService.get('userId'),
        ...this.landlordForm.value,
      };

      landlordData.dateOfBirth = landlordData.dateOfBirth.day + '-' + landlordData.dateOfBirth.month + '-' + landlordData.dateOfBirth.year;

      if (!this.isAgency) {
        landlordData.nameOfAgency = '';
      }

      this.landlord = {...this.landlord, ...landlordData};
      if (!this.landlordId) {
        await this.landlordService.createLandlord(this.landlord);
      } else {
        await this.landlordService.updateLandlord(this.landlord);
      }
      this.toastrService.success('The landlord is updated successfully.', 'Success!');
      // this.router.navigate(['/app/profile']);
    } catch (e) {
      console.log('LandlordComponent->update->error', e);
      this.toastrService.error('Something went wrong', 'Error');
    } finally {
    }
  }

}
