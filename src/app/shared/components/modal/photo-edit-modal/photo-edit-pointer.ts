import { PhotoEditModalComponent } from './photo-edit-modal.component';

export class PhotoEditPointer {
  mainController: PhotoEditModalComponent;

  canvas: any;
  isMoving = false;
  movingStartTime: any;
  listeners = [];

  constructor(mainController) {
    this.mainController = mainController;
    this.canvas = mainController.canvas;

    this.bindEvents();
  }

  bindEvents() {
    this.canvas.addEventListener('mousedown', this.onHold.bind(this));
    this.canvas.addEventListener('mousemove', this.onMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onRelease.bind(this));
    // for mobile
    this.canvas.addEventListener('touchstart', this.onHold.bind(this));
    this.canvas.addEventListener('touchmove', this.onMove.bind(this));
    this.canvas.addEventListener('touchend', this.onRelease.bind(this));
  }

  onHold(event) {
    if (!event.touches || (event.touches && event.touches.length === 1)) {
      if (this.listeners.length > 0) {
        event.preventDefault();
        this.isMoving = true;
        this.movingStartTime = new Date();

        setTimeout(() => {
          this.mainController.forceHideEditor = true;
        });
      }
    }
  }

  onMove(event) {
    if (event.touches && event.touches.length !== 1) {
      this.isMoving = false;
    } else if (this.isMoving && this.listeners.length > 0) {
      event.preventDefault();
      const eventPoint = event.touches ? event.touches[0] : event;

      const canvasRatio = this.mainController.canvas.width / this.mainController.canvas.offsetWidth;
      const coords = this.canvas.getBoundingClientRect();
      this.listeners.forEach((listener) => {
        listener({
          x: (eventPoint.clientX - coords.left) * canvasRatio,
          y: (eventPoint.clientY - coords.top) * canvasRatio
        });
      });
    }
  }

  onRelease() {
    this.isMoving = false;
    this.movingStartTime = null;

    setTimeout(() => {
      this.mainController.forceHideEditor = false;
    });
  }

  onUpdate(listener) {
    this.listeners.push(listener);
  }

  offUpdate(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }
}
