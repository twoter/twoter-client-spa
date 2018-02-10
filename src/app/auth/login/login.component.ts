import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData: any = {};

  public loading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public login(form) {
    if (!form.valid) {
      for (const i in form.controls) {
        form.controls[i].markAsTouched();
      }

      return;
    }

    this.loading = true;
    this.authService.login(this.loginData)
      .then(() => {
        this.loading = false;
        this.router.navigateByUrl('/home');
      })
      .catch(() => {
        this.loading = false;
      });
  }

}
