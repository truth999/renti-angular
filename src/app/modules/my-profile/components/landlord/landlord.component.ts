import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { PhotoEditModalService } from '../../../../shared/services/modal/photo-edit-modal.service';
import { PhotoUploadModalService } from '../../../../shared/services/modal/photo-upload-modal.service';
import { LandlordService } from '../../services/landlord.service';
import { StorageService } from '../../../../core/services/storage.service';
import { ImageUploaderService } from '../../../../core/services/image-uploader.service';

@Component({
  selector: 'app-my-profile-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {
  photo = '/assets/images/profile/landlord.png';
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

  ngOnInit() {
    this.photoEditModalService.photoChanged.subscribe(photo => {
      this.photo = photo;
      this.photoDeleted = false;
    });

    if (this.storageService.get('landLordId') !== '') {
      this.landlordService.get(this.storageService.get('landlordId'));
      this.landlordService.landlordChanged.subscribe(landlords => {
        const dateOfBirthArray = landlords.dateOfBirth.split('-');
        this.landlordForm.patchValue({
          placeOfBirth: {
            country: landlords.placeOfBirth.country,
            city: landlords.placeOfBirth.city
          },
          dateOfBirth: {
            day: dateOfBirthArray[0],
            month: dateOfBirthArray[1],
            year: dateOfBirthArray[2]
          },
          mobile: landlords.mobile,
          nationality: landlords.nationality,
          spokenLanguages: landlords.spokenLanguages,
          isPerson: landlords.isPerson,
          nameOfAgency: landlords.nameOfAgency
        });
        this.isAgency = landlords.isPerson !== true;
      });
    }

    this.landlordForm = new FormGroup({
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
      isPerson: new FormControl(null),
      nameOfAgency: new FormControl(null)
    });
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
    this.isAgency = event.target.value === '2: false';
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
    const landlordData = {
      userId: this.storageService.get('userId'),
      ...this.landlordForm.value,
      profilePicture: 'aaa'
    };

    landlordData.dateOfBirth = landlordData.dateOfBirth.day + '-' + landlordData.dateOfBirth.month + '-' + landlordData.dateOfBirth.year;

    if (!this.isAgency) {
      landlordData.nameOfAgency = '';
    }

    if (this.storageService.get('landlordId') === '') {
      this.landlordService.create(landlordData);
    } else {
      this.landlordService.update(this.storageService.get('landlordId'), landlordData);
    }
  }

}
