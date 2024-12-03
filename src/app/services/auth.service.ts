import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenKey ='authToken';
  private isLoggedInStatus = false;

  private apiUrl = 'http://88.99.160.175:83/root-user/login';
  constructor() {
    this.isLoggedInStatus = !!localStorage.getItem(this.tokenKey)
   }

   login(credentials: {Username: string, Password: string}): Observable<any>{
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((res:any)=>{
        if(res.Status){
          localStorage.setItem(this.tokenKey, res.Data.Token.Access_token);
          this.isLoggedInStatus = true;
        }else{
          alert("Invalid Credentials");
        }
      })
    );
   }

   logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInStatus= false;
    this.router.navigateByUrl('login');
   }

   getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
   }

   isAuthenticated(): boolean {
    return this.isLoggedInStatus || !!this.getToken();
   }
}
