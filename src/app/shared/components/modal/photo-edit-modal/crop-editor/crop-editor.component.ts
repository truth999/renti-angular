import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CropCommand } from '../command/crop.command';

@Component({
  selector: 'app-crop-editor',
  templateUrl: './crop-editor.component.html',
  styleUrls: ['./crop-editor.component.scss']
})
export class CropEditorComponent implements OnInit {
  @Input() mainController;

  @ViewChild('frameWrapper') frameWrapper: ElementRef;
  @ViewChild('frame') frame: ElementRef;
  @ViewChild('backgroundImage') backgroundImage: ElementRef;
  @ViewChild('frameImage') frameImage: ElementRef;

  preview;

  options = {
    zoom: 1,
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };

  isMoving = false;

  params = {
    lastX: null,
    lastY: null,
    imageLeftStart: null,
    imageTopStart: null,
    imageWidthStart: null,
    imageHeightStart: null,
    imageRatio: null,
    imageLeft: 0,
    imageTop: 0,
    imageWidth: null,
    imageHeight: null
  };

  constructor(
    private element: ElementRef
  ) {
    this.startMove = this.startMove.bind(this);
    this.moveImage = this.moveImage.bind(this);
    this.stopMove = this.stopMove.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  ngOnInit() {
    this.preview = this.mainController.canvas.toDataURL();

    this.frame.nativeElement.addEventListener('mousedown', this.startMove);
    this.frame.nativeElement.addEventListener('mousemove', this.moveImage);
    this.element.nativeElement.addEventListener('mouseup', this.stopMove);

    this.backgroundImage.nativeElement.addEventListener('load', this.onImageLoad);
    this.frameImage.nativeElement.addEventListener('load', this.onImageLoad);
  }

  startMove(event) {
    event.preventDefault();

    this.isMoving = true;

    this.params.lastX = event.clientX;
    this.params.lastY = event.clientY;

    this.params.imageLeftStart = this.params.imageLeft;
    this.params.imageTopStart = this.params.imageTop;
  }

  moveImage(event) {
    if (this.isMoving) {
      event.preventDefault();

      const left = this.params.imageLeftStart - (this.params.lastX - event.clientX);
      const top = this.params.imageTopStart - (this.params.lastY - event.clientY);

      this.params.imageLeft = left;
      this.params.imageTop = top;

      this.drawChanges();
    }
  }

  stopMove(event) {
    event.preventDefault();

    this.isMoving = false;
    this.fixParams();
    this.drawChanges();
  }

  saveChanges() {
    const ratio = this.frameImage.nativeElement.offsetWidth / this.frameImage.nativeElement.naturalWidth;

    this.options.x = -(this.params.imageLeft) / ratio;
    this.options.y = -(this.params.imageTop) / ratio;
    this.options.width = this.frame.nativeElement.offsetWidth / ratio;
    this.options.height = this.frame.nativeElement.offsetHeight / ratio;

    const command = new CropCommand(this.mainController, this.options);

    this.mainController.saveCommand(command);
    this.mainController.setCurrentEditor(null);
  }

  fixParams() {
    if (this.params.imageTop > 0) {
      this.params.imageTop = 0;
    }

    if (this.params.imageLeft > 0) {
      this.params.imageLeft = 0;
    }

    const minTop = -(this.params.imageHeight - this.frame.nativeElement.offsetHeight);

    if (this.params.imageTop < minTop) {
      this.params.imageTop = minTop;
    }

    const minLeft = -(this.params.imageWidth - this.frame.nativeElement.offsetWidth);

    if (this.params.imageLeft < minLeft) {
      this.params.imageLeft = minLeft;
    }
  }

  drawChanges() {
    this.backgroundImage.nativeElement.style.left = this.params.imageLeft + 'px';
    this.backgroundImage.nativeElement.style.top = this.params.imageTop + 'px';
    this.backgroundImage.nativeElement.style.width = this.params.imageWidth + 'px';
    this.backgroundImage.nativeElement.style.height = this.params.imageHeight + 'px';

    this.frameImage.nativeElement.style.left = this.params.imageLeft + 'px';
    this.frameImage.nativeElement.style.top = this.params.imageTop + 'px';
    this.frameImage.nativeElement.style.width = this.params.imageWidth + 'px';
    this.frameImage.nativeElement.style.height = this.params.imageHeight + 'px';
  }

  onZoomChange(zoom) {
    this.options.zoom = zoom;

    const width = this.params.imageWidthStart * zoom;
    const height = this.params.imageHeightStart  * zoom;

    const left = this.params.imageLeft - (width - this.params.imageWidth) / 2;
    const top = this.params.imageTop - (height - this.params.imageHeight) / 2;

    this.params.imageTop = top;
    this.params.imageLeft = left;
    this.params.imageWidth = width;
    this.params.imageHeight = height;

    this.fixParams();
    this.drawChanges();
  }

  onImageLoad(event) {
    const frameWidth = this.frame.nativeElement.offsetWidth;

    this.params.imageWidthStart = frameWidth;
    event.target.style.width = frameWidth + 'px';

    this.params.imageHeightStart = event.target.offsetHeight;

    this.params.imageWidth = this.params.imageWidthStart;
    this.params.imageHeight = this.params.imageHeightStart;

    this.params.imageRatio = this.params.imageWidth / this.params.imageHeight;

    setTimeout(() => {
      this.onZoomChange(1);
    });
  }

}
