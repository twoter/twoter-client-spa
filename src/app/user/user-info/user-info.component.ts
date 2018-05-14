import { Component, Input, OnInit } from '@angular/core';
import { ImageService, ImageSize } from '../../services/image.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() public user;
  @Input() public profileView;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  get userProfilePicture() {
    let imageId;
    if (!this.user || !this.user.image) {
      imageId = 0;
    } else {
      imageId = this.user.image.id;
    }
    const imageUrl = this.imageService.getImageUrl(imageId, ImageSize.medium);

    return imageUrl;
  }

  get joinedAt() {
    return this.user ? moment(new Date(this.user.createdAt * 1000)).format('YYYY-MM-DD') : '';
  }

}
