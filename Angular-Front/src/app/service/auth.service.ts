import { Injectable } from '@angular/core';
import { Headers , Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  user :any;

  constructor(private http : Http) { }
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/register",user,{headers:headers}).map(res=>res.json());

  }

  logginuser(userdetails: { email: any; password: any }) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/login",userdetails,{headers:headers}).map(res=>res.json());
  }
}
