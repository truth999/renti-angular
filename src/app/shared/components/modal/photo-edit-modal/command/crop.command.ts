export class CropCommand {
  private mainController;
  private options;

  constructor(mainController, options) {
    this.mainController = mainController;
    this.options = options;
  }

  execute() {
    const canvas = this.mainController.canvas;

    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');

    maskCanvas.width = this.options.width;
    maskCanvas.height = this.options.height;

    maskCtx.drawImage(
      canvas,
      this.options.x,
      this.options.y,
      this.options.width,
      this.options.height,
      0,
      0,
      this.options.width,
      this.options.height
    );

    // apply the change
    canvas.width = maskCanvas.width;
    canvas.height = maskCanvas.height;
    canvas.getContext('2d').drawImage(maskCanvas, 0, 0, canvas.width, canvas.height);
  }
}
