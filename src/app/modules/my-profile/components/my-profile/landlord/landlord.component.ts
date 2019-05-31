import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { PhotoEditModalService } from '../../../../../shared/services/modal/photo-edit-modal.service';
import { PhotoUploadModalService } from '../../../../../shared/services/modal/photo-upload-modal.service';
import { LandlordService } from '../../../services/landlord.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';
import { CursorWaitService } from '../../../../../core/services/cursor-wait.service';

import { Landlord, User } from '../../../../../shared/models';

import { config } from '../../../../../../config';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-my-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  user: User;
  landlord: Landlord;
  photo: string;
  photoDeleted = true;
  isAgency = false;

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
    private toastrService: ToastrService,
    private cursorWaitService: CursorWaitService,
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
      this.cursorWaitService.enable();

      const response = await this.authService.getAuthUser();
      this.user = response.user;

      if (response.user.landlord) {
        this.landlord = response.user.landlord;
      }

      this.buildLandlordForm();
      this.isAgency = !!this.landlord ? this.landlord.isPerson !== true : false;
    } catch (e) {
      console.log('LandlordComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
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
      mobile: new FormControl(!!this.landlord ? this.landlord.mobile : '', Validators.required),
      profilePicture: new FormControl(!!this.landlord ? this.landlord.profilePicture : ''),
      placeOfBirth: new FormControl(!!this.landlord ? this.landlord.placeOfBirth : ''),
      dateOfBirth: new FormControl(!!this.landlord ? this.landlord.dateOfBirth : null, Validators.required),
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

  onBack() {
    this.location.back();
  }

  onMyProperties() {
    this.router.navigate(['/app/my-properties']);
  }

  onViewAs() {
    this.router.navigate(['/app/profile', this.user._id]);
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
      this.cursorWaitService.enable();

      this.landlordForm.patchValue({profilePicture: ''});
      this.photo = '';
      if (this.landlord) {
        this.landlord.profilePicture = '';
        await this.landlordService.updateLandlord(this.landlord);
        this.toastrService.success('The profile picture is deleted successfully.', 'Success!');
      }
    } catch (e) {
      console.log('LandlordComponent->onDeletePhoto->error', e);
      this.toastrService.error('Something went wrong', 'Error');
    } finally {
      this.cursorWaitService.disable();
    }
  }

  async uploadProfilePicture(photoURIData) {
    try {
      this.cursorWaitService.enable();

      const blobData = this.imageUploaderService.b64toBlob(photoURIData);
      const filenames = await this.imageUploaderService.upload(blobData);
      this.landlordForm.patchValue({profilePicture: filenames[0]});
    } catch (e) {
      console.log('LandlordComponent->uploadProfilePicture->error', e);
      this.toastrService.error('Something went wrong', 'Error');
    } finally {
      this.cursorWaitService.disable();
    }
  }

  async submit() {
    if (this.landlordForm.valid) {
      try {
        this.cursorWaitService.enable();

        const landlordData = {
          userId: this.storageService.get('userId'),
          ...this.landlordForm.value,
        };

        if (!this.isAgency) {
          landlordData.nameOfAgency = '';
        }

        if (!this.landlord) {
          await this.landlordService.createLandlord(landlordData);
        } else {
          this.landlord = {
            ...this.landlord,
            ...landlordData
          };

          await this.landlordService.updateLandlord(this.landlord);
        }

        this.toastrService.success('The landlord is updated successfully.', 'Success!');
      } catch (e) {
        console.log('LandlordComponent->update->error', e);

        this.toastrService.error('Something went wrong', 'Error');
      } finally {
        this.cursorWaitService.disable();
      }
    } else {
      this.validateFormFielsService.validate(this.landlordForm);
    }
  }

}
