import { Component, NgZone, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPCService } from '../../common/service/ipc.service';
import { MSG_TYPE } from "../../common/bean/msgType";
const dialog = nodeRequire('electron').remote.dialog;
const browserWindow = nodeRequire('electron').remote.getCurrentWindow();
@Component({
  selector: 'change-password',
  templateUrl: "./webApp/component/changePassword/changePassword.html",
})
export class ChangePassword implements OnInit {
  private display: string;
  private oldPsw: string;
  private password: string;
  private passwordAgain: string;
  private resolveFunc: Function;
  private rejectFunc: Function;
  private ipcService: IPCService;
  private role:string;
  private _ngZone:NgZone;
  private errorMsg:string;
  @Input()
  private userinformation: { isLogin: boolean, role: string};
  @Output()
  private closepwd = new EventEmitter<boolean>();
  constructor(ipcService: IPCService,_ngZone:NgZone) {
    this.display = "none";
    this.oldPsw = "";
    this.passwordAgain = "";
    this.password = "";
    this.ipcService = ipcService;
    this.errorMsg = "";
    this._ngZone=_ngZone;

  }
  ngOnInit() {
    this.ipcService.on("changePWresult", (data) => {//通讯连接
      this._ngZone.run(() => {
        if(data.data.code===1){
          this.showMessageBox(browserWindow, {
            type: "warning",
            message: "修改密码成功"
          });
          this.closepwd.emit(false);
        }else{
          this.showMessageBox(browserWindow, {
            type: "warning",
            message: "修改密码失败"
          });
        }

      })
    })
 
    // this.ipcService.on(MSG_TYPE.SEND_CMD_RESULT, (response) => {
    //   if (response.data.cmd !== CMD.LOGIN) {
    //     return;
    //   }
    //   if (response.data.resultCode === 1) {
    //     this.loginResult.emit({
    //       isLogin: true, role: "admin"
    //     });
    //     this.hidden();
    //     this.resolveFunc();
    //   }
    // });
  }
  reset(){
    console.log(this.oldPsw,this.password,this.passwordAgain);
    if( false === this.check() ){
    //this.role==="admin"?"1":"";
       return;
    }
    // if(this.role==="admin"){
    //   this.role="a";
    // }
    // if(this.role==="op"){
    //   this.role="1";
    // }
    //this.role==="admin"?"1":"";
    this.ipcService.send("changepwd",{"username":this.role,"oldPsw":this.oldPsw,"newPsw":this.password});
    this.hidden();
  }
  show() {
    this.display = "flex";
    return new Promise((resolve, reject) => {
      this.resolveFunc = resolve;
      this.rejectFunc = reject;
    });
  }
  hidden() {
    this.display = "none";
    this.closepwd.emit(true);

  }
  showMessageBox(browswindow:object,options: object) {
    return new Promise(function (resolve, reject) {
      dialog.showMessageBox(browswindow,options, (btnIndex: number) => {
        resolve(btnIndex);
      });
    });
  }
  check(){
    this.errorMsg = "";
    if(!this.role||!this.oldPsw){
      this.errorMsg = "请输入旧密码或者用户名";
      return false;
    }
    if(!this.password){
      this.errorMsg = "请输入新密码";
      return false;
    }
    if(!this.passwordAgain){
      this.errorMsg = "请再次输入新密码";
      return false;
    }
    if( this.password !== this.passwordAgain ){
      this.errorMsg = "两次输入的密码不一致";
      return false;
    }
    return true;
  }
}