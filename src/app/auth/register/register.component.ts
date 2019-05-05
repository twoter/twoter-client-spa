import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') public registerForm: NgForm;

  public registerData: any = {};
  public showForm: boolean = true;
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
    if (this.registerData.password !== this.registerData.confirmPassword) {
      form.controls['confirmPassword'].setErrors({ 'match': true });

      return;
    }

    let data = { ...this.registerData };
    delete data.confirmPassword;

    this.loading = true;
    this.authService.create(data)
      .subscribe(() => {
        this.loading = false;
        this.showForm = false;

      }, (resp) => {
        this.loading = false;
        console.log('_err', resp)
        console.log(this.registerForm)
        this.registerForm.form.get('password').setErrors({ invalidCredentials: true });
      });
  }

  public login() {
    this.router.navigateByUrl('/login');

    return false;
  }

}
