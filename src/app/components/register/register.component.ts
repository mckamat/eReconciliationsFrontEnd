import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterDto } from 'src/app/models/dtos/registerDto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isRegisterBtn: boolean = true;
  registerDto: RegisterDto = {
    userForRegister: {
      email: '',
      name: '',
      password: '',
    },
    company: {
      creaDate: this.datePipe.transform(Date(), 'yyyy-MM-dd'),
      address: '',
      id: 0,
      identityNumber: '',
      isActive: true,
      name: '',
      taxDepartment: '',
      taxIdNumber: '',
    },
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', (Validators.required, Validators.email)],
      password: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      taxDepartment: [''],
      taxIdNumber: [''],
      identityNumber: [''],
      creaDate: [Date.now()],
      isActive: [true],
    });
  }

  register() {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.isRegisterBtn = false;
      let registerModel = Object.assign({}, this.registerForm.value);
      console.log(registerModel);

      this.registerDto.userForRegister.name = registerModel.name;
      this.registerDto.userForRegister.email = registerModel.email;
      this.registerDto.userForRegister.password = registerModel.password;

      this.registerDto.company.address = registerModel.address;
      this.registerDto.company.taxDepartment = registerModel.taxDepartment;
      this.registerDto.company.taxIdNumber = registerModel.taxIdNumber;
      this.registerDto.company.identityNumber = registerModel.identityNumber;
      this.registerDto.company.name = registerModel.companyName;

      console.log(this.registerDto);
      this.authService.register(this.registerDto).subscribe(
        (res) => {
          if (this.authService.redirectUrl) {
            this.router.navigate([this.authService.redirectUrl]);
          } else {
            this.router.navigate(['']);
          }
          localStorage.setItem('token', res.data.token);
          this.toastr.success(res.message, 'Başarılı!');
        },
        (err) => {
          this.isRegisterBtn = true;
          this.toastr.error(err.error, 'Hata!');
        }
      );
    } else {
      this.toastr.error('Eksik bilgileri doldurunuz.', 'Hata!');
    }
  }
}
