import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

@Component({
  selector: 'app-apartment-draw',
  templateUrl: './apartment-draw.component.html',
  styleUrls: ['./apartment-draw.component.scss']
})
export class ApartmentDrawComponent implements OnInit, DoCheck {
  apartmentDrawForm: FormGroup;
  @Output() drawValid = new EventEmitter<boolean>();
  @Output() drawImage = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    this.drawValid.emit(this.apartmentDrawForm.valid);
  }

  buildForm() {
    this.apartmentDrawForm = new FormGroup({
      draw: new FormControl(null)
    });
  }

  onFileChange(event) {
    const newPicture = event.target.files;
    this.readFile(newPicture[0]);
  }

  readFile(file) {
    if (file.type.match(/image.*/)) {
      const fileReader = new FileReader();

      fileReader.addEventListener('loadend', (event: any) => {
        this.apartmentDrawForm.get('draw').setValue(event.target.result);
      });

      fileReader.readAsDataURL(file);
    } else {
      console.log('Wrong file type');
    }
  }

  submit() {
    const apartmentDraw = this.apartmentDrawForm.value;
    this.drawImage.emit(apartmentDraw.draw);
  }

}
