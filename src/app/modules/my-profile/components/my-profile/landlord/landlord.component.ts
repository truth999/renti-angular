import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { PhotoEditModalService } from '../../../../../shared/services/modal/photo-edit-modal.service';
import { PhotoUploadModalService } from '../../../../../shared/services/modal/photo-upload-modal.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

import { Feedback, Landlord } from '../../../../../shared/models';
import { environment } from '../../../../../../environments/environment';
import { Countries } from '../../../../../../config/countries';
import { Validate } from '../../../../../../config/validate';
import { MyProfileService } from '../../../services/my-profile.service';

@Component({
  selector: 'app-my-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  landlord: Landlord;
  photo: string;
  photoDeleted = true;
  isAgency = false;
  pattern = Validate;
  rate: number;

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
  countries = Countries;

  landlordForm: FormGroup;

  constructor(
    private location: Location,
    private router: Router,
    private photoEditModalService: PhotoEditModalService,
    private photoUploadModalService: PhotoUploadModalService,
    private myProfileService: MyProfileService,
    private storageService: StorageService,
    private imageUploaderService: ImageUploaderService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private validateFormFielsService: ValidateFormFieldsService,
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
      const landlordId = this.storageService.get('landlordId');
      const landlordResponse = await this.authService.getLandlord(landlordId);
      const landlord = landlordResponse.landlord;
      if (landlord.feedback.length !== 0) {
        const totalRate = landlord.feedback.reduce((total, currentValue) => {
          return total + currentValue.feedbackStar;
        }, 0);
        this.rate = parseInt((totalRate / landlord.feedback.length).toFixed(0), 10) - 1;
      }
      this.landlord = landlord;

      this.buildLandlordForm();
      this.isAgency = this.landlord.isPerson !== true;
    } catch (e) {
      console.log('LandlordComponent->ngOnInit', e);
    }

    this.photoEditModalService.photoChanged.subscribe(photoURIData => {
      this.photo = photoURIData;
      this.uploadProfilePicture(photoURIData);
      this.photoDeleted = false;
    });

    this.isPerson.value ? this.nameOfAgency.setErrors(null) : this.nameOfAgency.setValidators(Validators.required);
  }

  buildLandlordForm() {
    this.landlordForm = new FormGroup({
      mobile: new FormControl(this.landlord.mobile, Validators.required),
      profilePicture: new FormControl(this.landlord.profilePicture),
      placeOfBirth: new FormControl(this.landlord.placeOfBirth),
      dateOfBirth: new FormControl(this.landlord.dateOfBirth, Validators.required),
      nationality: new FormControl(this.landlord.nationality),
      spokenLanguages: new FormControl(this.landlord.spokenLanguages, Validators.required),
      isPerson: new FormControl(this.landlord.isPerson, Validators.required),
      nameOfAgency: new FormControl(this.landlord.nameOfAgency)
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

  onBack() {
    this.location.back();
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
      const landlord = {
        _id: this.landlord._id,
        ...this.landlordForm.value,
      };
      await this.myProfileService.updateLandlord(landlord);
      this.toastrService.success('The profile picture is deleted successfully.', 'Success!');
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
    if (this.landlordForm.valid) {
      try {
        const landlordData = {
          ...this.landlordForm.value,
        };

        if (!this.isAgency) {
          landlordData.nameOfAgency = '';
        }

        const landlord = {
          _id: this.landlord._id,
          ...landlordData
        };

        await this.myProfileService.updateLandlord(landlord);

        this.toastrService.success('The landlord is updated successfully.', 'Success!');
      } catch (e) {
        console.log('LandlordComponent->update->error', e);

        this.toastrService.error('Something went wrong', 'Error');
      }
    } else {
      this.validateFormFielsService.validate(this.landlordForm);
    }
  }

}
