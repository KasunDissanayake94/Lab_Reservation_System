import { Injectable } from '@angular/core';
import { Headers , Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {getToken} from "codelyzer/angular/styles/cssLexer";
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  user :any;
  authToken :any;
  type :any;

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
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile(){

    this.fetchToken();

    let headers = new Headers();
    console.log(this.authToken);
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get("http://localhost:3000/dashboard",{headers:headers}).map(res=>res.json());
  }

  fetchToken(){
    const token = localStorage.getItem('tokernId');
    this.authToken = token;
  }

  storeData(token,userData){
    localStorage.setItem("tokernId",token);
    localStorage.setItem("user",JSON.stringify(userData));
    localStorage.setItem("type",userData.type);
    localStorage.setItem("username",userData.username);
    localStorage.setItem("name",userData.name);
    localStorage.setItem("email",userData.email);
    this.authToken = token;
    this.user = userData;


  }
//Add a reservation
  addreservation(reserv: { date: string; start_time: string; lab: string; lecturer: string; subject: string; course: string }) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/sreservations",reserv,{headers:headers}).map(res=>res.json());
  }
//Search reservations for a perticular date and time
  serach_reservations(search : any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/sreservations",search,{headers:headers}).map(res=>res.json());
  }

  //Search all labs
  search_labs(search : any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/vreservations",search,{headers:headers}).map(res=>res.json());
  }
  add_request(request_labs : any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/sreservations",request_labs,{headers:headers}).map(res=>res.json());
  }
  search_all_requests(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/requests",{headers:headers}).map(res=>res.json());
  }
  solve_requests(solved){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/requests/solve",solved,{headers:headers}).map(res=>res.json());
  }

  search_all_users() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/manageusers",{headers:headers}).map(res=>res.json());
  }

  edituser(user: { name: string; username: string; email: string; password: string; confirmpassword: string }) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/manageusers/edit",user,{headers:headers}).map(res=>res.json());
  }

  deleteuser(user: { name: string; username: string; email: string; password: string; confirmpassword: string }) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/manageusers/delete",user,{headers:headers}).map(res=>res.json());
  }
  loggedIn(){
    return tokenNotExpired('tokernId');
  }
  gettype(){
    const typeofuser = localStorage.getItem('type');
    return typeofuser;
  }
  getusername(){
    const username = localStorage.getItem('username');
    return username;
  }
  getname(){
    const name = localStorage.getItem('name');
    return name;
  }
  getemail(){
    const email = localStorage.getItem('email');
    return email;
  }
  countdata(search:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/reports",search,{headers:headers}).map(res=>res.json());

  }

  count_monthly_labs(search_month:any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/reports/monthly_usage",search_month,{headers:headers}).map(res=>res.json());
  }
}
