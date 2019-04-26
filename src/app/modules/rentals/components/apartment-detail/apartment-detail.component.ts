import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSendOffer() {
    this.router.navigate(['/app/offers/create']);
  }

}
