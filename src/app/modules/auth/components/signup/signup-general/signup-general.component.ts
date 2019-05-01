import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-signup-general',
  templateUrl: './signup-general.component.html',
  styleUrls: ['./signup-general.component.scss']
})
export class SignupGeneralComponent implements OnInit {

  @Output() typeSelected = new EventEmitter<string>();

  isLandlord = false;
  isTenant = false;

  constructor() { }

  ngOnInit() {
  }

  onLandlord(role: string) {
    this.isLandlord = true;
    this.isTenant = false;
    this.typeSelected.emit(role);
  }

  onTenant(role: string) {
    this.isLandlord = false;
    this.isTenant = true;
    this.typeSelected.emit(role);
  }
  onSelectType(type: string) {
    this.typeSelected.emit(type);
  }


}
