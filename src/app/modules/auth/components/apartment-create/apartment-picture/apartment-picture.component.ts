import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ApartmentCreateService } from '../../../services/apartment-create.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';

import { environment } from '../../../../../../environments/environment';

import { Apartment } from '../../../../../shared/models';

@Component({
  selector: 'app-apartment-picture',
  templateUrl: './apartment-picture.component.html',
  styleUrls: ['./apartment-picture.component.scss']
})
export class ApartmentPictureComponent implements OnInit {
  apartmentPictureForm: FormGroup;
  apartment: Apartment;

  uploadBase = environment.uploadBase;

  @Output() pictureValid = new EventEmitter<boolean>();

  constructor(
    private apartmentCreateService: ApartmentCreateService,
    private imageUploaderService: ImageUploaderService
  ) { }

  ngOnInit() {
    this.apartment = this.apartmentCreateService.apartment;

    this.apartmentPictureForm = new FormGroup({
      pictures: new FormArray(
        !!this.apartment && !!this.apartment.pictures && this.apartment.pictures.length !== 0 ? this.apartment.pictures.map(picture => {
          return new FormControl(picture);
        }) : []
      ),
      setAsPicture: new FormControl(!!this.apartment && !!this.apartment.setAsPicture ? this.apartment.setAsPicture : null)
    });

    this.pictureValid.emit(true);
  }

  get pictures() {
    return this.apartmentPictureForm.get('pictures') as FormArray;
  }

  async onFilesChange(event) {
    const newApartmentPictures = event.target.files;

    try {
      const filenames = await this.imageUploaderService.upload(newApartmentPictures);

      for (let i = 0; i < filenames.length; i++) {
        this.pictures.push(new FormControl(filenames[i]));
      }
    } catch (e) {
      console.log('ApartmentEditComponent->onFilesChange', e);
    }
  }

  removeApartmentPicture(index) {
    if (this.pictures.value[index] === this.apartmentPictureForm.get('setAsPicture').value) {
      this.apartmentPictureForm.get('setAsPicture').reset();
    }
    this.pictures.removeAt(index);
  }

  setAsPicture(picture: string) {
    this.apartmentPictureForm.get('setAsPicture').setValue(picture);
  }

  submit() {
    const apartmentData = { ...this.apartmentPictureForm.value };

    this.apartmentCreateService.createApartmentData(apartmentData);
  }

}
