import { Component, DoCheck, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { MyPropertiesService } from '../../services/my-properties.service';
import { DateSelectService } from '../../../../shared/services/date-select.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';
import { ImageUploaderService } from '../../../../core/services/image-uploader.service';
import { FloorPlanModalService } from '../../../../shared/services/modal/floor-plan-modal.service';
import { ConfirmModalService } from '../../../../shared/services/modal/confirm-modal.service';

import { Apartment } from '../../../../shared/models';

import { environment } from '../../../../../environments/environment';
import { config } from '../../../../../config';

const addressFormGroupValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const city = control.get('city');
  const building = control.get('building');
  const floor = control.get('floor');
  const door = control.get('door');

  return city && building && floor && door && city.valid && building.valid && floor.valid && door.valid ? null : { required: true };
};

@Component({
  selector: 'app-apartment-edit',
  templateUrl: './apartment-edit.component.html',
  styleUrls: ['./apartment-edit.component.scss']
})
export class ApartmentEditComponent implements OnInit, DoCheck {
  paramsId: string;
  apartment: Apartment;
  apartmentForm: FormGroup;
  years: string[];
  apartmentConfig = config.apartment;
  Object = Object;

  uploadBase = environment.uploadBase;

  searchTerms = new EventEmitter<Apartment['address']>();

  keepOrder = (a, b) => {
    return a;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private myPropertiesService: MyPropertiesService,
    private dateSelectService: DateSelectService,
    private toastrService: ToastrService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private datepickerConfig: NgbDatepickerConfig,
    private imageUploaderService: ImageUploaderService,
    private floorPlanModalService: FloorPlanModalService,
    private confirmModalService: ConfirmModalService
  ) {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    datepickerConfig.minDate = { year, month, day };
    datepickerConfig.maxDate = { year: year + 10, month: 12, day: 31 };
  }

  ngOnInit() {
    this.years = this.dateSelectService.getYears();

    this.paramsId = this.route.snapshot.paramMap.get('id');

    this.getApartment();
    this.floorPlanModalService.saveFloorplan.subscribe(() => {
      this.getApartment();
    });

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(async (term: Apartment['address']) => {
        try {
          const params = new URLSearchParams();
          for (const key in term) {
            if (term.hasOwnProperty(key)) {
              params.set(key, term[key]);
            }
          }
          params.set('id', this.paramsId);
          const addressResponse = await this.myPropertiesService.checkAddress(params.toString());
          if (addressResponse && addressResponse.message) {
            this.apartmentForm.get('address').setErrors({ checkError: true, errorMsg: addressResponse.message });
          }
        } catch (e) {
          console.log('ApartmentEditComponent->searchTerms', e);
        }
      });
  }

  ngDoCheck() {
    if (this.apartmentForm) {
      if (this.apartmentForm.get('floorsOfApartment').value > this.apartmentForm.get('floorsOfBuilding').value) {
        this.apartmentForm.get('floorsOfApartment').setErrors({ maxError: true });
      }
    }
  }

  async getApartment() {
    try {
      const response = await this.myPropertiesService.getApartment(this.paramsId);
      this.apartment = response.apartment;

      this.buildApartmentForm();
    } catch (e) {
      console.log('ApartmentEditComponent->getApartment', e);
    }
  }

  buildApartmentForm() {
    this.apartmentForm = new FormGroup({
      name: new FormControl(this.apartment.name, Validators.required),
      address: new FormGroup({
        city: new FormControl(this.apartment.address.city, Validators.required),
        building: new FormControl(this.apartment.address.building),
        floor: new FormControl(this.apartment.address.floor),
        door: new FormControl(this.apartment.address.door),
        location: new FormControl(this.apartment.address.location)
      }, { validators: addressFormGroupValidator }),
      typeOfBuilding: new FormControl(this.apartment.typeOfBuilding),
      yearOfConstruction: new FormControl(this.apartment.yearOfConstruction),
      stateOfApartment: new FormControl(this.apartment.stateOfApartment),
      energyPerformanceCertificate: new FormControl(this.apartment.energyPerformanceCertificate),
      floorsOfBuilding: new FormControl(
        this.apartment.floorsOfBuilding, [Validators.min(0), Validators.max(100)]
      ),
      floorsOfApartment: new FormControl(
        this.apartment.floorsOfApartment, [Validators.min(0), Validators.max(100)]
      ),
      size: new FormControl(this.apartment.size, [Validators.required, Validators.min(1), Validators.max(9999)]),
      elevator: new FormControl(this.apartment.elevator),
      rooftop: new FormControl(this.apartment.rooftop),
      buildingSiting: new FormControl(this.apartment.buildingSiting),
      typeOfHeating: new FormControl(this.apartment.typeOfHeating),
      headroom: new FormControl(this.apartment.headroom),
      parking: new FormControl(this.apartment.parking),
      windowType: new FormControl(this.apartment.windowType),
      furnished: new FormControl(this.apartment.furnished),
      childFriendly: new FormControl(this.apartment.childFriendly),
      petFriendly: new FormControl(this.apartment.petFriendly),
      mediaServiceProviders: new FormControl(this.apartment.mediaServiceProviders),
      handicapAccessible: new FormControl(this.apartment.handicapAccessible),
      airConditioner: new FormControl(this.apartment.airConditioner),
      garage: new FormControl(this.apartment.garage),
      externalIsolation: new FormControl(this.apartment.externalIsolation),
      balcony: new FormControl(this.apartment.balcony),
      sizeOfBalcony: new FormControl(this.apartment.sizeOfBalcony),
      garden: new FormControl(this.apartment.garden),
      sizeOfGarden: new FormControl(this.apartment.sizeOfGarden, [Validators.min(0), Validators.max(5000)]),
      terrace: new FormControl(this.apartment.terrace),
      sizeOfTerrace: new FormControl(this.apartment.sizeOfTerrace, [Validators.min(1), Validators.max(100)]),
      rentalFee: new FormControl(
        this.apartment.rentalFee,
        [Validators.required, Validators.min(1000), Validators.max(2000000)]
      ),
      overhead: new FormControl(
        this.apartment.overhead,
        [Validators.min(1000), Validators.max(1000000)]
      ),
      deposit: new FormControl(
        this.apartment.deposit,
        [Validators.min(1000), Validators.max(2000000)]
      ),
      minimumRentingTime: new FormControl(this.apartment.minimumRentingTime),
      dateOfMovingIn: new FormGroup({
        rightNow: new FormControl(this.apartment.dateOfMovingIn.rightNow),
        date: new FormControl(this.apartment.dateOfMovingIn.date)
      }),
      pictures: new FormArray(this.apartment.pictures.length !== 0 ? this.apartment.pictures.map(picture => {
        return new FormControl(picture);
      }) : []),
      setAsPicture: new FormControl(this.apartment.setAsPicture),
      draw: new FormGroup({
        basicDraw: new FormControl(!!this.apartment.draw && !!this.apartment.draw.basicDraw ? this.apartment.draw.basicDraw : null),
        updatedDraw: new FormControl(!!this.apartment.draw && !!this.apartment.draw.updatedDraw ? this.apartment.draw.updatedDraw : null)
      })
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

  get pictures() {
    return this.apartmentForm.get('pictures') as FormArray;
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

  handleAddressChange(address: Address) {
    this.apartmentForm.get('address').get('city').setValue(address.formatted_address);
    this.apartmentForm.get('address').get('location').setValue({
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    });
    this.searchTerms.emit(this.apartmentForm.get('address').value);
  }

  async onFilesChange(event) {
    const newApartmentPictures = event.target.files;

    try {
      const filenames = await this.imageUploaderService.upload(newApartmentPictures);

      for (let i = 0; i < filenames.length; i++) {
        this.pictures.push(new FormControl(filenames[i]));
      }
    } catch (e) {
      console.log('ApartmentEditComponent->onFilesChange', e);
    }
  }

  removeApartmentPicture(index) {
    if (this.pictures.value[index] === this.apartmentForm.get('setAsPicture').value) {
      this.apartmentForm.get('setAsPicture').reset();
    }
    this.pictures.removeAt(index);
  }

  setAsPicture(picture: string) {
    this.apartmentForm.get('setAsPicture').setValue(picture);
  }

  search(term: Apartment['address']) {
    this.searchTerms.emit(term);
  }

  arrayNumber(n: number) {
    return Array(n);
  }

  arrayChar() {
    const charArray = [];

    for (let i = 65; i <= 90; i++) {
      charArray.push(String.fromCharCode(i));
    }

    return charArray;
  }

  onBack() {
    this.router.navigate(['/app/my-properties']);
  }

  onOpenFloorPlanModal() {
    const results = this.apartment;

    this.floorPlanModalService.show(results);
  }

  onOpenConfirmModal() {
    const result = {
      type: 'deleteApartment',
      title: 'DELETE_APARTMENT',
      message: ['ACTION_NOT_REVERSIBLE', 'SURE_DELETE_APARTMENT'],
      btnOk: 'DELETE',
      btnCancel: 'CANCEL',
      id: this.apartment._id
    };

    this.confirmModalService.show(result);
  }

  async submit() {
    if (this.apartmentForm.valid) {
      const apartmentData = {
        ...this.apartment,
        ...this.apartmentForm.value
      };

      try {
        await this.myPropertiesService.updateApartment(apartmentData);
        this.toastrService.success('The apartment is updated successfully.', 'Success!');
        this.router.navigate(['/app/my-properties']);
      } catch (e) {
        this.toastrService.error('Something went wrong', 'Error');
        console.log('ApartmentEditComponent->submit', e);
      }
    } else {
      this.validateFormFieldsService.validate(this.apartmentForm);
    }
  }

}
