import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-popular-users',
  templateUrl: './popular-users.component.html',
  styleUrls: ['./popular-users.component.scss']
})
export class PopularUsersComponent implements OnInit {
  public popularUsers: User[];
  public loading: boolean;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getMostPopular()
      .map((resp) => resp.json())
      .subscribe((resp) => {
        this.popularUsers = resp;
      },
      (e) => console.error(e),
      () => {
        this.loading = false;
      });
  }

  public viewUser(userId: number) {
    this.router.navigate(['/user'], {
      queryParams: {
        id: userId
      }
    });

    return false;
  }

}
