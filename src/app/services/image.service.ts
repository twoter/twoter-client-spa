import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ImageService {

  constructor() { }

  public getImageUrl(imageId: number, size: ImageSize) {
    const sizeS = size.valueOf();
    return `${environment.api_url}image/${imageId}/${sizeS}`;
  }
}

export enum ImageSize {
  small = 'small',
  medium = 'medium',
  big = 'big'
}
