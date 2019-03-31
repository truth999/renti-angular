import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ImageUploaderService} from '../../../../core/services/image-uploader.service';
import {Feedback, PlaceOfBirth} from 'app/shared/models/shared.model';

@Component({
  selector: 'app-landlord-detail-popup',
  templateUrl: './landlord-detail-popup.component.html',
  styleUrls: ['./landlord-detail-popup.component.scss']
})
export class LandlordDetailPopupComponent implements OnInit {

  public itemForm: FormGroup;
  public profilePicture: any;
  public localPath;

  public languages = ['English', 'Hungarian', 'Russian', 'French'];
  @ViewChild('fileChooser')
  fileChooser: ElementRef;

  public baseURL = 'http://localhost:8080/';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LandlordDetailPopupComponent>,
    private fb: FormBuilder,
    private fileUploaderService: ImageUploaderService
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload);
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      firstName:            [item.firstName || '',                                Validators.required],
      lastName:             [item.lastName || '',                                 Validators.required],
      profilePicture:       [item.profilePicture || '',                           Validators.required],
      email:                [item.email || '',
        [
          Validators.required,
          Validators.email,
        ]
      ],
      isPerson:             [item.isPerson || false,                              Validators.required],
      mobile:               [item.mobile || '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(11),
          Validators.pattern('[0-9]+'),
        ]
      ],
      placeOfBirthCountry:  [!item.placeOfBirth ? '' : item.placeOfBirth.country, Validators.required],
      placeOfBirthCity:     [!item.placeOfBirth ? '' : item.placeOfBirth.city,    Validators.required],
      nameOfAgency:         [item.nameOfAgency || '',                             Validators.required],
      spokenLanguages:      [item.spokenLanguages || '',                          Validators.required],
    });
  }

  submit() {
    console.log(this.itemForm.status);
    console.log(this.itemForm.value);

    // TODO: May we change this to this.itemForm.value?
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

    if (!this.data.payload.isNew) {
      landlord['_id'] = this.data.payload['_id'];
    }
    this.dialogRef.close(landlord);
  }

  async uploadProfilePicture(event) {
    event.preventDefault();
    if (!this.profilePicture) {
      return;
    }
    const filePath = await this.fileUploaderService.upload(this.profilePicture);
    this.itemForm.controls['profilePicture'].setValue(filePath);
  }

  cancelProfilePicture(event) {
    console.log(this.fileChooser.nativeElement.files);
    this.fileChooser.nativeElement.value = '';
    console.log(this.fileChooser.nativeElement.files);
  }

  onProfilePictureChange(event) {
    this.profilePicture = event.target.files;

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        this.localPath = (<FileReader>e.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
