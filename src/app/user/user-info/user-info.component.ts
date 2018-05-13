import { Component, Input, OnInit } from '@angular/core';
import { ImageService, ImageSize } from '../../services/image.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() public user;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  get userProfilePicture() {
    if (!this.user || !this.user.image) {
      return null;
    }
    const imageUrl = this.imageService.getImageUrl(this.user.image.id, ImageSize.medium);

    return imageUrl;
  }

}
