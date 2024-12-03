import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private authService : AuthService,
    private fb : FormBuilder,
    private router : Router
  ){
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['',  Validators.required]
    })
  }

  onSubmit():  void{
    if(this.loginForm.invalid){
      return;
    }

    const {Username, Password} = this.loginForm.value;

    this.authService.login({Username: Username, Password: Password}).subscribe({
      next: (response)=>{
          if(this.authService.isAuthenticated()){
            this.router.navigateByUrl('dashboard');
            alert(response.Message);
          }else{
            this.errorMessage = 'Invalid Username or Password';
          }
      },
      error: (error) => {
        this.errorMessage = 'Login Failed due to the server error';
        console.error('Login error', error);
        
      }
    });
  }
  

}




































































// import { HttpClient } from '@angular/common/http';
// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// import * as CryptoJS from 'crypto-js';
// import { Constant } from '../../conststnt';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

//   logiObj: any = {
//     "EmailId": "",
//     "Password": ""
//   };

//   http= inject(HttpClient);
//   router = inject(Router);

//   encriptData(data: any) {
//     return CryptoJS.AES.encrypt(data,Constant.EN_KEY).toString();
//   }

//   onLogin() {
//     debugger;
//     this.http.post("https://freeapi.miniprojectideas.com/api/User/Login",this.logiObj).subscribe((res:any)=>{
//       if(res.result) {
//         alert("Login Success");
//         const enrUserName =  this.encriptData(this.logiObj.EmailId);
//         localStorage.setItem("uName",enrUserName);
//         localStorage.setItem('angular18Token',res.data.token);
//         this.router.navigateByUrl('dashboard')
//       } else {
//         alert(res.message)
//       }
//     })
//   }
// }
