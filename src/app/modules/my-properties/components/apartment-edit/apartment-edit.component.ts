import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { MyPropertiesService } from '../../services/my-properties.service';
import { ResponsiveService } from '../../../../shared/services/responsive.service';
import { DateSelectService } from '../../../../shared/services/date-select.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';

import { Apartment } from '../../../../shared/models';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-apartment-edit',
  templateUrl: './apartment-edit.component.html',
  styleUrls: ['./apartment-edit.component.scss']
})
export class ApartmentEditComponent implements OnInit, DoCheck {
  apartment: Apartment;
  rate: number;
  apartmentForm: FormGroup;
  years: string[];

  isMobile: BehaviorSubject<boolean>;

  uploadBase = environment.uploadBase;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  mediaService = [
    'UPC', 'DIGI', 'Telekom', 'Other'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private myPropertiesService: MyPropertiesService,
    private dateSelectService: DateSelectService,
    private responsiveService: ResponsiveService,
    private toastrService: ToastrService,
    private cursorWaitService: CursorWaitService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private datepickerConfig: NgbDatepickerConfig
  ) {
    this.isMobile = this.responsiveService.isMobile;

    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    datepickerConfig.minDate = { year, month, day };
    datepickerConfig.maxDate = { year: year + 10, month: 12, day: 31 };
  }

  async ngOnInit() {
    this.years = this.dateSelectService.getYears();

    const id = this.route.snapshot.paramMap.get('id');

    try {
      this.cursorWaitService.enable();

      const response = await this.myPropertiesService.getApartment(id);
      this.apartment = response.apartment;

      this.buildApartmentForm();

      this.galleryOptions = [
        {
          arrowPrevIcon: 'icon-left',
          arrowNextIcon: 'icon-right',
          closeIcon: 'icon-cancel',
          width: '100%',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
        },
        {
          breakpoint: 576,
          imageBullets: true,
          thumbnails: false
        }
      ];

      const pictures = [];
      this.apartment.rooms.map(room => {
        for (let i = 0; i < room.pictures.length; i++) {
          pictures.push(room.pictures[i]);
        }
      });

      this.galleryImages = pictures.map(image => {
        return {
          small: this.uploadBase + image,
          medium: this.uploadBase + image,
          big: this.uploadBase + image
        };
      });
      this.rate = this.apartment.dataPercent * .05;
    } catch (e) {
      console.log('ApartmentEditComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  ngDoCheck() {
    if (this.apartmentForm) {
      if (this.apartmentForm.get('floorsOfApartment').value > this.apartmentForm.get('floorsOfBuilding').value) {
        this.apartmentForm.get('floorsOfApartment').setErrors({ maxError: true });
      }
    }
  }

  buildApartmentForm() {
    let size = 0;
    this.apartment.rooms.map(room => {
      size = size + room.size;
    });

    this.apartmentForm = new FormGroup({
      name: new FormControl(!!this.apartment ? this.apartment.name : null, Validators.required),
      description: new FormControl(!!this.apartment ? this.apartment.description : null),
      address: new FormControl(!!this.apartment ? this.apartment.address : null, Validators.required),
      typeOfBuilding: new FormControl(!!this.apartment ? this.apartment.typeOfBuilding : null),
      yearOfConstruction: new FormControl(!!this.apartment ? this.apartment.yearOfConstruction : null),
      stateOfApartment: new FormControl(!!this.apartment ? this.apartment.stateOfApartment : null),
      energyPerformanceCertificate: new FormControl(!!this.apartment ? this.apartment.energyPerformanceCertificate : null),
      floorsOfBuilding: new FormControl(!!this.apartment ? this.apartment.floorsOfBuilding : null, Validators.min(1)),
      floorsOfApartment: new FormControl(!!this.apartment ? this.apartment.floorsOfApartment : null, Validators.min(1)),
      size: new FormControl(size),
      elevator: new FormControl(!!this.apartment ? this.apartment.elevator : null),
      rooftop: new FormControl(!!this.apartment ? this.apartment.rooftop : null),
      buildingSiting: new FormControl(!!this.apartment ? this.apartment.buildingSiting : null),
      typeOfHeating: new FormControl(!!this.apartment ? this.apartment.typeOfHeating : null),
      headroom: new FormControl(!!this.apartment ? this.apartment.headroom : null),
      parking: new FormControl(!!this.apartment ? this.apartment.parking : null),
      childFriendly: new FormControl(!!this.apartment ? this.apartment.childFriendly : null),
      petFriendly: new FormControl(!!this.apartment ? this.apartment.petFriendly : null),
      mediaServiceProviders: new FormControl(!!this.apartment ? this.apartment.mediaServiceProviders : null),
      handicapAccessible: new FormControl(!!this.apartment ? this.apartment.handicapAccessible : null),
      airConditioner: new FormControl(!!this.apartment ? this.apartment.airConditioner : null),
      garage: new FormControl(!!this.apartment ? this.apartment.garage : null),
      externalIsolation: new FormControl(!!this.apartment ? this.apartment.externalIsolation : null),
      balcony: new FormControl(!!this.apartment ? this.apartment.balcony : null),
      sizeOfBalcony: new FormControl(!!this.apartment ? this.apartment.sizeOfBalcony : null),
      garden: new FormControl(!!this.apartment ? this.apartment.garden : null),
      sizeOfGarden: new FormControl(!!this.apartment ? this.apartment.sizeOfGarden : null),
      terrace: new FormControl(!!this.apartment ? this.apartment.terrace : null),
      sizeOfTerrace: new FormControl(!!this.apartment ? this.apartment.sizeOfTerrace : null),
      rentalFee: new FormControl(
        !!this.apartment ? this.apartment.rentalFee : null,
        [Validators.min(1), Validators.max(2000000)]
      ),
      overhead: new FormControl(
        !!this.apartment ? this.apartment.overhead : null,
        [Validators.min(1), Validators.max(2000000)]
      ),
      deposit: new FormControl(
        !!this.apartment ? this.apartment.deposit : null,
        [Validators.min(1), Validators.max(2000000)]
      ),
      minimumRentingTime: new FormControl(!!this.apartment ? this.apartment.minimumRentingTime : null),
      dateOfMovingIn: new FormGroup({
        rightNow: new FormControl(!!this.apartment ? this.apartment.dateOfMovingIn.rightNow : null),
        date: new FormControl(!!this.apartment ? this.apartment.dateOfMovingIn.date : null)
      })
      // roomsData: new FormArray(!!this.apartment.roomsData ? this.apartment.roomsData.map(room => {
      //   return new FormGroup({
      //     name: new FormControl(room.name),
      //     size: new FormControl(room.size, [Validators.required, Validators.min(0)]),
      //     windowType: new FormControl(room.windowType)
      //   });
      // }) : [new FormGroup({
      //   name: new FormControl(null),
      //   size: new FormControl(null, [Validators.required, Validators.min(0)]),
      //   windowType: new FormControl(null)
      // })])
    });
  }

  get balcony() {
    return this.apartmentForm.get('balcony');
  }

  get garden() {
    return this.apartmentForm.get('garden');
  }

  get terrace() {
    return this.apartmentForm.get('terrace');
  }

  get sizeOfBalcony() {
    return this.apartmentForm.get('sizeOfBalcony');
  }

  get sizeOfGarden() {
    return this.apartmentForm.get('sizeOfGarden');
  }

  get sizeOfTerrace() {
    return this.apartmentForm.get('sizeOfTerrace');
  }

  get rightNow() {
    return this.apartmentForm.get('dateOfMovingIn').get('rightNow');
  }

  get date() {
    return this.apartmentForm.get('dateOfMovingIn').get('date');
  }

  onChangeBalcony() {
    if (!this.balcony.value) {
      this.sizeOfBalcony.setValue(null);
    }
  }

  onChangeGarden() {
    if (!this.garden.value) {
      this.sizeOfGarden.setValue(null);
    }
  }

  onChangeTerrace() {
    if (!this.terrace.value) {
      this.sizeOfTerrace.setValue(null);
    }
  }

  onChangeRightNow() {
    if (this.rightNow.value) {
      this.date.setValue(null);
    }
  }

  // get roomsData() {
  //   return this.apartmentForm.get('roomsData') as FormArray;
  // }

  handleAddressChange(address: Address) {
    this.apartmentForm.get('address').setValue(address.formatted_address);
  }

  // onAddRoom() {
  //   this.roomsData.push(new FormGroup({
  //     name: new FormControl(null),
  //     size: new FormControl(null, [Validators.required, Validators.min(0)]),
  //     windowType: new FormControl(null)
  //   }));
  // }

  arrayNumber(n: number) {
    return Array(n);
  }

  onBack() {
    this.location.back();
  }

  async submit() {
    if (this.apartmentForm.valid) {
      const apartmentData = {
        ...this.apartment,
        ...this.apartmentForm.value
      };

      try {
        this.cursorWaitService.enable();

        await this.myPropertiesService.updateApartment(apartmentData);
        this.toastrService.success('The apartment is updated successfully.', 'Success!');
        this.router.navigate(['/app/my-properties']);
      } catch (e) {
        this.toastrService.error('Something went wrong', 'Error');
        console.log('ApartmentEditComponent->submit', e);
      } finally {
        this.cursorWaitService.disable();
      }
    } else {
      this.validateFormFieldsService.validate(this.apartmentForm);
    }
  }

}
