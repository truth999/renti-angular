import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { Room } from '../../../../../shared/models';

import { environment } from '../../../../../../environments/environment';

import { RentalsService } from '../../../services/rentals.service';
import { config } from '../../../../../../config';

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
  roomConfig = config.room;

  constructor(
    private route: ActivatedRoute,
    private rentalsService: RentalsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      const id = params.roomId;
      try {
        const response = await this.rentalsService.getRoom(id);
        this.room = response.room;

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
      } catch (e) {
        console.log('RoomDetailComponent->getRoom', e);
      }
    });
  }

}
