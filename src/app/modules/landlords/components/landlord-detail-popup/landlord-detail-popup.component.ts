import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ImageUploaderService} from "../../../../core/services/image-uploader.service";
import {Feedback, PlaceOfBirth} from "../../../../shared/models/shared.model";

@Component({
  selector: 'app-landlord-detail-popup',
  templateUrl: './landlord-detail-popup.component.html',
  styleUrls: ['./landlord-detail-popup.component.scss']
})
export class LandlordDetailPopupComponent implements OnInit {

  public itemForm: FormGroup;
  public profilePicture: any;

  public languages = ['English', 'Hungarian', 'Russian', 'French'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LandlordDetailPopupComponent>,
    private fb: FormBuilder,
    private fileUploaderService: ImageUploaderService,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      firstName: [item.firstName || '', Validators.required],
      lastName: [item.lastName || '', Validators.required],
      profilePicture: [item.profilePicture || '', Validators.required],
      email: [item.email || '', Validators.required],
      isPerson: [item.isPerson || false, Validators.required],
      mobile: [item.mobile || '', Validators.required],
      placeOfBirthCountry: [!item.placeOfBirth ? '' : item.placeOfBirth.country, Validators.required],
      placeOfBirthCity: [!item.placeOfBirth ? '' : item.placeOfBirth.city, Validators.required],
      nameOfAgency: [item.nameOfAgency || '', Validators.required],
      spokenLanguage: [item.spokenLanguage || '', Validators.required],
    });
  }

  submit() {
    const landlord = {
      firstName: this.itemForm.value.firstName,
      lastName:  this.itemForm.value.lastName,
      email: this.itemForm.value.email,
      mobile: this.itemForm.value.mobile,
      isPerson: this.itemForm.value.isPerson,
      nameOfAgency: this.itemForm.value.nameOfAgency,
      profilePicture: this.itemForm.value.profilePicture,
      placeOfBirth: {
        country: this.itemForm.value.placeOfBirthCountry,
        city: this.itemForm.value.placeOfBirthCity
      },
      spokenLanguage: this.itemForm.value.spokenLanguage
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

  onProfilePictureChange(event) {
    this.profilePicture = event.target.files;
  }

}
