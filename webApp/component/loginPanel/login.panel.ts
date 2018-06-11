import { Component, NgZone, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IPCService } from '../../common/service/ipc.service';
import { MSG_TYPE } from "../../common/bean/msgType";

@Component({
  selector: 'login-panel',
  templateUrl: "./webApp/component/loginPanel/loginPanel.html",
})
export class LoginlPanel implements OnInit {
  private display: string;
  private username: string;
  private password: string;
  private role: any;
  private oprole:string;
  private errorMsg: string;
  private resolveFunc: Function;
  private rejectFunc: Function;
  private ipcService: IPCService;
  private adminrole:string;
  //private oprole:string;
  private _ngZone: NgZone;

  @Input()
  private loginStatus: { isLogin: boolean, role: string };
  @Input()
  private onlogin: number;
  @Output()
  private loginResult = new EventEmitter<{ isLogin: boolean, role: string }>();
  constructor(ipcService: IPCService,_ngZone: NgZone) {
    this._ngZone=_ngZone;
    this.display = "block";
    this.username = "";
    this.password = "";
    this.ipcService = ipcService;
    //this.role ="";
    this.adminrole="";
    this.oprole="";
    
  }
  ngOnInit() {
    this.ipcService.on("loginresult", (response) => {
      this._ngZone.run(() => {
        if (response.data.code !== 1) {
          
          this.errorMsg = "您输入的密码错误";
          return;
        }
        if (response.data.code === 1) {
          this.loginResult.emit({
            isLogin: true, role: this.oprole,
          });
          this.hiddenLoginPanel();
        }
      })
      //console.info("用户：" + response.data.resultCode);
    
    });
  }
  userlogin() {
    if (false === this.check()) {
      return;
    }
    if(!isNaN(this.role)){//shuzi
        this.oprole="op"; 
    }else{
       this.oprole="admin";
    }
  //  if(this.role==="admin"){
  //    this.adminrole="a";
  //  }
  //  if(this.role==="op"){
  //    this.adminrole="1";
  //  }
    this.ipcService.send("login", { "username":this.role, "psw": this.password });
  //  this.display = "none";
  //   this.loginResult.emit({
  //     isLogin: true, role: this.role,
  //   });

  }
  loginin(event: any) {
    if (event.keyCode === 13) {
      this.userlogin();
    }
  }
  // showLoginPanel() {
  //   this.display = "flex";
  //   this.password="";
  //   return new Promise((resolve, reject) => {
  //     this.resolveFunc = resolve;
  //     this.rejectFunc = reject;
  //   });
  // }
  hiddenLoginPanel() {
    this.display = "none";
  }
  showLoginPanel() {
    this.display = "block";
  }
  check() {
    this.errorMsg = "";
    // if(!this.role){
    //   this.errorMsg="请输入用户名"
    // }if(!this.role){
    //   this.errorMsg="请输入用户名"
    // }
    if (!this.password||!this.role) {
      this.errorMsg = "请输入密码或者用户名";
      return false;
    }
    return true;
  }
}