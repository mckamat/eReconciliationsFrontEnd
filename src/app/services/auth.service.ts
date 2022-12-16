import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string;

  constructor(private httpClient: HttpClient) {}

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
