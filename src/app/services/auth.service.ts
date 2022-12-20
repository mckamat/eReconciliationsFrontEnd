import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/dtos/registerDto';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string;

  constructor(private httpClient: HttpClient) {}

  register(registerDto :RegisterDto){
    var api = 'https://localhost:7241/api/auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,registerDto);
  }

  login(loginModel: LoginModel) {
    var api = 'https://localhost:7241/api/auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      api,
      loginModel
    );
  }
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
