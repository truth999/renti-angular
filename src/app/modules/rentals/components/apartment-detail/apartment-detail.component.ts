import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/apartment.model';
import { config } from '../../../../../config';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {

  public apartmentId: string;
  public apartment: Apartment;

  public itemForm: FormGroup;

  public rooms: Room[] = [];
  // TODO:: These static values should be fixed
  public apartmentConfig = config.apartment;

  constructor(
    private fb: FormBuilder,
    private apartmentService: ApartmentService,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.apartmentId = params['id'];
      }
    });

    try {
      const roomsResponse = await this.roomService.getRooms();
      this.rooms = roomsResponse.rooms;

      if (this.apartmentId) {
        const response = await this.apartmentService.getApartment(this.apartmentId);
        this.apartment = response.apartment;
      }
      this.buildItemForm();
    } finally {
    }

  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      address: [!!this.apartment ? this.apartment.address : '' , Validators.required],
      typeOfBuilding: [!!this.apartment ? this.apartment.typeOfBuilding : '', Validators.required],
      yearOfConstruction: [!!this.apartment ? this.apartment.yearOfConstruction : 1970, Validators.required],
      stateOfApartment: [!!this.apartment ? this.apartment.stateOfApartment : '' , Validators.required],
      energyPerformanceCertificate: [!!this.apartment ? this.apartment.energyPerformanceCertificate : ''],
      floorsOfBuilding: [!!this.apartment ? this.apartment.floorsOfBuilding : null, Validators.required],
      floorsOfApartment: [!!this.apartment ? this.apartment.floorsOfApartment : null , Validators.required],
      size: [!!this.apartment ? this.apartment.size : null , Validators.required],
      elevator: [!!this.apartment ? this.apartment.elevator : false, Validators.required],
      rooftop: [!!this.apartment ? this.apartment.rooftop : false, Validators.required],
      buildingSiting: [!!this.apartment ? this.apartment.buildingSiting : '', Validators.required],
      typeOfHeating: [!!this.apartment ? this.apartment.typeOfHeating : '', Validators.required],
      headroom: [!!this.apartment ? this.apartment.headroom : null, Validators.required],
      parking: [!!this.apartment ? this.apartment.parking : false, Validators.required],
      childFriendly: [!!this.apartment ? this.apartment.childFriendly : false, Validators.required],
      petFriendly: [!!this.apartment ? this.apartment.petFriendly : false, Validators.required],
      externalIsolation: [!!this.apartment ? this.apartment.externalIsolation : false],
      mediaServiceProviders: [!!this.apartment ? this.apartment.mediaServiceProviders : null, Validators.required],
      handicapAccessible: [!!this.apartment ? this.apartment.handicapAccessible :  false, Validators.required],
      externalsBalcony: [!!this.apartment ? this.apartment.externals.balcony : false],
      sizeOfExternalsBalcony: [!!this.apartment ? this.apartment.sizeOfExternals.balcony : 0],
      externalsGarden: [!!this.apartment ? this.apartment.externals.garden : false],
      sizeOfExternalsGarden: [!!this.apartment ? this.apartment.sizeOfExternals.garden : 0],
      externalsTerrace: [!!this.apartment ? this.apartment.externals.terrace : false],
      sizeOfExternalsTerrace: [!!this.apartment ? this.apartment.sizeOfExternals.terrace : 0],
      airConditioner: [!!this.apartment ? this.apartment.airConditioner : false, Validators.required],
      garage: [!!this.apartment ? this.apartment.garage : false, Validators.required],
      rentalFee: [!!this.apartment ? this.apartment.rentalFee : null, Validators.required],
      overhead: [!!this.apartment ? this.apartment.overhead : null, Validators.required],
      deposit: [!!this.apartment ? this.apartment.deposit : null, Validators.required],
      minimumRentingTime: [!!this.apartment ? this.apartment.minimumRentingTime : null, Validators.required],
      dateOfMovingIn: [!!this.apartment ? this.apartment.dateOfMovingIn : '', Validators.required],
      rooms: [!!this.apartment ? this.apartment.rooms : null, Validators.required],
    });
  }

  async submit() {
    const tempApartment = {
      address: this.itemForm.value.address,
      typeOfBuilding: this.itemForm.value.typeOfBuilding,
      yearOfConstruction: this.itemForm.value.yearOfConstruction,
      stateOfApartment: this.itemForm.value.stateOfApartment,
      energyPerformanceCertificate: this.itemForm.value.energyPerformanceCertificate,
      floorsOfBuilding: this.itemForm.value.floorsOfBuilding,
      floorsOfApartment: this.itemForm.value.floorsOfApartment,
      size: this.itemForm.value.size,
      elevator: this.itemForm.value.elevator,
      rooftop: this.itemForm.value.rooftop,
      buildingSiting: this.itemForm.value.buildingSiting,
      typeOfHeating: this.itemForm.value.typeOfHeating,
      headroom: this.itemForm.value.headroom,
      parking: this.itemForm.value.parking,
      childFriendly: this.itemForm.value.childFriendly,
      petFriendly: this.itemForm.value.petFriendly,
      externalIsolation: this.itemForm.value.externalIsolation,
      mediaServiceProviders: this.itemForm.value.mediaServiceProviders,
      handicapAccessible: this.itemForm.value.handicapAccessible,
      externals: {
        balcony: this.itemForm.value.externalsBalcony,
        garden: this.itemForm.value.externalsGarden,
        terrace: this.itemForm.value.externalsTerrace
      },
      sizeOfExternals: {
        balcony: this.itemForm.value.sizeOfExternalsBalcony,
        garden: this.itemForm.value.sizeOfExternalsGarden,
        terrace: this.itemForm.value.sizeOfExternalsTerrace
      },
      airConditioner: this.itemForm.value.airConditioner,
      garage: this.itemForm.value.garage,
      rentalFee: this.itemForm.value.rentalFee,
      overhead: this.itemForm.value.overhead,
      deposit: this.itemForm.value.deposit,
      minimumRentingTime: this.itemForm.value.minimumRentingTime,
      dateOfMovingIn: this.itemForm.value.dateOfMovingIn,
      rooms: this.itemForm.value.rooms
    };
    this.apartment = {...this.apartment, ...tempApartment};

    try {
      if (!this.apartmentId) {
        await this.apartmentService.createApartment(this.apartment);
      } else {
        await this.apartmentService.updateApartment(this.apartment);
      }
      this.router.navigate(['/rentals/apartments']);
    } finally {
    }
  }

  goBack() {
    this.location.back();
  }

  getRoomLabel(room: Room) {
    return `${room.name} ${room.size}m2 Coverage:${room.coverage} WindowType: ${room.windowType}`;
  }

}
