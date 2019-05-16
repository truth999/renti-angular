import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apartment-data',
  templateUrl: './apartment-data.component.html',
  styleUrls: ['./apartment-data.component.scss']
})
export class ApartmentDataComponent implements OnInit {
  mediaService = [
    'UPC', 'DIGI', 'Telekom', 'Other'
  ];

  apartmentForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.apartmentForm = new FormGroup({
      address: new FormControl('', Validators.required),
      typeOfBuilding: new FormControl('', Validators.required),
      yearOfConstruction: new FormControl('', Validators.required),
      stateOfApartment: new FormControl('', Validators.required),
      energyPerformanceCertificate: new FormControl(''),
      floorsOfBuilding: new FormControl('', Validators.required),
      floorsOfApartment: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      elevator: new FormControl(false, Validators.required),
      rooftop: new FormControl(false, Validators.required),
      buildingSiting: new FormControl('', Validators.required),
      typeOfHeating: new FormControl('', Validators.required),
      headroom: new FormControl('', Validators.required),
      parking: new FormControl(false, Validators.required),
      childFriendly: new FormControl(false, Validators.required),
      petFriendly: new FormControl(false, Validators.required),
      externalIsolation: new FormControl(false),
      mediaServiceProviders: new FormControl('', Validators.required),
      handicapAccessible: new FormControl(false, Validators.required),
      externals: new FormGroup({
        balcony: new FormControl(false, Validators.required),
        garden: new FormControl(false, Validators.required),
        terrace: new FormControl(false, Validators.required),
      }),
      sizeOfExternals: new FormGroup({
        balcony: new FormControl('', Validators.required),
        garden: new FormControl('', Validators.required),
        terrace: new FormControl('', Validators.required),
      }),
      airConditioner: new FormControl(false, Validators.required),
      garage: new FormControl(false, Validators.required),
      rentalFee: new FormControl('', Validators.required),
      overhead: new FormControl('', Validators.required),
      deposit: new FormControl('', Validators.required),
      minimumRentingTime: new FormControl('', Validators.required),
      dateOfMovingIn: new FormGroup({
        day: new FormControl('', Validators.required),
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
      })
    });
  }

  arrayNumber(n: number) {
    return Array(n);
  }

  submit() {
    const apartment = { ...this.apartmentForm.value };
    if (this.apartmentForm.valid) {
      console.log(apartment);
    }
  }

}
