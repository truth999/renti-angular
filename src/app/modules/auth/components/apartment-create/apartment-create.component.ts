import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-create',
  templateUrl: './apartment-create.component.html',
  styleUrls: ['./apartment-create.component.scss']
})
export class ApartmentCreateComponent implements OnInit {
  step = 0;
  @ViewChild('room') roomChild;
  @ViewChild('window') windowChild;
  @ViewChild('apartment') apartmentChild;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onNextStep() {
    this.step = this.step + 1;

    if (this.step > 5) {
      this.step = 5;
      // this.router.navigate(['/app/rentals/search']);
    }

    if (this.roomChild) {
      this.roomChild.submit();
    }

    if (this.windowChild) {
      this.windowChild.submit();
    }

    if (this.apartmentChild) {
      this.apartmentChild.submit();
    }
  }

  onPreviewStep() {
    this.step = this.step - 1;

    if (this.step < 0) {
      this.step = 0;
    }
  }

}
