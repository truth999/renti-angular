import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { PhotoEditModalService } from '../../../services/modal/photo-edit-modal.service';

@Component({
  selector: 'app-photo-upload-modal',
  templateUrl: './photo-upload-modal.component.html',
  styleUrls: ['./photo-upload-modal.component.scss']
})
export class PhotoUploadModalComponent implements OnInit {
  @ViewChild('dropContainer') dropContainer: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private modal: NgbActiveModal,
    private photoEditModalService: PhotoEditModalService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  onDrop(event) {
    event.preventDefault();

    this.dropContainer.nativeElement.classList.remove('drag-over');

    const file = event.dataTransfer.files[0];
    this.readFile(file);
  }

  onDragOver(event) {
    event.preventDefault();

    this.dropContainer.nativeElement.classList.add('drag-over');
  }

  onDragLeave() {
    this.dropContainer.nativeElement.classList.remove('drag-over');
  }

  onFileChanged(event) {
    const file = event.target.files[0];

    this.readFile(file);
  }

  readFile(file) {
    if (file.type.match(/image.*/)) {
      const fileReader = new FileReader();

      fileReader.addEventListener('loadend', (event: any) => {
        this.modal.close();

        this.photoEditModalService.show(event.target.result);
      });

      fileReader.readAsDataURL(file);
    } else {
      console.log('Wrong file type');
    }
  }

  onClose() {
    this.modal.dismiss();
  }

}
