import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-apartment-draw',
  templateUrl: './apartment-draw.component.html',
  styleUrls: ['./apartment-draw.component.scss']
})
export class ApartmentDrawComponent implements OnInit {
  @Output() nextStep = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onNext(e) {
    e.preventDefault();
    this.nextStep.emit();
  }

}
