import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { LanguageService } from 'src/app/services/language.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  dataRegister: FormGroup = new FormGroup({
    registerEmail: new FormControl('', [Validators.required, Validators.email]),
    registerPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    agree: new FormControl(false)
  })
  checkSubmit = false;
  signingUp = false;
  resStatus: number | undefined;
  constructor(
    private userService: UserService,
    private lang: LanguageService,
    private router: Router,
    private broadCaster: BroadcastService
  ) { }

  ngOnInit(): void {
  }

  onRegister(): void {
    let dataRegis = this.dataRegister.controls;
    if (this.signingUp) {
      return;
    }
    this.signingUp = true;
    this.checkSubmit = true;
    if (dataRegis['registerPassword'].errors
      && dataRegis['registerEmail'].errors
      && dataRegis['registerPassword'] !== dataRegis['rePassword']
    ) {
      return;
    }
    // this.apiUser.register({// đăng ký lên serve
    //   email: this.user.email,
    //   password: this.user.password,
    //   language: this.lang.lang
    // }).subscribe(res => {
    //   this.signingUp = false;
    //   this.resStatus = res.status;
    //   if (res.status === 1) {
    //     this.broadCaster.broadcast('user', { // gửi dữ liệu đến component header
    //       user: res,
    //       LogoutOrRegister: "Registered",
    //     })
    //     this.router.navigate([this.lang.lang]);
    //   }
    // });
  }
}
