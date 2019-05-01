import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-create',
  templateUrl: './apartment-create.component.html',
  styleUrls: ['./apartment-create.component.scss']
})
export class ApartmentCreateComponent implements OnInit {
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
