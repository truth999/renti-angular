import { Component, DoCheck, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';

import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';
import { ApartmentCreateService } from '../../../services/apartment-create.service';

import { Apartment } from '../../../../../shared/models';

@Component({
  selector: 'app-apartment-draw',
  templateUrl: './apartment-draw.component.html',
  styleUrls: ['./apartment-draw.component.scss']
})
export class ApartmentDrawComponent implements OnInit, DoCheck {
  apartment: Apartment;
  apartmentDrawForm: FormGroup;
  @Output() drawValid = new EventEmitter<boolean>();
  @Output() drawImage = new EventEmitter<string>();
  @ViewChild('draw') draw: ElementRef;

  constructor(
    private imageUploaderService: ImageUploaderService,
    private apartmentCreateService: ApartmentCreateService
  ) { }

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
    if (!!apartmentDraw.draw) {
      html2canvas(this.draw.nativeElement, { logging: false }).then(async canvas => {
        const image = canvas.toDataURL();
        const blobImage = this.imageUploaderService.b64toBlob(image);

        try {
          const imageName = await this.imageUploaderService.upload(blobImage);
          const draw = {
            ...this.apartment,
            draw: {
              basicDraw: imageName[0],
              updatedDraw: ''
            }
          };

          this.apartmentCreateService.createApartmentData(draw);
        } catch (e) {
          console.log('ApartmentDrawComponent->html2canvas');
        }
      });
    }

    this.drawImage.emit(apartmentDraw.draw);
  }

}
