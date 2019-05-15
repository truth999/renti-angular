import { Component, OnInit } from '@angular/core';
import { ApartmentCreateService } from '../../../services/apartment-create.service';

@Component({
  selector: 'app-apartment-floor',
  templateUrl: './apartment-floor.component.html',
  styleUrls: ['./apartment-floor.component.scss']
})
export class ApartmentFloorComponent implements OnInit {
  counter: number;

  constructor(
    private apartmentCreateService: ApartmentCreateService
  ) { }

  ngOnInit() {
    this.counter = this.apartmentCreateService.roomCount;
    this.apartmentCreateService.roomCountChanged.subscribe(counter => {
      this.counter = counter;
    });
  }

  onPlus() {
    this.apartmentCreateService.increaseRoomCount();
  }

  onMinus() {
    this.apartmentCreateService.decreaseRoomCount();
  }

}
