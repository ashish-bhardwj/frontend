import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { LoginService } from '../sharedModule/service/login.service';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { routerTransition } from 'app/router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  form: FormGroup;   
  submitted=false;    
  message:string;            

  constructor(
    private fb: FormBuilder,         
    private loginService: LoginService ,
    private router: Router,
    private flashMessage:FlashMessagesService,
    private socialAuthService:AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({    
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
  }
   
    if (this.form.valid) {
      console.log(this.form.controls.email.value);
      if(this.form.controls.email.value=="admin" && this.form.controls.password.value=="admin"){

          this.loginService.getName();
         this.router.navigate(['/adminHome']);
      }
      else{
        this.loginService.login(this.form.value).subscribe((data)=>{
         
          if(data.success){
            let image;
            this.loginService.storeUserData(data.token, data.user,image);
           
              this.loginService.getName();
             this.router.navigate(['/book']);
  
        } else{
         
          this.router.navigate(['/login']);
        }
  
      } );   
      }

  }
}

googleLogin(data:string){
  if(data == "google"){
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
       console.log(userData.image);
       
         this.loginService.loginWithGoogle(userData.email , userData.name)
         .subscribe(
          data => {
            this.loginService.storeUserData(data.token, data.user,userData.image);
            this.loginService.getName();
           // localStorage.setItem('id_token', data.toString());
            this.router.navigate(['/book']);
          },
          error => { 
            this.message=error.error.message
          }
      );
            
      }
    );
  }
}    
}
