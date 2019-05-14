import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type resolutionTypes = 'sm' | 'md' | 'lg' | 'xl';

export const resolutions = {
  576: 'sm',
  768: 'md',
  992: 'lg',
  1200: 'xl'
};

export const resolutionsMap = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

export class ImageUrls {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

@Injectable()
export class ResponsiveService {
  public isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor() {
    this.isMobile.next(!this.isResolutionEnough('lg'));

    window.addEventListener('resize', () => {
      this.isMobile.next(!this.isResolutionEnough('lg'));
    });
  }

  getImageByResolution(urls: ImageUrls) {
    const availableOptions = Object.keys(urls);
    if (availableOptions.length === 0) {
      throw new Error('There are no specified sources to load this image.');
    }
    const width = this.getScreenWidth();
    let resolutionType = availableOptions[0];
    for (const key of Object.keys(resolutions)) {
      if (width < parseInt(key, 10)) {
        break;
      }
      if (availableOptions.includes(resolutions[key])) {
        resolutionType = resolutions[key];
      }
    }
    return urls[resolutionType];
  }

  isResolutionEnough(requiredResolutionType: resolutionTypes) {
    if (resolutionsMap[requiredResolutionType] > this.getScreenWidth()) {
      return false;
    }

    return true;
  }

  getScreenWidth() {
    try {
      return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  getScreenHeight() {
    try {
      return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    } catch (err) {
      console.error(err);
      return 0;
    }
  }

  getScreenSize() {
    return {x: this.getScreenWidth(), y: this.getScreenHeight()};
  }
}
