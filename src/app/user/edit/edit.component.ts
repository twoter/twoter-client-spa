import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public data: User;
  public imageId;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getById(this.authService.getLoggedUserId())
      .subscribe(resp => {
        this.data = resp.json();
        this.imageId = this.data.image ? this.data.image.id : null;
      });
  }

  public edit(form: any) {
    this.userService.update(form.value)
      .subscribe(resp => {
        console.log('updated');
      });

    return false;
  }

  public onUpload(imageId) {
    this.imageId = imageId;
  }

  get imageUrl() {
    return `${environment.api_url}image/${this.imageId}/medium`;
  }

}
