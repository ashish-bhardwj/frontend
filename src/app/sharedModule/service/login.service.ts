import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {tokenNotExpired} from 'angular2-jwt';
import { IUser } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly baseURL='http://localhost:3000/users';
  authToken: any;
  user: any;
  firstName:String;
  count:number;
  constructor(private http: HttpClient) {
    this.getName();
   }

  login(user:IUser) {
    return this.http.post(this.baseURL+'/authenticate', user).pipe(map((res:any)=> res));
  }

  getProfile(){    
   // this.loadToken();
   // let headers: HttpHeaders = new HttpHeaders();
   // headers = headers.append('Content-Type', 'application/json');
   // headers = headers.append( 'Authorization',this.authToken);
    //console.log(headers);
    //return this.http.get(this.baseURL+'/profile', {headers:headers}).pipe(map((res:any)=> res));
    let user=JSON.parse(localStorage.getItem('user'));
    return user;
  }

  loadToken(){
    const token=localStorage.getItem('id_token');
    this.authToken=token;
    console.log(this.authToken);
  }

  storeUserData(token, user,image){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('image', image);
    this.authToken = token;
    this.user = user;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
    }

  logout(){
    this.authToken = null;
    this.user = null;
    this.firstName="";
    localStorage.clear();
    this.getName();
  }

  getName(){
    let a = JSON.parse(localStorage.getItem('user')) || [];
    this.firstName=a.firstName;
  }

  loginWithGoogle(email:string,name:string){
  let fullName=name.split(" ");
    const user:IUser={
      email:email,
      password : name,
      firstName:fullName[0],
      lastName:fullName[1]
    }
    console.log(user);
    return this.http.post(this.baseURL+'/google', user).pipe(map((res:any)=> res));
}
}
