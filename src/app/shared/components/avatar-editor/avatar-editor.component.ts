import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CropperSettings} from 'ng2-img-cropper';
import {ImageUploaderService} from 'app/core/services/image-uploader.service';

@Component({
  selector: 'app-avatar-editor',
  templateUrl: './avatar-editor.component.html'
})
export class AvatarEditorComponent implements OnInit {
  cropperSettings = new CropperSettings();
  dataImage: any;

  constructor(
    public dialogRef: MatDialogRef<AvatarEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadService: ImageUploaderService
  ) { }

  ngOnInit() {
    this.cropperSettings.width = 150;
    this.cropperSettings.height = 150;
    this.cropperSettings.croppedWidth = 150;
    this.cropperSettings.croppedHeight = 150;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 300;
    this.dataImage = {};
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
  async saveImage(): Promise<void> {
    if (this.dataImage.image) {
      const imageBlob = this.uploadService.dataURItoBlob(this.dataImage.image);
      const filePath = await this.uploadService.upload(imageBlob);
      this.dialogRef.close(filePath);
    }
  }
}
