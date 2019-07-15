import { Component, DoCheck, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';

import { ApartmentCreateService } from '../../../services/apartment-create.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';

import { Apartment, Room } from '../../../../../shared/models';
import { Validate } from '../../../../../../config/validate';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-apartment-room',
  templateUrl: './apartment-room.component.html',
  styleUrls: ['./apartment-room.component.scss']
})
export class ApartmentRoomComponent implements OnInit, DoCheck {
  @Input() drawImage: string;
  roomForm: FormGroup;
  roomsData: Room[];
  apartment: Apartment;
  pattern = Validate;
  @Output() roomFormValid = new EventEmitter<boolean>();
  uploadBase = environment.uploadBase;
  pointX: number;
  pointY: number;
  @ViewChild('draw') draw: ElementRef;

  constructor(
    private apartmentCreateService: ApartmentCreateService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private imageUploaderService: ImageUploaderService
  ) { }

  ngOnInit() {
    this.roomsData = this.apartmentCreateService.rooms;
    this.apartment = this.apartmentCreateService.apartment;
    this.roomForm = new FormGroup({
      rooms: new FormArray(!!this.roomsData ? this.roomsData.map(room => {
        return new FormGroup({
          name: new FormControl(room.name, Validators.required),
          size: new FormControl(room.size, [Validators.required, Validators.min(1), Validators.max(100)])
        });
      }) : [new FormGroup({
        name: new FormControl(null, Validators.required),
        size: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
      })])
    });
  }

  ngDoCheck() {
    this.roomFormValid.emit(this.roomForm.valid);
  }

  get rooms() {
    return this.roomForm.get('rooms') as FormArray;
  }

  onAddRoom() {
    if (this.rooms.length < 20) {
      this.rooms.push(new FormGroup({
        name: new FormControl(null, Validators.required),
        size: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
      }));
    }
  }

  onRemoveRoom(index: number) {
    if (this.rooms.length > 1) {
      this.rooms.removeAt(index);
    }
  }

  allowDrop(event) {
    event.preventDefault();
  }

  dragstart(event, index) {
    this.pointX = event.offsetX;
    this.pointY = event.offsetY;
    event.dataTransfer.setData('text', event.target.id + ',' + (index + 1));
    console.log(event);
  }

  drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text').split(',');
    const dragData = document.getElementById(data[0]);
    const x = event.offsetX - this.pointX;
    const y = event.offsetY - this.pointY;
    document.getElementById('draw').appendChild(dragData);
    dragData.style.left = x + 'px';
    dragData.style.top = y + 'px';
    document.getElementById('small-room' + data[1]).style.display = 'flex';
    if (document.getElementById('remove' + data[1])) {
      document.getElementById('remove' + data[1]).remove();
    }
  }

  touchstart(event) {
    // console.log(event);
  }

  touchmove(event) {
    // console.log(event);
  }

  touchend(event) {
    // console.log(event);
  }

  getDrawUrl() {
    return `url(${this.drawImage})`;
  }

  submit() {
    if (this.roomForm.valid) {
      html2canvas(this.draw.nativeElement).then(async canvas => {
        const image = canvas.toDataURL();
        const blobImage = this.imageUploaderService.b64toBlob(image);
        try {
          const imageName = await this.imageUploaderService.upload(blobImage);
          const draw = {
            ...this.apartment,
            draw: imageName[0]
          };
          this.apartmentCreateService.createApartmentData(draw);
        } catch (e) {
          console.log('ApartmentRoomComponent->html2canvas', e);
        }
      });
      const rooms = { ...this.roomForm.value };
      this.apartmentCreateService.createRoomsData(rooms.rooms);
    } else {
      this.validateFormFieldsService.validate(this.roomForm);
    }
  }

}
