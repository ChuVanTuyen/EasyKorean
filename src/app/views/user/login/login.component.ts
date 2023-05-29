import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { isPlatformBrowser } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  resStatus: number | undefined;
  dataLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    agree: new FormControl(false)
  })
  checkSubmit = false;
  isBrowser = false;
  checkEmailForm = true;
  loggingIn = false;
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private userService: UserService,
    private router: Router,
    private lang: LanguageService,
    private common: CommonService,
    private broadCaster: BroadcastService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  handleLogin(): void {
    if (this.loggingIn) {
      return;
    }
    this.loggingIn = true;
    this.checkSubmit = true;
    if (this.dataLogin.controls['email'].errors
      && this.dataLogin.controls['password'].errors
    ) {
      return;
    }
    this.userService.login({
      email: this.dataLogin.controls['email'].value.trim(),
      password: this.dataLogin.controls['password'].value,
      device_id: ''
    }).subscribe(res => {
      this.resStatus = res;
      this.loggingIn = false;
      if (res.status === 1) {
        this.broadCaster.broadcast('user', {
          user: res,
          logoutOrRegister: ""
        })
        this.router.navigate([this.lang.lang]);
      }
    });
  }

  onKeyUp():void{
    if(this.resStatus){
      this.resStatus = 1;
    }
  }
}
