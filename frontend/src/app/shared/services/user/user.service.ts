import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { User } from '../../models/user/user';

import { IUserLogin } from '../../interfaces/iuserlogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../../constants/urls';
import { ToastrService } from 'ngx-toastr/public_api';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userSubject = new BehaviorSubject<User>(new User());

  public userObservable:Observable<User>

  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
          this.toastrService.success(
          `Welcome to Foodmine ${user.name}!`,
          'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }
}
