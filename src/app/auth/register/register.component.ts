import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('loginForm') public loginForm: NgForm;

  public loginData: any = {};

  public loading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public signup(form) {
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
      .catch((resp) => {
        this.loading = false;
        console.log('_err', resp)
        console.log(this.loginForm)
        this.loginForm.form.get('password').setErrors({ invalidCredentials: true });
      });
  }

  public login() {
    this.router.navigateByUrl('/login');

    return false;
  }

}
