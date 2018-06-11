import { Component, NgZone, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { IPCService } from '../../common/service/ipc.service';
import { MSG_TYPE } from "../../common/bean/msgType";
import { workModel } from '../../common/bean/workmodel';
const dialog = nodeRequire('electron').remote.dialog;
const browserWindow = nodeRequire('electron').remote.getCurrentWindow();
@Component({
  selector: 'io-panel',
  templateUrl: "./webApp/component/aside/aside.html"
})
export class AsideComponent {

  private _ngZone: NgZone
  private title: String;
  private ipcService: IPCService;
  @Input()
  private configs:any;
  @Output() configisShow = new EventEmitter<boolean>();
  @Output() configinfo = new EventEmitter<any[]>();
  private iscongigshow: boolean = true;
  private SAVE_PATH = "D:/ShopFlow/assemble.ini";
  private startclass: boolean = false;
  private workmodel: workModel;
  private config: {
    IP: string;
    MAC_ADDR: string;
    MachineNo: string;
    StationNo: string;
    LineNo: string;
    StationVer:string;
    AOutTrayCount:number;
    BOutTrayCount:number;
    machineType:string;
    CTtime:string;
  }
  constructor(_ngZone: NgZone, ipcService: IPCService, ) {
    this._ngZone = _ngZone;
    this.title = 'IAStudio';
    console.log(_.isString(this.title));
    this.config = {
      IP: "",
      MAC_ADDR: "",
      MachineNo: "",
      StationNo: "",
      LineNo: "",
      StationVer:"",
      AOutTrayCount: 30,//A出料个数,
      BOutTrayCount:30,
      machineType:"",
      CTtime:"",
    }
    this.ipcService = ipcService;
   // this.config = new Config();
  }
  ngOnInit() {
     this.configinfo.emit([this.config.IP,this.config.MAC_ADDR,this.config.StationNo,
      this.config.MachineNo,this.config.LineNo,this.config.StationVer,this.config.AOutTrayCount,this.config.BOutTrayCount,this.config.machineType,this.config.CTtime]);
    //this.ipcService.send("machineConfig",this.config);
    // this.ipcService.on("isOk", (data) => {//上料信号
    //   this._ngZone.run(() => {
    //     if(data.data.code===1){
    //       this.showMessageBox(browserWindow, {
    //         type: "warning",
    //         message: "保存成功",
    //       });
    //       return;
    //     }
       
    //   })
    // })

  }
  saveConfig() {
    if(this.config.AOutTrayCount>30||this.config.BOutTrayCount>30){
      this.showMessageBox(browserWindow, {
        type: "warning",
        message: "预计出料个数不能超过30",
      });
      return;
    }
    this.ipcService.send("machineConfig", this.config);
    this.configinfo.emit([this.config.IP,this.config.MAC_ADDR,this.config.StationNo,
    this.config.MachineNo,this.config.LineNo,this.config.StationVer,this.config.AOutTrayCount,this.config.BOutTrayCount,this.config.machineType,this.config.CTtime]);
  }
  readmachineconfig(data: any) {
    this.config = data;
  }
  onclose() {
    this.showMessageBox(browserWindow,{
      type: "warning",
      message: "是否关闭窗口",
      buttons: ["是", "否"],
      defaultId: 0,
      cancelId:-1,
    }).then((btnIndex: number) => {
      if(btnIndex===0){
        this.configisShow.emit(true);
        this.iscongigshow = !this.iscongigshow;
      }
    })
    
  }
  cancel(){
    this.configisShow.emit(this.iscongigshow);
    this.iscongigshow = !this.iscongigshow;
  }
  showMessageBox(browswindow:object,options: object) {
    return new Promise(function (resolve, reject) {
      dialog.showMessageBox(browswindow,options, (btnIndex: number) => {
        resolve(btnIndex);
      });
    });
  }
  
}