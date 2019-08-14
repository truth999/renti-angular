import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ToastrService } from 'ngx-toastr';

import { Apartment } from '../../../../shared/models';

import { environment } from '../../../../../environments/environment';

import { RentalsService } from '../../services/rentals.service';
import { StorageService } from '../../../../core/services/storage.service';
import { AuthService } from '../../../../core/services/auth.service';
import { config } from '../../../../../config';
import { Location } from '@angular/common';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {
  apartment: Apartment;
  favorite: boolean;
  toggled = false;
  rate: number;
  feedbackNumber: number;
  apartmentConfig = config.apartment;

  uploadBase = environment.uploadBase;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rentalsService: RentalsService,
    private storageService: StorageService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private location: Location
  ) { }

  ngOnInit() {
    this.setApartmentChecked();
    this.getApartment();
    this.getFavorite();
  }

  async setApartmentChecked() {
    const id = this.route.snapshot.paramMap.get('id');
    try {
      await this.rentalsService.setApartmentChecked(id);
    } catch (e) {
      console.log('ApartmentDetailComponent->setApartmentChecked', e);
    }
  }

  async getApartment() {
    const id = this.route.snapshot.paramMap.get('id');

    try {
      const response = await this.rentalsService.getApartment(id);
      const apartment = response.apartment;
      if (apartment.landlord.feedback !== 0) {
        const totalRate = apartment.landlord.feedback.reduce((total, currentValue) => {
          return total + currentValue.feedbackStar.overall;
        }, 0);
        this.rate = this.rate = parseInt((totalRate / apartment.landlord.feedback.length).toFixed(0), 10) - 1;
        this.feedbackNumber = apartment.landlord.feedback.length;
      }
      this.apartment = apartment;

      this.galleryOptions = [
        {
          arrowPrevIcon: 'icon-left',
          arrowNextIcon: 'icon-right',
          closeIcon: 'icon-cancel',
          width: '100%',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
        },
        {
          breakpoint: 576,
          imageBullets: true,
          thumbnails: false,
          imageSwipe: true,
          previewSwipe: true
        }
      ];

      this.galleryImages = response.apartment.pictures.map(image => {
        return {
          small: this.uploadBase + image,
          medium: this.uploadBase + image,
          big: this.uploadBase + image
        };
      });
    } catch (e) {
      console.log('ApartmentDetailComponent->getApartment', e);
    }
  }

  async getFavorite() {
    try {
      const apartmentId = this.route.snapshot.paramMap.get('id');
      const tenantId = this.storageService.get('tenantId');
      const response = await this.authService.getTenant(tenantId);
      const favoriteIds = response.tenant.favorites.map(favorite => {
        return favorite._id;
      });
      this.favorite = favoriteIds.includes(apartmentId);
    } catch (e) {
      console.log('ApartmentDetailComponent->getFavorite', e);
    }
  }

  onSendOffer() {
    this.router.navigate(['/app/offers/create', this.apartment._id]);
  }

  async onSaveToFavorites() {
    try {
      const tenantId = this.storageService.get('tenantId');
      await this.rentalsService.setFavorite(tenantId, { apartmentId: this.apartment._id });
      this.getFavorite();
      this.toastrService.success('The apartment has saved to favorites successfully.', 'Success!');
    } catch (e) {
      this.toastrService.error('Something went wrong', 'Error');
      console.log('ApartmentDetailComponent->onSaveToFavorites', e);
    }
  }

  async onRemoveToFavorites() {
    try {
      const tenantId = this.storageService.get('tenantId');
      await this.rentalsService.removeFavorite(tenantId, { apartmentId: this.apartment._id });
      this.getFavorite();
      this.toastrService.success('The apartment has removed to favorites successfully.', 'Success!');
    } catch (e) {
      this.toastrService.error('Something went wrong', 'Error');
      console.log('ApartmentDetailComponent->onRemoveToFavorites', e);
    }
  }

  onBack() {
    // this.router.navigate(['/app/rentals/search']);
    this.location.back();
  }

}
