import { Component, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ScrollService } from './services/scroll.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private scrollService: ScrollService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  @HostListener("window:scroll", ['$event'])
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

  public goToHome() {
    this.router.navigate(['/']);

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

}
