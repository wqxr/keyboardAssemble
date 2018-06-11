import { Component,NgZone,Input,Output,EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { Headerinfo } from '../../common/bean/headerinfo';
import { machineConnect } from '../../common/bean/workmodel';
import { IPCService } from '../../common/service/ipc.service';
@Component({
  selector: 'pcbcount',
  templateUrl:"./webApp/component/pcbcount/pcbcount.html"
})
export class PcbCountComponent {
  private _ngZone: NgZone
  private title:String;
  private statusClass:string;
  private ipcService: IPCService;
  private isStart:boolean;//判断就绪状态下，料仓清零变量

  @Input()
  private status: string;
  @Input()
  private headerinfo: Headerinfo;
  @Output() changeStatus = new EventEmitter<string>();
  private machineConnectStyle = ["noconnect", "noconnect", "noconnect", "noconnect"];
  constructor( _ngZone: NgZone,ipcService: IPCService){
    this._ngZone = _ngZone;
    this.statusClass = "initstatus";
    this.ipcService = ipcService;
    this.isStart=false;
  }
  //改变状态显示
  changestatus(data: number) {
    switch (data) {
      case 0:
        this.status = "未初始化";  //红
        this.statusClass = "initstatus";
        this.isStart=false;
        break;
      case 1:
        this.status = "未连接";//红
        this.statusClass = "initstatus";
        this.isStart=false;
        break;
      case 2:
        this.status = "急停"; //红
        this.statusClass = "initstatus";
        this.isStart=false;
        break;
      case 3:
        this.status = "请复位"; //红
        this.statusClass = "initstatus";
        this.isStart=false;
        break;
      case 4:
        this.status = "复位中"; //绿
        this.isStart=true;
        this.statusClass = "workstatus";
        break;
      case 5:
        this.status = "停止中"; 
        this.statusClass = "workstatus";
        this.isStart=false;
        break;
      case 6:
        this.status = "就绪";  //蓝色
        this.statusClass = "finishstatus";
        if(this.isStart){
           this.headerinfo.Atraynumber=0;
           this.headerinfo.Btraynumber=0;
           this.headerinfo.BtrayStyle=false;
           this.headerinfo.AtrayStyle=false;
           this.ipcService.send("Warehousezero", {
            "code": "A"
          }); 
          this.ipcService.send("resetTrayData", {
            "code": "A"
        })
        setTimeout(()=>{
          this.ipcService.send("Warehousezero", {
            "code": "B"
          });
          this.ipcService.send("resetTrayData", {
            "code": "B"
        })
        },1000)
      }
      this.isStart=false;
    break;
      case 7:
        this.status = "暂停";   //黄
        this.statusClass = "stopstatus";
        this.isStart=false;
        break; 
      case 8:
        this.status = "工作中"; //绿
        this.statusClass = "workstatus";
        this.isStart=false;
        break;
    }
    this.changeStatus.emit(this.status);
  }
  //重置计数
  resetData(){
    if( this.status == "工作中" ) {
      return;
    }
    this.ipcService.send("resetTrayData",{code:"totalPCBnumber"})//清除成品数量
    // this.headerinfo.Acycletime = 0;
    // this.headerinfo.Atraynumber = 0;
    // this.headerinfo.Bcycletime = 0;
    // this.headerinfo.Btraynumber = 0;
    // this.headerinfo.CT = 0;
    this.headerinfo.finishKeyBoard = 0;
    //this.headerinfo.headdetail = [];
    this.headerinfo.totalPCBnumber = 0;
  }
  //四个通讯显示  小于等于0-未初始化 1-错误 2-ok，中间件只发后三个的通讯，UI通讯前端监听
  readMachineConnect(data: machineConnect) {
    if (data.CCDCnt <= 0 ) {
      this.machineConnectStyle[1] = "noinit";
    } else if( data.CCDCnt === 1){
      this.machineConnectStyle[1] = "err";
    } else {
      this.machineConnectStyle[1] = "";
    }
    if (data.pcbScannerCnt <= 0 ) {
      this.machineConnectStyle[2] = "noinit";
    } else if( data.pcbScannerCnt === 1){
      this.machineConnectStyle[2] = "err";
    } else {
      this.machineConnectStyle[2] = "";
    }
    if (data.trayScannerCnt <= 0 ) {
      this.machineConnectStyle[3] = "noinit";
    } else if( data.trayScannerCnt === 1){
      this.machineConnectStyle[3] = "err";
    } else {
      this.machineConnectStyle[3] = "";
    }
    if (data.SFCconnect <= 0 ) {
      this.machineConnectStyle[4] = "noinit";
    } else if( data.trayScannerCnt === 1){
      this.machineConnectStyle[4] = "err";
    } else {
      this.machineConnectStyle[4] = "";
    }
  }
  //与中间件连接上
  openUIConnect(){
    this.machineConnectStyle[0] = "";
  }
  //与中间件断开连接
  closeUIConnect(){
    for(let i=0;i<this.machineConnectStyle.length;i++){
      this.machineConnectStyle[i] = "noconnect";
    }
  }
}