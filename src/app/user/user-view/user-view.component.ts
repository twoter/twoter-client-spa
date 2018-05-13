import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  public userLoading: boolean;
  public userLoaded: boolean;
  private userId: number;

  constructor(
    private userService: UserService,
    private updateService: UpdateService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap
      .map((params: Params) => params.params)
      .subscribe((params) => {
        this.userId = params.id;
        if (this.isValidUser) {
          this.loadUser();
        }
      });
  }

  public updatePosted(value) {
    this.updateService.addEvent(value);
  }

  private loadUser() {
    this.userLoading = true;
    this.userService.getById(this.userId)
      .subscribe(resp => {
        const jsonResp = resp.json();

        this.userLoading = false;
        this.userLoaded = true;
      });
  }

  get isValidUser() {
    return Boolean(this.userId);
  }

}
