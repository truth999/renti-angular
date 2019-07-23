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
  originalX: number;
  originalY: number;
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

  touchstart(event, index) {
    this.originalX = event.target.offsetLeft;
    this.originalY = event.target.offsetTop;

    event.target.style.position = 'absolute';

    document.getElementById('small-room' + (index + 1)).style.display = 'flex';
  }

  touchmove(event) {
    const touchLocation = event.targetTouches[0];
    const left = this.getPosition(touchLocation.target.offsetParent).left;
    const top = this.getPosition(touchLocation.target.offsetParent).top;
    const pageX = (touchLocation.pageX - event.target.offsetWidth / 2 - left) + 'px';
    const pageY = (touchLocation.pageY - event.target.offsetHeight / 2 - top) + 'px';
    event.target.style.left = pageX;
    event.target.style.top = pageY;
  }

  touchend(event, index) {
    const pageX = parseInt(event.target.style.left, 10);
    const pageY = parseInt(event.target.style.top, 10);
    const draw = this.draw.nativeElement;

    if (!draw.hasChildNodes() || !draw.contains(event.target)) {
      const dropZoneWidth = draw.offsetWidth - event.target.offsetWidth;
      const dropZoneHeight = draw.offsetHeight - event.target.offsetHeight;

      if (this.detectTouchEnd(draw.offsetLeft, draw.offsetTop, pageX, pageY, dropZoneWidth, dropZoneHeight)) {
        draw.appendChild(event.target);
        event.target.style.left = (pageX - draw.offsetLeft) + 'px';
        event.target.style.top = (pageY - draw.offsetTop) + 'px';

        if (document.getElementById('remove' + (index + 1))) {
          document.getElementById('remove' + (index + 1)).remove();
        }
      } else {
        event.target.style.position = '';
        event.target.style.left = '';
        event.target.style.top = '';
        document.getElementById('small-room' + (index + 1)).style.display = 'none';
      }
    } else {
      const left = parseInt(event.target.style.left, 10);
      const top = parseInt(event.target.style.top, 10);
      const width = draw.offsetWidth - event.target.offsetWidth;
      const height = draw.offsetHeight - event.target.offsetHeight;

      if (left < 0 || left > width) {
        event.target.style.left = this.originalX + 'px';
      }

      if (top < 0 || top > height) {
        event.target.style.top = this.originalY + 'px';
      }
    }
  }

  getPosition(elem) {
    let left = 0;
    let top = 0;

    while (elem) {
      if (!isNaN(elem.offsetLeft)) {
        left += elem.offsetLeft;
        top += elem.offsetTop;
        elem = elem.offsetParent;
      }
    }

    return { left, top };
  }

  detectTouchEnd(x1, y1, x2, y2, w, h) {
    if (x2 - x1 > w || x2 - x1 < 0) {
      return false;
    }

    if (y2 - y1 > h || y2 - y1 < 0) {
      return false;
    }

    return true;
  }

  getDrawUrl() {
    if (this.drawImage) {
      return `url(${this.drawImage})`;
    }
  }

  submit() {
    if (this.roomForm.valid) {
      if (this.drawImage) {
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
      }

      const rooms = { ...this.roomForm.value };
      this.apartmentCreateService.createRoomsData(rooms.rooms);
    } else {
      this.validateFormFieldsService.validate(this.roomForm);
    }
  }

}
