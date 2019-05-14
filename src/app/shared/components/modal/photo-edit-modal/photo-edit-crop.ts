import { PhotoEditModalComponent } from './photo-edit-modal.component';

export class PhotoEditCrop {

  mainController: PhotoEditModalComponent;
  canvas: any;
  touchMode: string;

  RATIO = 1;
  TOUCH_MODE_SCROLL = 'scroll';
  TOUCH_MODE_ZOOM = 'zoom';

  params = {
    imageWidth: null,
    imageHeight: null,
    imageLeft: null,
    imageTop: null,

    containerHeight: null,
    containerWidth: null,

    lastTouchX: null,
    lastTouchY: null,

    frameWidth: null,
    frameOffsetWidth: 0,
    frameHeight: null,
    frameOffsetHeight: 0,

    pinchStartImageWidth: null,
    pinchStartImageHeight: null,
    pinchStartImageTop: null,
    pinchStartImageLeft: null,
    pinchStartPositionX: null,

    pinchStartImageWidthRatio: null,
    pinchStartImageHeightRatio: null,
  };

  touchStartEventCallback: any;
  touchMoveEventCallback: any;
  touchEndEventCallback: any;

  constructor(mainController) {
    this.mainController = mainController;
    this.canvas = mainController.canvas;

    this.touchStartEventCallback = this.onTouchStart.bind(this);
    this.touchMoveEventCallback = this.onTouchMove.bind(this);
    this.touchEndEventCallback = this.onTouchEnd.bind(this);
  }

  calculate() {

    this.params.containerHeight = this.mainController.canvasContainer.offsetHeight;
    this.params.containerWidth = this.mainController.canvasContainer.offsetWidth;

    this.params.frameWidth = this.params.containerHeight * this.RATIO;

    if (this.params.containerWidth > this.params.frameWidth) {
      this.params.frameHeight = this.params.containerHeight;
      this.params.frameOffsetWidth = (this.params.containerWidth - this.params.frameWidth) / 2;
    } else {
      this.params.frameHeight = this.params.containerWidth / this.RATIO;

      this.params.frameWidth = this.params.containerWidth;
      this.params.frameOffsetHeight = (this.params.containerHeight - this.params.frameHeight) / 2;
    }

    this.params.imageHeight = this.params.containerHeight;
    this.params.imageWidth = this.params.containerHeight * this.canvas.width / this.canvas.height;

    if (this.params.imageWidth < this.params.frameWidth) {
      this.params.imageWidth = this.params.frameWidth;
      this.params.imageHeight = this.params.imageWidth * this.canvas.height / this.canvas.width;
    }

    this.params.imageLeft = -(this.params.imageWidth / 2 - this.params.containerWidth / 2);
    this.params.imageTop = -(this.params.imageHeight / 2 - this.params.containerHeight / 2);

    this.canvas.style.height = this.params.imageHeight + 'px';
    this.canvas.style.width = this.params.imageWidth + 'px';
    this.canvas.style.left = this.params.imageLeft + 'px';
    this.canvas.style.top = this.params.imageTop + 'px';

    this.setValueFrameBorders('.crop-frame-border-width', 'width', 'frameOffsetWidth');
    this.setValueFrameBorders('.crop-frame-border-height', 'height', 'frameOffsetHeight');
  }

  private setValueFrameBorders(selector, attributeName, paramName) {
    const elements = document.querySelectorAll(selector);
    Array.from(elements).forEach(el =>  {
      el.style[attributeName] = this.params[paramName] + 'px';
    });
  }

  bindEvents() {
    this.mainController.canvasContainer.addEventListener('touchstart', this.touchStartEventCallback);
    this.mainController.canvasContainer.addEventListener('touchmove', this.touchMoveEventCallback);
    this.mainController.canvasContainer.addEventListener('touchend', this.touchEndEventCallback);
  }

  unBindEvents() {
    this.mainController.canvasContainer.removeEventListener('touchstart', this.touchStartEventCallback);
    this.mainController.canvasContainer.removeEventListener('touchmove', this.touchMoveEventCallback);
    this.mainController.canvasContainer.removeEventListener('touchend', this.touchEndEventCallback);
  }

  onTouchStart(event) {
    if (event.touches.length === 2) {

    } else {
      this.touchMode = this.TOUCH_MODE_SCROLL;

      this.params.lastTouchX = event.touches[0].clientX;
      this.params.lastTouchY = event.touches[0].clientY;
    }
  }

  onTouchMove(event) {
    event.preventDefault();

    if (this.touchMode === this.TOUCH_MODE_SCROLL) {
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;

      const left = this.params.imageLeft - (this.params.lastTouchX - x);
      const top = this.params.imageTop - (this.params.lastTouchY - y);

      this.params.imageLeft = left;
      this.params.imageTop = top;

      this.drawChanges();

      this.params.lastTouchX = x;
      this.params.lastTouchY = y;
    }
  }

  onTouchEnd() {
    this.touchMode = null;

    this.fixParams();
  }

  onPinchStart(event) {
    console.log('PinchStart->event', event);
    this.touchMode = this.TOUCH_MODE_ZOOM;

    const centerX = event.center.x;
    const centerY = event.center.y;

    this.params.pinchStartImageWidth = this.params.imageWidth;
    this.params.pinchStartImageHeight = this.params.imageHeight;
    this.params.pinchStartImageTop = this.params.imageTop;
    this.params.pinchStartImageLeft = this.params.imageLeft;
    this.params.pinchStartImageWidthRatio = (centerX - this.params.imageLeft) / this.params.imageWidth;
    this.params.pinchStartImageHeightRatio = (centerY - this.params.imageTop) / this.params.imageHeight;
  }

  onPinch(event) {
    console.log('Pinching->event', event);
    if (this.touchMode === this.TOUCH_MODE_ZOOM) {
      const scale = event.scale;
      const width = this.params.pinchStartImageWidth * scale;
      const height = this.params.pinchStartImageHeight  * scale;

      const left = this.params.pinchStartImageLeft - (width - this.params.pinchStartImageWidth) * this.params.pinchStartImageWidthRatio;
      const top = this.params.pinchStartImageTop - (height - this.params.pinchStartImageHeight) * this.params.pinchStartImageHeightRatio;

      this.params.imageTop = top;
      this.params.imageLeft = left;
      this.params.imageWidth = width;
      this.params.imageHeight = height;
    }
  }

  onPinchEnd(event) {
    console.log('PinchEnd->event', event);
    this.touchMode = null;

    this.fixParams();
  }

  drawChanges() {
    this.canvas.style.height = this.params.imageHeight + 'px';
    this.canvas.style.width = this.params.imageWidth + 'px';
    this.canvas.style.left = this.params.imageLeft + 'px';
    this.canvas.style.top = this.params.imageTop + 'px';
  }

  fixParams() {
    if (this.params.imageHeight < this.params.containerHeight) {
      this.params.imageHeight = this.params.containerHeight;
      this.params.imageWidth = this.params.imageHeight * this.canvas.width / this.canvas.height;
    }

    if (this.params.imageTop > this.params.frameOffsetHeight) {
      this.params.imageTop = this.params.frameOffsetHeight;
    }

    if (this.params.imageLeft > this.params.frameOffsetWidth) {
      this.params.imageLeft = this.params.frameOffsetWidth;
    }

    const minTop = -(this.params.imageHeight - this.params.frameHeight - this.params.frameOffsetHeight);

    if (this.params.imageTop < minTop) {
      this.params.imageTop = minTop;
    }

    const minLeft = -(this.params.imageWidth - this.params.frameWidth - this.params.frameOffsetWidth);

    if (this.params.imageLeft < minLeft) {
      this.params.imageLeft = minLeft;
    }

    this.drawChanges();
  }

  getCropOptions() {
    const canvasRatio = this.canvas.width / this.params.imageWidth;

    const x = -(this.params.imageLeft - this.params.frameOffsetWidth) * canvasRatio;
    const y = -(this.params.imageTop - this.params.frameOffsetHeight) * canvasRatio;
    const width = this.params.frameWidth * canvasRatio;
    const height = this.params.frameHeight * canvasRatio;

    return {x, y, width, height};
  }
}
