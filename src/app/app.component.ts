import { Component, HostListener, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ScrollService } from './services/scroll.service';
import { AuthService } from './services/auth.service';
import { ImageService, ImageSize } from './services/image.service';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public loggedId: boolean;
  public user: User;

  @ViewChild('dropdownCont')
  public dropdownCont: ElementRef;

  @ViewChild('userLink')
  public userLink: ElementRef;

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private router: Router,
    private authService: AuthService,
    private scrollService: ScrollService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.authService.onUserLogged(user => {
      this.loggedId = true;
      this.user = user;
    });
    this.authService.onUserLoggedOut(() => {
      this.loggedId = false;
      this.user = null;
    });

    if (this.authService.isLoggedIn()) {
      this.getUser();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    const status = this.checkIfScrolledPastPoint();
    if (status) {
      this.scrollService.setScrolledPastPoint(true);
    }
  }

  private checkIfScrolledPastPoint() {
    const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = this.document.documentElement.scrollHeight;
    const response = windowScrollTop + windowHeight >= documentHeight - documentHeight / 15;

    return response;
  }

  private getUser() {
    const loggedUserId = this.getLoggedUserId();
    if (!this.loggedId) {
      return;
    }

    this.userService.getById(loggedUserId)
      .subscribe(resp => {
        const user = resp.json();

        this.user = user;
      });
  }

  private getLoggedUserId() {
    const loggedUserId = this.authService.getLoggedUserId();
    this.loggedId = 0 < loggedUserId;

    return loggedUserId;
  }

  public userLinkClick() {
    const rect = this.userLink.nativeElement.getBoundingClientRect();
    this.dropdownCont.nativeElement.classList.toggle('show');
    this.dropdownCont.nativeElement.style.left = `${rect.x}px`;

    return false;
  }

  public goToHome() {
    this.router.navigate(['/']);

    return false;
  }

  public goToProfile() {
    if (!this.user) {
      return false;
    }
    this.router.navigate(['/user'], {
      queryParams: {
        id: this.user.id
      }
    });

    return false;
  }

  public goToSettings() {
    this.router.navigate(['/edit']);

    return false;
  }

  public logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login'])
      });


    return false;
  }

  get imageUrl() {
    const imageId = (this.user && this.user.image) ? this.user.image.id : null;

    return this.imageService.getImageUrl(imageId, ImageSize.small);
  }

}
