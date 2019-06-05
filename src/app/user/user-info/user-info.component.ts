import { Component, Input, OnInit } from '@angular/core';
import { ImageService, ImageSize } from '../../services/image.service';
import { FollowService } from '../../services/follow.service';
import * as moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() public user;
  @Input() public profileView;
  private followLoad: boolean;
  private loggedUserId: number;
  private updateAddedSubscription;

  constructor(
    private followService: FollowService,
    private imageService: ImageService,
    private authService: AuthService,
    private updateService: UpdateService
  ) { }

  ngOnInit() {
    this.updateAddedSubscription = this.updateService.onEventAdded(() => {
      this.user.updates++;
    });

    this.followService.onFollow(followData => {
      if (this.user.id === followData.userId) {
        this.user.followed = followData.followed;
        if (followData.followed) {
          this.user.followers++;
        } else {
          this.user.followers--;
        }
      }
    });

    this.loggedUserId = this.authService.getLoggedUserId();
  }

  ngOnDestroy() {
    this.updateAddedSubscription.unsubscribe();
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

  get isLoggedUser() {
    return this.loggedUserId === this.user.id;
  }

  public follow() {
    this.followLoad = true;
    if (this.user.followed) {
      this.followService.unfollow(this.user.id)
        .subscribe(resp => {
          this.followLoad = false;
          this.user.followed = false;
        });
    } else {
      this.followService.follow(this.user.id)
        .subscribe(resp => {
          this.followLoad = false;
          this.user.followed = true;
        });
    }
  }

  get joinedAt() {
    return this.user ? moment(new Date(this.user.createdAt * 1000)).format('YYYY-MM-DD') : '';
  }

}
