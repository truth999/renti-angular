import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Tenant} from '../../../tenants/models/tenant.model';

@Component({
  selector: 'app-offer-detail-popup',
  templateUrl: './offer-detail-popup.component.html',
  styleUrls: ['./offer-detail-popup.component.scss']
})
export class OfferDetailPopupComponent implements OnInit {

  public itemForm: FormGroup;
  public tenants: Tenant[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OfferDetailPopupComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.tenants = this.data.payload.tenants;
    this.buildItemForm(this.data.payload.offer);
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      rentalFee: [item.rentalFee || '', Validators.required],
      overhead: [item.overhead || '', Validators.required],
      minRentingTime: [item.minRentingTime || '', Validators.required],
      dateOfMovingIn: [item.dateOfMovingIn || '', Validators.required],
      movingWith: [item.movingWith || false, Validators.required],
      typeOfTenants: [item.typeOfTenants || '', Validators.required],
      movingWithPets: [item.movingWithPets || false, Validators.required],
      socialMediaFacebook: [item.socialMediaAvailabilities ? item.socialMediaAvailabilities.facebook : '', Validators.required],
      socialMediaLinkedIn: [item.socialMediaAvailabilities ? item.socialMediaAvailabilities.linkedIn : '', Validators.required],
      socialMediaTwitter: [item.socialMediaAvailabilities ? item.socialMediaAvailabilities.twitter : '', Validators.required],
      whyChooseMe: [item.whyChooseMe || '', Validators.required],
      tenant: [item.tenant || '', Validators.required],
    });
  }

  submit() {
    const offer = {
      rentalFee: this.itemForm.value.rentalFee,
      overhead:  this.itemForm.value.overhead,
      minRentingTime: this.itemForm.value.minRentingTime,
      dateOfMovingIn: this.itemForm.value.dateOfMovingIn,
      movingWith: this.itemForm.value.movingWith,
      typeOfTenants: this.itemForm.value.typeOfTenants,
      movingWithPets: this.itemForm.value.movingWithPets,
      socialMediaAvailabilities: {
        facebook: this.itemForm.value.socialMediaFacebook,
        linkedIn: this.itemForm.value.socialMediaLinkedIn,
        twitter: this.itemForm.value.socialMediaTwitter
      },
      whyChooseMe: this.itemForm.value.whyChooseMe,
      tenant: this.itemForm.value.tenant
    };

    if (!this.data.payload.isNew) {
      offer['_id'] = this.data.payload.offer['_id'];
    }
    this.dialogRef.close(offer);
  }


}
