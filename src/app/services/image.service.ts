import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ImageService {

  constructor() { }

  public getImageUrl(imageId: number, size: ImageSize) {
    const sizeS = size.valueOf();
    return `${environment.api_url}image/${this.getValidatedInt(imageId)}/${sizeS}`;
  }

  private getValidatedInt(n) {
    return isNaN(parseInt(n, 10)) ? 0 : n;
  }
}

export enum ImageSize {
  small = 'small',
  medium = 'medium',
  big = 'big'
}
