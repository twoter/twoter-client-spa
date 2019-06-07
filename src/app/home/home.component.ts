import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpdateService } from '../services/update.service';
import { ScrollService } from '../services/scroll.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ImageService, ImageSize } from '../services/image.service';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: User;

  constructor(
    private updateService: UpdateService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  private loadUser() {
    this.userService.getById(Number.parseInt(this.authService.getUserFromStorage()))
      .subscribe(resp => {
        this.user = resp.json();
      });
  }

  public updatePosted(value) {
    this.updateService.addEvent(value);
  }

}
