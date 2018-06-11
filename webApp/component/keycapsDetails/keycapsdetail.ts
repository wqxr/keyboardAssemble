import { Component,NgZone,Input } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { productDetail } from '../../common/bean/productdetail';
import { IPCService } from '../../common/service/ipc.service';
const dialog = nodeRequire('electron').remote.dialog;
const browserWindow = nodeRequire('electron').remote.getCurrentWindow();
@Component({
  selector: 'keycapsdetail',
  templateUrl:"./webApp/component/keycapsDetails/keycapsdetail.html"
})
export class KeycapDetailComponent {
  private _ngZone: NgZone
  private title:String;
  private ipcService: IPCService;
  @Input()
  public assembling: productDetail;
  @Input()
  private logs: { time: number, loginfo: string,style:string}[];
  @Input()
  private status: string;
  private handerUploadConfig: {
    code: string,         //1 A工站 2 B工站
    TraySN: string,
    PCBSN: string,
    operatorType: string  // 1 pcb查询 2 Tray盘上传 3 PCB上传      
  }
  constructor( _ngZone: NgZone,ipcService: IPCService){
    this._ngZone = _ngZone;
    this.ipcService = ipcService;
    this.handerUploadConfig = {
      code: "",         // A工站  B工站
      TraySN: "",
      PCBSN: "",
      operatorType: ""  // 1 pcb查询 2 Tray盘上传 3 PCB上传  
    }
  }
   //pcb查询
   pcbSearch() {
    if (this.status == "工作中") {
      return;
    }
    if(this.assembling.APCBSN === ""&&this.assembling.BPCBSN===""){
      this.showMessageBox(browserWindow, {
        type: "warning",
        message: "SN不能为空",
      });
      return;
    }
    if (this.assembling.APCBSN !== undefined && 　this.assembling.APCBSN !== "") {
      this.handerUploadConfig.code = "A";
      this.handerUploadConfig.TraySN = this.assembling.ATraySN;
      this.handerUploadConfig.PCBSN = this.assembling.APCBSN;
      this.handerUploadConfig.operatorType = "pcb_check";
      this.ipcService.send("handerUpload", this.handerUploadConfig);
    }
    if (this.assembling.BPCBSN !== undefined && 　this.assembling.BPCBSN !== "") {
      this.handerUploadConfig.code = "B";
      this.handerUploadConfig.TraySN = this.assembling.BTraySN;
      this.handerUploadConfig.PCBSN = this.assembling.BPCBSN;
      this.handerUploadConfig.operatorType = "pcb_check";
      this.ipcService.send("handerUpload", this.handerUploadConfig);
    }
    
    
  }
  //tray上传
  trayUpload() {
    if (this.status == "工作中") {
      return;
    }
    if(this.assembling.ATraySN === ""&&this.assembling.BTraySN===""){
      this.showMessageBox(browserWindow, {
        type: "warning",
        message: "SN不能为空",
      });
      return;
    }
    if (this.assembling.ATraySN !== undefined && 　this.assembling.ATraySN !== ""
      && this.assembling.APCBSN !== undefined && this.assembling.APCBSN !== "") {
      this.handerUploadConfig.code = "A";
      this.handerUploadConfig.TraySN = this.assembling.ATraySN;
      this.handerUploadConfig.PCBSN = this.assembling.APCBSN;
      this.handerUploadConfig.operatorType = "tray_upload";
      this.ipcService.send("handerUpload", this.handerUploadConfig);
    }
    if (this.assembling.BTraySN !== undefined && 　this.assembling.BTraySN !== ""
      && this.assembling.BPCBSN !== undefined && this.assembling.BPCBSN !== "") {
      this.handerUploadConfig.code = "B";
      this.handerUploadConfig.TraySN = this.assembling.BTraySN;
      this.handerUploadConfig.PCBSN = this.assembling.BPCBSN;
      this.handerUploadConfig.operatorType = "tray_upload";
      this.ipcService.send("handerUpload", this.handerUploadConfig);
    }
  }
  showMessageBox(browswindow:object,options: object) {
    return new Promise(function (resolve, reject) {
      dialog.showMessageBox(browswindow,options, (btnIndex: number) => {
        resolve(btnIndex);
      });
    });
  }
  //PCB上传
  pcbUpload() {
    if (this.status == "工作中") {
      return;
    }
    if(this.assembling.APCBSN === ""&&this.assembling.BPCBSN===""){
      this.showMessageBox(browserWindow, {
        type: "warning",
        message: "SN不能为空",
      });
      return;
    }
    if (this.assembling.APCBSN !== undefined && 　this.assembling.APCBSN !== "") {
      this.handerUploadConfig.code = "A";
      this.handerUploadConfig.TraySN = this.assembling.ATraySN;
      this.handerUploadConfig.PCBSN = this.assembling.APCBSN;
      this.handerUploadConfig.operatorType = "pcb_upload";
      this.ipcService.send("handerUpload", this.handerUploadConfig);
    }
    if (this.assembling.BPCBSN !== undefined && 　this.assembling.BPCBSN !== "") {
      this.handerUploadConfig.code = "B";
      this.handerUploadConfig.TraySN = this.assembling.BTraySN;
      this.handerUploadConfig.PCBSN = this.assembling.BPCBSN;
      this.handerUploadConfig.operatorType ="pcb_upload";
      this.ipcService.send("handerUpload", this.handerUploadConfig);
    }
  }
}