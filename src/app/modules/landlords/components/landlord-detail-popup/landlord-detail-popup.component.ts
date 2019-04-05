import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ImageUploaderService} from '../../../../core/services/image-uploader.service';
import {environment} from '../../../../../environments/environment';
import {Landlord} from '../../models/landlord.model';

@Component({
  selector: 'app-landlord-detail-popup',
  templateUrl: './landlord-detail-popup.component.html',
  styleUrls: ['./landlord-detail-popup.component.scss']
})
export class LandlordDetailPopupComponent implements OnInit {

  public landlord: Landlord;
  public itemForm: FormGroup;

  public languages = ['English', 'Hungarian', 'Russian', 'French'];

  @ViewChild('profilePictureChooser') profilePictureChooser: ElementRef;
  public newProfilePicture: any;
  public previewProfilePicture: any;

  public uploadBase = environment.uploadBase;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LandlordDetailPopupComponent>,
    private fb: FormBuilder,
    private fileUploaderService: ImageUploaderService
  ) { }

  ngOnInit() {
    this.landlord = this.data.payload;
    this.buildItemForm(this.data.payload);
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      firstName: [item.firstName || '', Validators.required],
      lastName: [item.lastName || '', Validators.required],
      profilePicture: [item.profilePicture || '', Validators.required],
      email: [item.email || '',
        [
          Validators.required,
          Validators.email,
        ]
      ],
      isPerson: [item.isPerson || false, Validators.required],
      mobile: [item.mobile || '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(11),
          Validators.pattern('[0-9]+'),
        ]
      ],
      placeOfBirthCountry: [!item.placeOfBirth ? '' : item.placeOfBirth.country, Validators.required],
      placeOfBirthCity: [!item.placeOfBirth ? '' : item.placeOfBirth.city, Validators.required],
      nameOfAgency: [item.nameOfAgency || '', Validators.required],
      spokenLanguages: [item.spokenLanguages || '', Validators.required],
    });
  }

  submit() {
    const landlord = {
      firstName: this.itemForm.value.firstName,
      lastName:  this.itemForm.value.lastName,
      profilePicture: this.itemForm.value.profilePicture,
      email: this.itemForm.value.email,
      isPerson: this.itemForm.value.isPerson,
      mobile: this.itemForm.value.mobile,
      placeOfBirth: {
        country: this.itemForm.value.placeOfBirthCountry,
        city: this.itemForm.value.placeOfBirthCity
      },
      nameOfAgency: this.itemForm.value.nameOfAgency,
      spokenLanguages: this.itemForm.value.spokenLanguages
    };

    if (!this.data.isNew) {
      landlord['_id'] = this.data.payload['_id'];
    }
    this.dialogRef.close(landlord);
  }

  async uploadProfilePicture(event) {
    event.stopPropagation();
    if (!this.newProfilePicture) {
      return;
    }
    const filePath = await this.fileUploaderService.upload(this.newProfilePicture);
    this.itemForm.controls['profilePicture'].setValue(filePath);
    this.newProfilePicture = null;
    this.profilePictureChooser.nativeElement.value = null;
  }

  cancelProfilePicture(event) {
    event.stopPropagation();
    this.newProfilePicture = null;
    this.previewProfilePicture = null;
    this.profilePictureChooser.nativeElement.value = null;
  }

  onProfilePictureChange(event) {
    this.newProfilePicture = event.target.files;

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        this.previewProfilePicture = (<FileReader>e.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
