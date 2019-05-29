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
    } catch (e) {
      console.log('ApartmentEditComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
    }

    this.changeBalcony();
    this.changeGarden();
    this.changeTerrace();
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
      address: new FormControl(!!this.apartment ? this.apartment.address : '', Validators.required),
      typeOfBuilding: new FormControl(!!this.apartment ? this.apartment.typeOfBuilding : '', Validators.required),
      yearOfConstruction: new FormControl(!!this.apartment ? this.apartment.yearOfConstruction : '', Validators.required),
      stateOfApartment: new FormControl(!!this.apartment ? this.apartment.stateOfApartment : '', Validators.required),
      energyPerformanceCertificate: new FormControl(!!this.apartment ? this.apartment.energyPerformanceCertificate : ''),
      floorsOfBuilding: new FormControl(
        !!this.apartment ? this.apartment.floorsOfBuilding : '', [Validators.required, Validators.min(1)]
      ),
      floorsOfApartment: new FormControl(
        !!this.apartment ? this.apartment.floorsOfApartment : '', [Validators.required, Validators.min(1)]
      ),
      size: new FormControl(size, Validators.required),
      elevator: new FormControl(!!this.apartment ? this.apartment.elevator : false, Validators.required),
      rooftop: new FormControl(!!this.apartment ? this.apartment.rooftop : false, Validators.required),
      buildingSiting: new FormControl(this.apartment.buildingSiting, Validators.required),
      typeOfHeating: new FormControl(this.apartment.typeOfHeating, Validators.required),
      headroom: new FormControl(this.apartment.headroom, Validators.required),
      parking: new FormControl(this.apartment.parking, Validators.required),
      childFriendly: new FormControl(!!this.apartment.childFriendly ? this.apartment.childFriendly : false, Validators.required),
      petFriendly: new FormControl(!!this.apartment.petFriendly ? this.apartment.petFriendly : false, Validators.required),
      mediaServiceProviders: new FormControl(
        this.apartment.mediaServiceProviders,
        Validators.required
      ),
      handicapAccessible: new FormControl(
        !!this.apartment.handicapAccessible ? this.apartment.handicapAccessible : false,
        Validators.required
      ),
      airConditioner: new FormControl(!!this.apartment.airConditioner ? this.apartment.airConditioner : false, Validators.required),
      garage: new FormControl(!!this.apartment.garage ? this.apartment.garage : false, Validators.required),
      externalIsolation: new FormControl(!!this.apartment.externalIsolation ? this.apartment.externalIsolation : false),
      balcony: new FormControl(!!this.apartment.balcony ? this.apartment.balcony : false, Validators.required),
      sizeOfBalcony: new FormControl(!!this.apartment.sizeOfBalcony ? this.apartment.sizeOfBalcony : ''),
      garden: new FormControl(!!this.apartment.garden ? this.apartment.garden : false, Validators.required),
      sizeOfGarden: new FormControl(!!this.apartment.sizeOfGarden ? this.apartment.sizeOfGarden : ''),
      terrace: new FormControl(!!this.apartment.terrace ? this.apartment.terrace : false, Validators.required),
      sizeOfTerrace: new FormControl(!!this.apartment.sizeOfTerrace ? this.apartment.sizeOfTerrace : ''),
      rentalFee: new FormControl(!!this.apartment.rentalFee ? this.apartment.rentalFee : '', Validators.required),
      overhead: new FormControl(!!this.apartment.overhead ? this.apartment.overhead : '', Validators.required),
      deposit: new FormControl(!!this.apartment.deposit ? this.apartment.deposit : '', Validators.required),
      minimumRentingTime: new FormControl(
        !!this.apartment.minimumRentingTime ? this.apartment.minimumRentingTime : '', Validators.required
      ),
      dateOfMovingIn: new FormGroup({
        rightNow: new FormControl(
          !!this.apartment.dateOfMovingIn ? this.apartment.dateOfMovingIn.rightNow : false, Validators.required
        ),
        date: new FormControl(!!this.apartment.dateOfMovingIn ? this.apartment.dateOfMovingIn.date : null)
      })
      // roomsData: new FormArray(!!this.apartment.roomsData ? this.apartment.roomsData.map(room => {
      //   return new FormGroup({
      //     name: new FormControl(room.name, Validators.required),
      //     size: new FormControl(room.size, [Validators.required, Validators.min(0)]),
      //     windowType: new FormControl(room.windowType, Validators.required)
      //   });
      // }) : [new FormGroup({
      //   name: new FormControl('', Validators.required),
      //   size: new FormControl('', [Validators.required, Validators.min(0)]),
      //   windowType: new FormControl('', Validators.required)
      // })])
    });
  }

  get balcony() {
    return this.apartmentForm.get('balcony');
  }

  get sizeOfBalcony() {
    return this.apartmentForm.get('sizeOfBalcony');
  }

  get garden() {
    return this.apartmentForm.get('garden');
  }

  get sizeOfGarden() {
    return this.apartmentForm.get('sizeOfGarden');
  }

  get terrace() {
    return this.apartmentForm.get('terrace');
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

  // get roomsData() {
  //   return this.apartmentForm.get('roomsData') as FormArray;
  // }

  changeBalcony() {
    this.balcony.value ? this.sizeOfBalcony.setValidators(Validators.required) : this.sizeOfBalcony.setErrors(null);
  }

  changeGarden() {
    this.garden.value ? this.sizeOfGarden.setValidators(Validators.required) : this.sizeOfGarden.setErrors(null);
  }

  changeTerrace() {
    this.terrace.value ? this.sizeOfTerrace.setValidators(Validators.required) : this.sizeOfTerrace.setErrors(null);
  }

  changeRightNow() {
    this.rightNow.value ? this.date.setErrors(null) : this.date.setValidators(Validators.required);
  }

  handleAddressChange(address: Address) {
    this.apartmentForm.get('address').setValue(address.formatted_address);
  }

  // onAddRoom() {
  //   this.roomsData.push(new FormGroup({
  //     name: new FormControl('', Validators.required),
  //     size: new FormControl('', [Validators.required, Validators.min(0)]),
  //     windowType: new FormControl('', Validators.required)
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
      const roomIds = [];
      this.apartment.rooms.map(room => {
        roomIds.push(room._id);
      });

      const apartmentData = {
        ...this.apartmentForm.value,
        rooms: roomIds
      };

      this.apartment = {
        ...this.apartment,
        ...apartmentData
      };

      try {
        this.cursorWaitService.enable();

        await this.myPropertiesService.updateApartment(this.apartment);
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
