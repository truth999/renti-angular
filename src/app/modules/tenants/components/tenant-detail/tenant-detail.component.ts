import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageUploaderService} from '../../../../core/services/image-uploader.service';
import {TenantService} from '../../services/tenant.service';
import {Tenant} from '../../models/tenant.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styleUrls: ['./tenant-detail.component.scss']
})
export class TenantDetailComponent implements OnInit {

  public tenantId: string;
  public tenant: Tenant;

  public itemForm: FormGroup;
  public profilePicture: any;

  public languages = ['English', 'Hungarian', 'Russian', 'French'];

  constructor(
    private fb: FormBuilder,
    private fileUploaderService: ImageUploaderService,
    private tenantService: TenantService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tenant = params['id'];
      }
    });

    try {
      if (!!this.tenantId) {
        this.tenant = await this.tenantService.getTenant(this.tenantId);
      }
      this.buildItemForm();
    } finally {
    }

  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      firstName: [!!this.tenant ? this.tenant.firstName : '', Validators.required],
      lastName: [!!this.tenant ? this.tenant.lastName : '', Validators.required],
      profilePicture: [!!this.tenant ? this.tenant.profilePicture : '', Validators.required],
      email: [!!this.tenant ? this.tenant.email :'' ,Validators.required],
      isPerson: [!!this.tenant ? this.tenant.isPerson : false, Validators.required],
      mobile: [!!this.tenant ? this.tenant.mobile : '', Validators.required],
      placeOfBirthCountry: [!!this.tenant ? this.tenant.placeOfBirth.country : '' , Validators.required],
      placeOfBirthCity: [!!this.tenant ? this.tenant.placeOfBirth.city : '' , Validators.required],
      nameOfAgency: [!!this.tenant ? this.tenant.nameOfAgency: '', Validators.required],
      spokenLanguage: [!!this.tenant ? this.tenant.spokenLanguage : '', Validators.required],
    });
  }

  async submit() {
    const tenant = {
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

    try {
      if (!this.tenantId) {
        await this.tenantService.createTenant(this.tenant);
      } else {
        this.tenant = {...this.tenant, ...tenant};
        await this.tenantService.updateTenant(this.tenant);
      }
      this.router.navigate(['/tenants']);
    } finally {
    }
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
