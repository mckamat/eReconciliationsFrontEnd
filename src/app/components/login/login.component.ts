import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', (Validators.required, Validators.email)],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe((res) => {
        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
        } else {
          this.router.navigate(['']);
        }
        localStorage.setItem('token', res.data.token);
      });
    } else {
      this.toastr.error('Eksik bilgileri doldurunuz.', 'Hata!');
    }
  }
}
