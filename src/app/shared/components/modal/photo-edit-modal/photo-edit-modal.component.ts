import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoEditPointer } from './photo-edit-pointer';
import { BehaviorSubject } from 'rxjs';
import { ResponsiveService } from '../../../services/responsive.service';
import { PhotoEditCrop } from './photo-edit-crop';
import { CropCommand } from './command/crop.command';

@Component({
  selector: 'app-photo-edit-modal',
  templateUrl: './photo-edit-modal.component.html',
  styleUrls: ['./photo-edit-modal.component.scss']
})
export class PhotoEditModalComponent implements OnInit, OnDestroy {
  @Input() result: any;

  canvas: any;
  canvasContainer: any;
  image: any = new Image();
  savedCommands = [];

  currentEditor: string;
  editorCenter = {
    x: null,
    y: null
  };

  pointer: PhotoEditPointer;
  photoCropService: PhotoEditCrop;

  inProcess = false;
  forceHideEditor = false;

  isMobile: BehaviorSubject<boolean>;

  constructor(
    private modal: NgbActiveModal,
    private responsiveService: ResponsiveService
  ) {
    this.isMobile = this.responsiveService.isMobile;
  }

  ngOnInit() {
    this.canvas = document.getElementById('photo-edit-canvas');
    this.canvasContainer = document.getElementsByClassName('canvas-container')[0];

    this.image = new Image();
    this.image.onload = this.onImageLoad.bind(this);
    this.image.onerror = this.onImageError.bind(this);

    if (this.result.indexOf('http') === 0) {
      this.image.setAttribute('crossOrigin', 'anonymous');
    }

    this.image.src = this.result;

    this.initPointers();

    window.addEventListener('orientationchange', this.onOrientationChange.bind(this));

    this.setCurrentEditor('crop');
  }

  ngOnDestroy() {
    window.removeEventListener('orientationchange', this.onOrientationChange, false);
  }

  initPointers() {
    this.pointer = new PhotoEditPointer(this);
    this.doCropService('create');
    this.doCropService('bindEvents');
  }

  doCropService(action, event = undefined) {
    if (this.isMobile.getValue()) {
      switch (action) {
        case 'create':
          this.photoCropService = new PhotoEditCrop(this);
          break;

        case 'crop':
          this.crop();
          break;

        default:
          this.photoCropService[action](event);
          break;
      }
    }
  }

  onImageLoad() {
    this.canvas.width = this.image.naturalWidth;
    this.canvas.height = this.image.naturalHeight;

    this.drawImage();

    this.doCropService('calculate');
    this.updateEditorCenter();
  }

  onImageError() {
  }

  drawImage() {
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.canvas.getContext('2d').drawImage(this.image, 0, 0);
  }

  crop() {
    this.saveCommand(new CropCommand(this, this.photoCropService.getCropOptions()));
    this.executeCommands(this.savedCommands);

    this.photoCropService.calculate();
  }

  saveCommand(command) {
    this.savedCommands.push(command);
  }

  executeCommands(commands) {
    this.drawImage();

    commands.forEach(command => {
      command.execute();
    });
  }

  updateEditorCenter() {
    this.editorCenter.x = this.canvas.width / 2;
    this.editorCenter.y = this.canvas.height / 2;
  }

  setCurrentEditor(editor) {
    if (!this.isMobile.getValue()) {
      this.currentEditor = editor;

      if (editor) {
        this.doCropService('unBindEvents');
      } else {
        this.doCropService('bindEvents');
      }

      this.executeCommands(this.savedCommands);
      this.updateEditorCenter();
    }
  }

  onOrientationChange() {
    this.doCropService('calculate');
  }

  onPinchStart(event) {
    event.preventDefault();
    if (!this.currentEditor) {
      this.doCropService('onPinchStart', event);
    }
  }

  onPinchEnd(event) {
    if (!this.currentEditor) {
      this.doCropService('onPinchEnd', event);
    }
  }

  onPinch(event) {
    event.preventDefault();

    if (!this.currentEditor) {
      this.doCropService('onPinch', event);
    }
  }

  savePhoto() {
    if (this.inProcess) {
      return;
    }

    this.doCropService('crop');

    this.inProcess = true;

    this.modal.close(this.canvas.toDataURL());
  }

}
