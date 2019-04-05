import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

import {ImageUploaderService} from '../../../../core/services/image-uploader.service';
import {TenantService} from '../../services/tenant.service';
import {Tenant} from '../../models/tenant.model';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.scss']
})
export class TenantDetailComponent implements OnInit {

  public tenantId: string;
  public tenant: Tenant;

  public itemForm: FormGroup;

  public languages = ['English', 'Hungarian', 'Russian', 'French'];

  @ViewChild('profilePictureChooser') profilePictureChooser: ElementRef;
  public newProfilePicture: any;
  public previewProfilePicture: any;

  public uploadBase = environment.uploadBase;

  constructor(
    private fb: FormBuilder,
    private fileUploaderService: ImageUploaderService,
    private tenantService: TenantService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tenantId = params['id'];
      }
    });

    try {
      if (!!this.tenantId) {
        const response = await this.tenantService.getTenant(this.tenantId);
        this.tenant = response.tenant;
      }
      this.buildItemForm();
    } finally {
    }

  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      firstName: [!!this.tenant ? this.tenant.firstName : '', Validators.required],
      lastName: [!!this.tenant ? this.tenant.lastName : '', Validators.required],
      email: [!!this.tenant ? this.tenant.email : '' , Validators.required],
      mobile: [!!this.tenant ? this.tenant.mobile : '', Validators.required],
      profilePicture: [!!this.tenant ? this.tenant.profilePicture : '', Validators.required],
      placeOfBirthCountry: [!!this.tenant ? this.tenant.placeOfBirth.country : '' , Validators.required],
      placeOfBirthCity: [!!this.tenant ? this.tenant.placeOfBirth.city : '' , Validators.required],
      currentPlaceCountry: [!!this.tenant ? this.tenant.currentPlace.country : '' , Validators.required],
      currentPlaceCity: [!!this.tenant ? this.tenant.currentPlace.city : '' , Validators.required],
      nationality: [!!this.tenant ? this.tenant.nationality: '', Validators.required],
      highestLevelOfQualification: [!!this.tenant ? this.tenant.highestLevelOfQualification: '', Validators.required],
      nameOfSchool: [!!this.tenant ? this.tenant.nameOfSchool : '', Validators.required],
      yearOfGraduation: [!!this.tenant ? this.tenant.yearOfGraduation : '', Validators.required],
      jobTitle: [!!this.tenant ? this.tenant.jobTitle: '', Validators.required],
      universitySpeciality: [!!this.tenant ? this.tenant.universitySpeciality : '', Validators.required],
      currentWorkplace: [!!this.tenant ? this.tenant.currentWorkplace : '', Validators.required],
      formerWorkplaces: [!!this.tenant ? this.tenant.formerWorkplaces.join('\n') : '', Validators.required],
      monthlyIncome: [!!this.tenant ? this.tenant.monthlyIncome: '', Validators.required],
      spokenLanguages: [!!this.tenant ? this.tenant.spokenLanguages : '', Validators.required],
      otherText: [!!this.tenant ? this.tenant.otherText : '', Validators.required],
      freeTextIntroduction: [!!this.tenant ? this.tenant.freeTextIntroduction : '', Validators.required],
      socialMediaFacebook: [!!this.tenant ? this.tenant.socialMediaAvailabilities.facebook : '', Validators.required],
      socialMediaLinkedIn: [!!this.tenant ? this.tenant.socialMediaAvailabilities.linkedIn : '', Validators.required],
      socialMediaTwitter: [!!this.tenant ? this.tenant.socialMediaAvailabilities.twitter : '', Validators.required]
    });
  }

  async submit() {
    const tempTenant = {
      firstName: this.itemForm.value.firstName,
      lastName:  this.itemForm.value.lastName,
      email: this.itemForm.value.email,
      mobile: this.itemForm.value.mobile,
      profilePicture: this.itemForm.value.profilePicture,
      placeOfBirth: {
        country: this.itemForm.value.placeOfBirthCountry,
        city: this.itemForm.value.placeOfBirthCity
      },
      currentPlace: {
        country: this.itemForm.value.currentPlaceCountry,
        city: this.itemForm.value.currentPlaceCity
      },
      nationality: this.itemForm.value.nationality,
      highestLevelOfQualification: this.itemForm.value.highestLevelOfQualification,
      nameOfSchool: this.itemForm.value.nameOfSchool,
      yearOfGraduation: this.itemForm.value.yearOfGraduation,
      jobTitle: this.itemForm.value.jobTitle,
      universitySpeciality: this.itemForm.value.universitySpeciality,
      currentWorkplace: this.itemForm.value.currentWorkplace,
      formerWorkplaces: this.itemForm.value.formerWorkplaces.split('\n'),
      monthlyIncome: this.itemForm.value.monthlyIncome,
      spokenLanguages: this.itemForm.value.spokenLanguages,
      otherText: this.itemForm.value.otherText,
      freeTextIntroduction: this.itemForm.value.freeTextIntroduction,
      socialMediaAvailabilities: {
        facebook: this.itemForm.value.socialMediaFacebook,
        linkedIn: this.itemForm.value.socialMediaLinkedIn,
        twitter: this.itemForm.value.socialMediaTwitter,
      }
    };
    this.tenant = {...this.tenant, ...tempTenant};

    try {
      if (!this.tenantId) {
        await this.tenantService.createTenant(this.tenant);
      } else {
        await this.tenantService.updateTenant(this.tenant);
      }
      this.router.navigate(['/tenants']);
    } finally {
    }
  }

  goBack() {
    this.location.back();
  }

  async uploadProfilePicture(event) {
    event.preventDefault();
    if (!this.newProfilePicture) {
      return;
    }
    const filePath = await this.fileUploaderService.upload(this.newProfilePicture);
    this.itemForm.controls['profilePicture'].setValue(filePath);
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
