import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { Room } from '../../../../shared/models';

import { environment } from '../../../../../environments/environment';

import { RentalsService } from '../../services/rentals.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  room: Room;
  uploadBase = environment.uploadBase;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private rentalsService: RentalsService,
    private cursorWaitService: CursorWaitService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    try {
      this.cursorWaitService.enable();

      const response = await this.rentalsService.getRoom(id);
      this.room = response.room;
    } catch (e) {
      console.log('RoomDetailComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
    }

    this.galleryOptions = [
      {
        image: false,
        arrowPrevIcon: 'icon-left',
        arrowNextIcon: 'icon-right',
        closeIcon: 'icon-cancel',
        width: '100%',
        height: '100px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryImages = this.room.pictures.map(image => {
      return {
        small: this.uploadBase + image,
        medium: this.uploadBase + image,
        big: this.uploadBase + image
      };
    });
  }

  onBack() {
    this.location.back();
  }

}
