import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public data: any = {};
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

        console.log(this.data)
      });
  }

  public edit(form: any) {

    return false;
  }

  public onUpload(imageId) {
    this.imageId = imageId;
  }

  get imageUrl() {
    return `${environment.api_url}image/${this.imageId}/medium`;
  }

}
