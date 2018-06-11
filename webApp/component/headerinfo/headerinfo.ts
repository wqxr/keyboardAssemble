import { Component, NgZone, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { Headerinfo } from '../../common/bean/headerinfo';
import { IPCService } from '../../common/service/ipc.service';
import { LogPanel } from "../logPanel/logPanel";
const dialog = nodeRequire('electron').remote.dialog;
const browserWindow = nodeRequire('electron').remote.getCurrentWindow();
@Component({
  selector: 'headinfo',
  templateUrl: "./webApp/component/headerinfo/headerinfo.html"
})
export class HeaderinfoComponent {
  private _ngZone: NgZone
  private title: String;
  private loginstatus:string;
  private isShowLoginOut:boolean;
  private repairstartTime:number;
  private repairendTime:number;
  private repairtime:string;
  private protecttime:string;
  private repairtotaltime:number;
  private repairAlltime:number;
  private matainAlltime:number;
  private mataintotaltime:number;
  private matainstarttime:number;//保养开始时间
  private matainendtime:number;//保养结束时间
  private isrepaire:boolean=false;
  private ismatain:boolean=false;

  @Input()
  private status: string;
  private ipcService: IPCService;
  private isShow: boolean = false;
  private iscongigshow: boolean = false;
  private configshowtext = "配置面板";
  private ioisshowText: string = "IO面板";

  private startclass: boolean = false;
  private emergencyclass: boolean = false;
  private resetclass: boolean = false;
  private suspendclass: boolean = false;
  private stopClass: boolean = false;
  private clickclass:boolean[];
  private isUseShow: boolean = false;
  private pointShow: boolean = false;
  private styleclass: boolean[];
  private opreatelist: number[];
  private fullScreenFlag = false;//全屏
  private machineTime:{
    "product":string,
    "cm":string,
    "cm_line":string,
    "machine_number":string,
    "manufacturer":string,
    "time_local":string,
    "total_time":number,
    "scheduled_time":number,
    "unscheduled_downtime":number,
    "scheduled_downtime":number,
    "engineering_time":number,
    "idle_time":number,
    "production_time":number,
    "unit_count":number,
    "pass_count":number,
    "pass_cycle_time":string,
    "fail_cycle_time":number,
    "planned_cycle_time":string,
    "Date":string,
    "Hour":string,
    
   
  }
 
  @Input()
  private headerinfo: Headerinfo;
  @Input()
  private configinfos: { 
    IP: string,
    MAC_ADDR: string,
    StationNo:string,
    MachineNo:string,
    LineNo: string,
    StationVer:string,
    OutTrayCount: string,
    macineType:string,
    CTtime:string,
  };
  @Input()
  private logs: { time: number, loginfo: string,style:string}[];
  @Input()
  private warn:{ time: number,loginfo: string,style:string};
  //用户信息
  @Input()
  private userinformation: { isLogin: boolean, role: string };
  //io面板
  @Output() ioisShow = new EventEmitter<boolean>();
  //配置
  @Output() configisShow = new EventEmitter<boolean>();
  @Output() isUseShowfun = new EventEmitter<boolean>();
  //点位
  @Output() ispointPanelShow = new EventEmitter<boolean>();
  //登录
  @Output() isloginPanelShow = new EventEmitter<boolean>();
  //修改密码
  @Output() ischangepwdPanelShow = new EventEmitter<boolean>();
  @Output() outlogin = new EventEmitter<boolean>();
  constructor(_ngZone: NgZone, ipcService: IPCService) {
    this._ngZone = _ngZone;
    this.ipcService = ipcService;
    this.styleclass = [false, false, false];
    this.opreatelist = [];
    this.isShowLoginOut = true;
    this.loginstatus="退出登录";
    this.repairtime="维修";
    this.protecttime="保养";
    this.repairtotaltime=0;
    this.mataintotaltime=0;
    this.repairAlltime=0;
    this.matainAlltime=0;
    this.repairstartTime=0;
    this.matainstarttime=0;
    this.matainendtime=0;
    this.machineTime={
      "product":"",
      "cm":"WISTRON",
      "cm_line":"",
      "machine_number":"",
      "manufacturer":"FP",
      "time_local":"",
      "total_time":3600,
      "scheduled_time":3600,
      "unscheduled_downtime":0,
      "scheduled_downtime":0,
      "engineering_time":0,
      "idle_time":0,
      "production_time":0,
      "unit_count":0,
      "pass_count":0,
      "pass_cycle_time":"",
      "fail_cycle_time":0,
      "planned_cycle_time":"",
      "Date":"",
      "Hour":"",
    }
    this.clickclass=[false,false,false,false,false,false,false,false,false,false];
    // setInterval(()=>{
    //   this.getProductdata();
    // },1000);
    this.ipcService.on("machineTime",(response)=>{
      this._ngZone.run(() => {
       let now=new Date();
        if(this.isrepaire===true){
          this.repairAlltime= this.repairtotaltime+(Date.now()-this.repairstartTime)/1000;
          
        }else if(this.ismatain===true){
          this.matainAlltime=this.mataintotaltime+(Date.now()-this.matainstarttime)/1000;
        }
        // this.repairtotaltime= this.repairtotaltime+(Date.now()-this.repairstartTime)/1000;
        // this.mataintotaltime=this.mataintotaltime+(Date.now()-this.matainstarttime)/1000;
        this.machineTime=response.data;
        this.machineTime.cm="WISTRON";
        this.machineTime.manufacturer="FP";
        this.machineTime.product=this.configinfos.macineType;//机种
        this.machineTime.cm_line=this.configinfos.LineNo//线别
        this.machineTime.machine_number="WIZS_"+this.configinfos.LineNo+"_01_HA1";
        this.machineTime.planned_cycle_time=this.configinfos.CTtime;
        this.machineTime.scheduled_downtime=this.repairAlltime;
        this.machineTime.engineering_time=this.matainAlltime;
        this.machineTime.total_time=response.data.total_time;
        this.machineTime.scheduled_time=response.data.total_time;
        this.machineTime.Date=""+ now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
        this.machineTime.time_local=""+this.machineTime.Date+now.getHours()+":00:00";
        this.machineTime.Hour=""+now.getHours();
        this.machineTime.production_time=response.data.production_time;
        this.machineTime.unscheduled_downtime=response.data.unscheduled_downtime;
        this.machineTime.idle_time=this.machineTime.total_time-this.machineTime.production_time-this.machineTime.engineering_time-this.machineTime.scheduled_downtime;
        this.machineTime.unit_count=response.data.unit_count;
        
        this.machineTime.pass_count=this.machineTime.unit_count;
        if(this.machineTime.unit_count===0){
          this.machineTime.pass_cycle_time="0";
        }
        this.machineTime.pass_cycle_time=(this.machineTime.production_time/this.machineTime.unit_count).toFixed(3);
        this.machineTime.fail_cycle_time=0;
        this.ipcService.send("machineTimeconfig",this.machineTime);
        //console.info(this.machineTime);
        this.saveProductdata();
      })
    })
  }
  //启动 就绪状态才能点
  startUp() {
    
    if (this.status !== "就绪") {
      return;
    }
    this.clickclass=[true,false,false,false,false,false,false,false,false,false];
    if(this.configinfos.IP.indexOf('.')===-1||this.configinfos.LineNo.indexOf("-")===-1||this.configinfos.MAC_ADDR.indexOf("-")===-1||this.configinfos.StationNo.indexOf("-")===-1){
      this.warn.loginfo='配置文件配置不合理';
      this.warn.time=Date.now();
      this.warn.style='red';
     // this.configisShow.emit(this.iscongigshow);
      return;

    }
    else{
      this.warn.loginfo="";
    }
    this.startclass = true;
    this.emergencyclass = false;
    this.resetclass = false;
    this.suspendclass = false;
    this.stopClass = false;
    this.ipcService.send("operate", {
      "code": 1
    });
    this.ipcService.send("trayCount", {
      "layers_a": this.headerinfo.Atraynumber,
      "layers_b": this.headerinfo.Btraynumber
    })//清除A料仓数据
  }
  repair() {
    if(this.protecttime==='保养中'){
      return;
    }
   this.isrepaire=true;
   this.ismatain=false;
    if (this.repairtime === "维修") {
      this.repairtime = "维修中";
      this.repairstartTime = Date.now();
    } else {
      this.repairtime = "维修";
      this.repairtotaltime = (Date.now() - this.repairstartTime) / 1000;
      this.repairAlltime += this.repairtotaltime;
    }
  }
  matain(){
    if(this.repairtime==="维修中"){
      return;
    }
    this.ismatain=true;
    this.isrepaire=false;
    if(this.protecttime==="保养"){
      this.protecttime="保养中";
      this.matainstarttime= Date.now();
    }else{
      this.protecttime="保养";
      this.mataintotaltime=(Date.now()-this.repairstartTime)/1000;
      this.matainAlltime+=this.mataintotaltime;
    }
  }
  
 
  saveProductdata()//写入文档
  {
    this.repairstartTime=Date.now();
    this.matainstarttime=Date.now();
    this.repairAlltime=0;
    this.matainAlltime=0;
  }
  showMessageBox(browswindow: object, options: object) {
    return new Promise(function (resolve, reject) {
      dialog.showMessageBox(browswindow, options, (btnIndex: number) => {
        resolve(btnIndex);
      });
    });
  }
  //急停  
  emergencyStop() {
  
    this.startclass = false;
    this.resetclass = false;
    this.suspendclass = false;
    this.emergencyclass = true;
    this.stopClass = false;
    this.ipcService.send("operate", {
      "code": 0
    })
  }
  //复位 除了未连接都可以
  reset() {
    if (this.status === "未连接" ) {
      return;
    }
    this.clickclass=[false,true,false,false,false,false,false,false,false,false];
    
    this.startclass = false;
    this.suspendclass = false;
    this.emergencyclass = false;
    this.resetclass = true;
    this.stopClass = false;
    this.ipcService.send("operate", {
      "code": 3
    })
  }
  //暂停  必须是工作中或者复位中
  suspend() {
    
    this.clickclass=[false,false,true,false,false,false,false,false,false,false];
    if (this.status === "工作中" || this.status === "复位中" || this.status === "暂停") {
      this.opreatelist.push(0);
      if (this.opreatelist.length % 2 == 0) {
        if (this.status === "工作中") {
          this.startclass = true;
          this.emergencyclass = false;
          this.resetclass = false;
          this.suspendclass = false;
          this.stopClass = false;
        } else {
          this.startclass = false;
          this.emergencyclass = false;
          this.resetclass = true;
          this.suspendclass = false;
          this.stopClass = false;
        }
        this.ipcService.send("operate", {
          "code": 2
        })
      } else {
        this.startclass = false;
        this.emergencyclass = false;
        this.resetclass = false;
        this.suspendclass = true;
        this.stopClass = false;
        this.ipcService.send("operate", {
          "code": 2
        })
      }
    }
  }
  //停止     必须是工作中或者复位中
  stop() {
    
    if (this.status === "工作中" || this.status === "复位中") {
      this.clickclass=[false,false,false,true,false,false,false,false,false,false];
      this.startclass = false;
      this.emergencyclass = false;
      this.resetclass = false;
      this.suspendclass = false;
      this.stopClass = true;
      this.ipcService.send("operate", {
        "code": 4
      })
    }
  }
  showIo() {
    
    if (this.userinformation.role == "操作员") {
      return;
    }
    this.clickclass=[false,false,false,false,true,false,false,false,false,false];
    this.ioisShow.emit(false);
    // this.isShow=!this.isShow;
  }
  showConfig() {
    
    if (this.userinformation.role == "操作员") {
      return;
    }
    this.clickclass=[false,false,false,false,false,false,true,false,false,false];
    
    this.configisShow.emit(false);
    //this.iscongigshow=!this.iscongigshow;
  }
  openLogPanel() {
   
    this.clickclass=[false,false,false,false,false,false,false,true,false,false];
    
    this.isUseShow = true;
    this.isUseShowfun.emit(false);
  }
  loginIn() {
    // this.isloginPanelShow.emit(false);
    // this.styleclass[0] = false;
    // this.styleclass[1] = false;
    // if (this.styleclass[2] === true) {
    //   this.styleclass[2] = false;
    // } else {
    //   this.styleclass[2] = true;
    // }
    this.isShowLoginOut = !this.isShowLoginOut;
  
}
  login(){
    
    this.clickclass=[false,false,false,false,false,false,false,false,false,true];
    
    if (this.userinformation.isLogin === false) {
      this.loginstatus = "登录";
      this.outlogin.emit(false);
      this.isShowLoginOut = !this.isShowLoginOut;
    } else {
      // if (this.machineStatus === 8 || this.machineStatus === 3) {
      //   return;
      // }
      this.loginstatus = "退出登录";
      this.ipcService.send("loginout", { "username": "", "psw": "" });//0代表退出
      this.isloginPanelShow.emit(false);
     
  }
  
    
  }
  changpwd(){
    this.outlogin.emit(true);
    
  }
  // logout() {
  //   this.isloginPanelShow.emit(false);
  // }
  openpointPanel() {
    // if (this.userinformation.role == "操作员") {
    //   return;
    // }
  
    this.clickclass=[false,false,false,false,false,true,false,false,false,false];
    
    this.ispointPanelShow.emit(false)
  }
  fullScreen() {//全屏
    this.clickclass=[false,false,false,false,false,false,false,false,true,false];
    
    this.fullScreenFlag = !this.fullScreenFlag;
    nodeRequire('electron').remote.getCurrentWindow().setFullScreen(this.fullScreenFlag);
    if (this.fullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
  // changePwd() {
  //   this.ischangepwdPanelShow.emit(false);
  // }
}