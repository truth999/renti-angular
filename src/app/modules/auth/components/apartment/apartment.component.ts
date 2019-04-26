import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {
  step = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onNextStep() {
    this.step = this.step + 1;

    if (this.step > 4) {
      this.step = 4;
      this.router.navigate(['/app/rentals/search']);
    }
  }

  onPreviewStep() {
    this.step = this.step - 1;

    if (this.step < 0) {
      this.step = 0;
    }
  }

}
