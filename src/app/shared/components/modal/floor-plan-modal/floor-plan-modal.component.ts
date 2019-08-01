import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';

import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';
import { MyPropertiesService } from '../../../../modules/my-properties/services/my-properties.service';
import { ImageUploaderService } from '../../../../core/services/image-uploader.service';

import { Apartment } from '../../../models';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-floor-plan-modal',
  templateUrl: './floor-plan-modal.component.html',
  styleUrls: ['./floor-plan-modal.component.scss']
})
export class FloorPlanModalComponent implements OnInit {
  @Input() result: Apartment;
  floorPlanForm: FormGroup;
  willDeleteRooms = [];
  pointX: number;
  pointY: number;
  originalX: number;
  originalY: number;
  @ViewChild('draw') draw: ElementRef;
  uploadBase = environment.uploadBase;
  drawUrl: string;

  constructor(
    private modal: NgbActiveModal,
    private myPropertiesService: MyPropertiesService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private imageUploaderService: ImageUploaderService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.buildForm();

    if (this.updatedDraw.value) {
      this.drawUrl = this.uploadBase + this.updatedDraw.value;
    }
  }

  buildForm() {
    this.floorPlanForm = new FormGroup({
      draw: new FormGroup({
        basicDraw: new FormControl(!!this.result.draw && !!this.result.draw.basicDraw ? this.result.draw.basicDraw : null),
        updatedDraw: new FormControl(!!this.result.draw && !!this.result.draw.updatedDraw ? this.result.draw.updatedDraw : null)
      }),
      rooms: new FormArray(this.result.rooms.map(room => {
        return new FormGroup({
          _id: new FormControl(room._id),
          name: new FormControl(room.name, Validators.required),
          size: new FormControl(room.size, [Validators.required, Validators.min(1), Validators.max(100)])
        });
      }))
    });
  }

  get rooms() {
    return this.floorPlanForm.get('rooms') as FormArray;
  }

  get basicDraw() {
    return this.floorPlanForm.get('draw').get('basicDraw');
  }

  get updatedDraw() {
    return this.floorPlanForm.get('draw').get('updatedDraw');
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
      if (this.result.rooms[index]) {
        this.willDeleteRooms.push(this.result.rooms[index]);
      }
      this.rooms.removeAt(index);
      this.result.rooms.splice(index, 1);
    }
  }

  async onFileChange(event) {
    const newPicture = event.target.files;
    this.readFile(newPicture[0]);
  }

  readFile(file) {
    if (file.type.match(/image.*/)) {
      const fileReader = new FileReader();

      fileReader.addEventListener('loadend', async (event: any) => {
        const blobImage = this.imageUploaderService.b64toBlob(event.target.result);

        try {
          const imageName = await this.imageUploaderService.upload(blobImage);
          this.updatedDraw.setValue(null);
          this.basicDraw.setValue(imageName[0]);
          this.drawUrl = this.uploadBase + this.basicDraw.value;
        } catch (e) {
          console.log('FloorPlanModalComponent->onFileChange->html2canvas', e);
        }
      });

      fileReader.readAsDataURL(file);
    } else {
      console.log('Wrong file type');
    }
  }

  onReset() {
    if (this.basicDraw.value) {
      this.drawUrl = this.uploadBase + this.basicDraw.value;
    }
  }

  getDrawUrl() {
    if (!!this.drawUrl) {
      return `url(${this.drawUrl})`;
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
    event.preventDefault();
    const floorPlanModal = document.getElementsByClassName('floor-plan-modal')[0];
    const touchLocation = event.targetTouches[0];
    const left = this.getPosition(touchLocation.target.offsetParent).left;
    const top = this.getPosition(touchLocation.target.offsetParent).top;
    const pageX = (touchLocation.pageX - event.target.offsetWidth / 2 - left - window.scrollX + floorPlanModal.scrollLeft) + 'px';
    const pageY = (touchLocation.pageY - event.target.offsetHeight / 2 - top - window.scrollY + floorPlanModal.scrollTop) + 'px';
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

  async submit() {
    if (this.floorPlanForm.valid) {
      try {
        const apartment = this.result;

        const roomsData = this.floorPlanForm.value.rooms;

        const willCreateRooms = [];
        const willDeleteRooms = this.willDeleteRooms;

        for (let i = 0; i < roomsData.length; i++) {
          if (roomsData[i]._id) {
            await this.myPropertiesService.updateRoom(roomsData[i]);
          } else {
            willCreateRooms.push(roomsData[i]);
          }
        }

        if (willCreateRooms.length !== 0) {
          const createdRoomsResponse = await this.myPropertiesService.createRooms(willCreateRooms);
          const createdRooms = createdRoomsResponse.rooms;
          apartment.rooms = apartment.rooms.concat(createdRooms);
        }

        if (willDeleteRooms.length !== 0) {
          for (let j = 0; j < willDeleteRooms.length; j++) {
            await this.myPropertiesService.deleteRoom(willDeleteRooms[j]._id);
          }
        }

        if (this.basicDraw.value) {
          apartment.draw = this.floorPlanForm.get('draw').value;

          html2canvas(this.draw.nativeElement, { logging: false, useCORS: true }).then(async canvas => {
            const image = canvas.toDataURL();
            const blobImage = this.imageUploaderService.b64toBlob(image);

            try {
              const imageName = await this.imageUploaderService.upload(blobImage);
              this.updatedDraw.setValue(imageName[0]);
              apartment.draw = this.floorPlanForm.get('draw').value;

              await this.myPropertiesService.updateApartment(apartment);

              this.toastrService.success('The apartment is updated successfully.', 'Success!');
              this.modal.close();
            } catch (e) {
              console.log('FloorPlanModalComponent->submit->html2canvas', e);
            }
          });
        } else {
          await this.myPropertiesService.updateApartment(apartment);

          this.toastrService.success('The apartment is updated successfully.', 'Success!');
          this.modal.close();
        }
      } catch (e) {
        console.log('FloorPlanModalComponent->submit', e);
        this.toastrService.error('Something went wrong', 'Error');
      }
    } else {
      this.validateFormFieldsService.validate(this.floorPlanForm);
    }
  }

  onClose() {
    this.modal.dismiss();
  }

}
