import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { AppConfig } from 'src/app/app.config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public URLs:any = "";
  public submitted:boolean  = false;
  public logining:boolean = false;
  public loginForm  = new FormGroup({
    username:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  constructor(public commonService:CommonService,private appConfig:AppConfig) { }
  ngOnInit(): void {
    this.commonService.loginPage = true;
    this.URLs = this.appConfig.config;
  }

  get f() { return this.loginForm.controls; }

  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    // debugger;
    this.checkAuthUser()
  }

  public checkAuthUser()
  {
    this.logining = true;
    this.commonService.post(this.URLs.api.check_auth_user,this.loginForm.value).subscribe((response:any)=>{
      console.log(response)
      debugger;
      if(response.status_code == 200)
      {
        this.commonService.redirect("/bill/form")
      }
      else if(response.status_code == 401)
      {
        this.commonService.errorMessage("Invalid Credential");
        this.logining = false;
        this.submitted = false;
      }
      else
      {
        this.commonService.errorMessage("Somthing Went Wrong");
        this.logining = false;
        this.submitted = false;
      }
    },(error)=>{
      console.log(error);
      this.logining = false;
      this.submitted = false;
    })
  }

}
