import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApartmentCreateService } from '../../../../services/apartment-create.service';
import { DateSelectService } from '../../../../../../shared/services/date-select.service';

import { Apartment } from '../../../../../../shared/models';

@Component({
  selector: 'app-apartment-data-first',
  templateUrl: './apartment-data-first.component.html',
  styleUrls: ['./apartment-data-first.component.scss']
})
export class ApartmentDataFirstComponent implements OnInit, DoCheck {
  apartmentDataFirstForm: FormGroup;
  apartmentData: Apartment;
  years: string[];
  @Output() apartmentDataFirstFormValid = new EventEmitter<boolean>();

  constructor(
    private apartmentCreateService: ApartmentCreateService,
    private dateSelectService: DateSelectService
  ) { }

  ngOnInit() {
    this.years = this.dateSelectService.getYears();
    this.apartmentData = this.apartmentCreateService.apartment;

    this.apartmentDataFirstForm = new FormGroup({
      address: new FormControl(!!this.apartmentData ? this.apartmentData.address : '', Validators.required),
      typeOfBuilding: new FormControl(!!this.apartmentData ? this.apartmentData.typeOfBuilding : '', Validators.required),
      yearOfConstruction: new FormControl(!!this.apartmentData ? this.apartmentData.yearOfConstruction : '', Validators.required),
      stateOfApartment: new FormControl(!!this.apartmentData ? this.apartmentData.stateOfApartment : '', Validators.required),
      energyPerformanceCertificate: new FormControl(!!this.apartmentData ? this.apartmentData.energyPerformanceCertificate : ''),
      floorsOfBuilding: new FormControl(!!this.apartmentData ? this.apartmentData.floorsOfBuilding : '', Validators.required),
      floorsOfApartment: new FormControl(!!this.apartmentData ? this.apartmentData.floorsOfApartment : '', Validators.required),
      size: new FormControl(!!this.apartmentData ? this.apartmentData.size : '', Validators.required),
      elevator: new FormControl(!!this.apartmentData ? this.apartmentData.elevator : false, Validators.required),
      rooftop: new FormControl(!!this.apartmentData ? this.apartmentData.rooftop : false, Validators.required)
    });
  }

  ngDoCheck() {
    this.apartmentDataFirstFormValid.emit(this.apartmentDataFirstForm.valid);
  }

  submit() {
    const apartmentData = { ...this.apartmentDataFirstForm.value };
    this.apartmentCreateService.createApartmentData(apartmentData);
  }

}
