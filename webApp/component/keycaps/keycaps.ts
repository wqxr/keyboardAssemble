import { Component, NgZone, Input } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { Assembling } from '../../common/bean/Assembling';
import { workModel } from '../../common/bean/workmodel';
import { IPCService } from '../../common/service/ipc.service';
import { MSG_TYPE } from "../../common/bean/msgType";
import { Headerinfo } from '../../common/bean/headerinfo';
const dialog = nodeRequire('electron').remote.dialog;
const browserWindow = nodeRequire('electron').remote.getCurrentWindow();
@Component({
  selector: 'keycaps',
  templateUrl: "./webApp/component/keycaps/keycaps.html"
})

export class KeycapsComponent {
  private _ngZone: NgZone
  private title: String;
  private ipcService: IPCService;
  @Input()
  private assembling: Assembling;
  @Input()
  private status: number;
  @Input()
  private configinfos: { 
    IP: "",
    MAC_ADDR: string,
    StationNo:string,
    MachineNo:string,
    LineNo: string,
    StationVer:string,
    OutTrayCount: string  
  };
  private classstyle:boolean[];
  @Input()
  private userinformation: { isLogin: boolean, role: string };
  @Input()
  private headerinfo: Headerinfo;
  @Input()
  private warn:{ time: number,loginfo: string,style:string};
  // @Input()
  // private configinfo：{ configname:string,configid: string,OutTrayCount:string}; 
  private checknumber: number;
  private workmodel: workModel;
  private isAdmin: boolean;
  private correctTime:number;
  //A.B仓库按钮选中样式
  private AdepotClass = "";
  private BdepotClass = "";
  //导正次数样式
  private checkTimesClass = [false,false,false];
  //2号机 pcb轨道模式 tray盘轨道模式
  private config: {
    CCD: boolean;
    scanCode: boolean;
    ccdres: boolean;
    space: boolean;
    enableStationA: boolean;
    enableStationB: boolean;
    showflowin: boolean;
    emptyrun: boolean;//空炮
    enter: boolean;
    up: boolean;
    down: boolean;
    caps:boolean;
    enableMachineCon: boolean;
    JisProduct:boolean;
    PcbRoad:boolean;
    tray_flowline:boolean;
  }
  private key: {
    enter: string;
    up: string
    down: string;
    space: string;
  }
  constructor(_ngZone: NgZone, ipcService: IPCService) {
    this._ngZone = _ngZone;
    this.ipcService = ipcService;
    this.workmodel = new workModel();
    this.checknumber = 0;
    this.config = {
      CCD: false,
      scanCode: false,
      ccdres: false,
      space: false,
      enableStationA: false,
      enableStationB: false,
      showflowin: false,
      emptyrun: false,
      enter: false,
      up: false,
      down: false,
      caps:false,
      enableMachineCon: false,
      JisProduct:false,
      PcbRoad:false,
      tray_flowline:false
    }
    this.classstyle=[false,false,false,false,false,false];
    this.key = {
      enter: "",
      up: "",
      down: "",
      space: "",
    }
    this.correctTime = 1;
  }
  readconfig(data: any) {
    if (data.CCD === 1) {
      this.config.CCD = true;
    } else {
      this.config.CCD = false;
    }
    if (data.scanCode == 1) {
      this.config.scanCode = true;
    } else {
      this.config.scanCode = false;
    }
    if (data.ccdres == 1) {
      this.config.ccdres = true;
    } else {
      this.config.ccdres = false;
    }
    if (data.space == 1) {
      this.config.space = true;
    } else {
      this.config.space = false;
    }
    if (data.enableStationA == 1) {
      this.config.enableStationA = true;
      this.config.up=true;
      this.config.down=true;
    } else {
      this.config.enableStationA = false;
    }
    if (data.enableStationB == 1) {
      this.config.enableStationB = true;
      this.config.up=true;
      this.config.down=true;
    } else {
      this.config.enableStationB = false;
    }
    if (data.showflowin == 1) {
      this.config.showflowin = true
    } else {
      this.config.showflowin = false;
    }
    if (data.emptyrun == 1) {
      this.config.up=true;
      this.config.down=true;
      this.config.emptyrun = true;
    } else {
      this.config.emptyrun = false;
    }
    if (data.enableMachineCon === 1) {
      this.config.enableMachineCon = true;
    } else {
      this.config.enableMachineCon = false;
    }
    if (data.enter === 1) {
      this.config.enter = true;
    } else {
      this.config.enter = false;
    }
    if (data.caps === 1) {
      this.config.caps = true;
    } else {
      this.config.caps = false;
    }
    if( data.JisProduct === 1) {
      this.config.JisProduct = true;
    } else {
      this.config.JisProduct = false;
    }
    if( data.correctTimes === 1) {
      this.checkTimesClass = [true,false,false];
      this.correctTime = 1;
     
    } else if( data.correctTimes === 2 ){
      this.checkTimesClass = [false,true,false];
      this.correctTime = 2;
    }else if(data.correctTimes === 3){
      this.checkTimesClass = [false,false,true];
      this.correctTime = 3;
    }
    if( data.PcbRoad === 1) {
      this.config.PcbRoad = true;
    } else {
      this.config.PcbRoad = false;
    }
    if( data.tray_flowline === 1) {
      this.config.tray_flowline = true;
    } else {
      this.config.tray_flowline = false;
    }
  }
  changedata( selectOption:string) {
    if(this.status===8){//工作中不可以更改工作模式
      return;
    }
    if( selectOption !== ""){
      //判断选中的选项并将值取反
      this.config[selectOption] = !this.config[selectOption];
    }
    //启用CCD
    if (this.config.CCD == true) {
      this.workmodel.CCD = 1;
    } else {
      this.workmodel.CCD = 0;
    }
    //ccd拍照结果  选中CCD拍照结果默认选中启动CCD
    if (this.config.ccdres == true) {
      this.workmodel.ccdres = 1;
      if ( selectOption === "ccdres" ) {
        this.config.CCD = true;
        this.workmodel.CCD = 1;
      }
    } else {
      this.workmodel.ccdres = 0;
    }
    //showFlowin上传 选中showFlowin默认选中扫码
    if (this.config.showflowin == true) {
      this.workmodel.showflowin = 1;
      if ( selectOption === "showflowin") {
        this.config.scanCode = true;
        this.workmodel.scanCode = 1;
      }
    } else {
      this.workmodel.showflowin = 0;
    }
    //扫码
    if (this.config.scanCode == true) {
      this.workmodel.scanCode = 1;
    } else {
      this.workmodel.scanCode = 0;
    }
    //空格键扣合
    if (this.config.space == true) {
      this.workmodel.space = 1;
      this.key.space = "space";
    } else {
      this.key.space = "";
      this.workmodel.space = 0;
    }
    //启用A工站
    if(this.config.enableStationA===true||this.config.enableStationB===true||this.config.emptyrun===true){
      if ( selectOption === "enableStationA"||selectOption === "enableStationB") {
        this.config.up = true;
        this.workmodel.up = 1;
        this.config.down=true;
        this.workmodel.down = 1;
      }
     
    }else{
      if ( selectOption === "enableStationA"||selectOption === "enableStationB") {
        this.config.up = false;
        this.workmodel.up = 0;
        this.config.down=false;
        this.workmodel.down =0;
      }
    
    }
    if (this.config.enableStationA == true) {
      this.workmodel.enableStationA = 1;
      
    } else {
     
      this.workmodel.enableStationA = 0;
    }
    //启用B工站
    if (this.config.enableStationB == true) {
      this.workmodel.enableStationB = 1;
     
    } else {
      
      this.workmodel.enableStationB = 0;
    }
    //空跑
    if (this.config.emptyrun == true) {
      this.workmodel.emptyrun = 1;
      
    } else {
     
      this.workmodel.emptyrun = 0;
    }
    //enter键扣合
    if (this.config.enter == true) {
      this.workmodel.enter = 1;
      this.key.enter = "enter";
    } else {
      this.workmodel.enter = 0;
      this.key.enter = "";
    }
    //上键扣合
    if (this.config.up == true) {
      this.workmodel.up = 1;
      this.key.up = "up";
    } else {
      this.workmodel.up = 0;
      this.key.up = "";
    }
    //下键扣合
    if (this.config.down == true) {
      this.workmodel.down = 1;
      this.key.down = "down";
    } else {
      this.workmodel.down = 0;
      this.key.down = "";
    }
    //caps键扣合
    if (this.config.caps == true) {
      this.workmodel.caps = 1;
      this.key.down = "down";
    } else {
      this.workmodel.caps = 0;
      this.key.down = "";
    }
    //连接下站
    if (this.config.enableMachineCon === true) {
      this.workmodel.enableMachineCon = 1;
    } else {
      this.workmodel.enableMachineCon = 0;
    }
    //pcb轨道
    if (this.config.PcbRoad === true) {
      this.workmodel.PcbRoad = 1;
    } else {
      this.workmodel.PcbRoad = 0;
    }
    //tray盘轨道
    if (this.config.tray_flowline === true) {
      this.workmodel.tray_flowline = 1;
    } else {
      this.workmodel.tray_flowline = 0;
    }
    //JIS产品
    if (this.config.JisProduct === true) {
      this.workmodel.JisProduct = 1;
    } else {
      this.workmodel.JisProduct = 0;
    }
    if( selectOption !== ""){
      this.workmodel.correctTimes = this.correctTime;
      this.ipcService.send("workModel", this.workmodel);
    }
  }
  //矫正次数和工作模式一起发送给中间件
  setTimes(times:number){
    this.checkTimesClass[0] = false;
    this.checkTimesClass[1] = false;
    this.checkTimesClass[2] = false;
    this.checkTimesClass[times] = true;
    this.changedata("");
    this.workmodel.correctTimes = times+1;
    this.correctTime = times+1;
    this.ipcService.send("workModel", this.workmodel);
  }
  check() {
    this.ipcService.send("checkcorrect", { "checknumber": this.checknumber });//矫正次数   
  }
  //  Achose() {
  //   this.ipcService.send("Warehouseout", {
  //     "code": "A"
  //   });
  //   //在数据库清除
  //   this.ipcService.send("resetTrayData", {
  //     "code": "A"
  //   })//清除料仓数据
  //   //this.headerinfo.Atraynumber = 0;
  // }
  // Bchose() {
  //   this.ipcService.send("Warehouseout", {
  //     "code": "B"
  //   })
  //   //this.headerinfo.Btraynumber = 0;
  //   //在数据库清除
  //   this.ipcService.send("resetTrayData", {
  //     "code": "B"
  //   })//清除料仓数据
  // }
  Aoutdepot(){
    if (this.status === 8) {
      this.showMessageBox(browserWindow, {
        type: "warning",
        message: "工作中料仓不能出库"
      });
      return;
    } else {
      this.showMessageBox(browserWindow,{
        type: "warning",
        message: "是否A料仓出库",
        buttons: ["是", "否"],
        defaultId: 0,
        cancelId:-1,
      }).then((btnIndex: number) => {
        if (btnIndex === 0) {
          this.classstyle = [false, false, true, false,false,false];
          
                this.ipcService.send("Warehouseout", { "code": "A" });
                setTimeout(() => {
                  this.ipcService.send("resetTrayData", {
                    "code": "A"
                  })//清除料仓数据
                  this.headerinfo.Atraynumber = 0;
                }, 100)
        }else{
          return;
        }
      })
    }
  }
  Boutdepot(){

    if (this.status === 8) {
      this.showMessageBox(browserWindow, {
        type: "warning",
        message: "工作中料仓不能出库"
      });
      return;
    } else {
      this.showMessageBox(browserWindow,{
        type: "warning",
        message: "是否B料仓出库",
        buttons: ["是", "否"],
        defaultId: 0,
        cancelId:-1,
      }).then((btnIndex: number) => {
        if (btnIndex === 0) {
          this.classstyle = [false, false, false, true,false,false];
          
                this.ipcService.send("Warehouseout", { "code": "B" });
                setTimeout(() => {
                  this.ipcService.send("resetTrayData", {
                    "code": "B"
                  })//清除料仓数据
                  this.headerinfo.Btraynumber = 0;
                }, 100)
        }else{
          return;
        }
      })
    }
    
  }
  Aclear() {
    this.classstyle=[true,false,false,false,false,false];
    //this.AdepotClass = "active";
    //this.BdepotClass = "";
    this.ipcService.send("Warehousezero", {
      "code": "A"
    });
    this.headerinfo.Atraynumber = 0;
    this.ipcService.send("resetTrayData", {
      "code": "A"
    })//清除A料仓数据
    
  }
  Bclear() {
    this.classstyle=[false,true,false,false,false,false];
    
   // this.AdepotClass = "";
    //this.BdepotClass = "active";
    this.ipcService.send("Warehousezero", {
      "code": "B"
    })
    this.headerinfo.Btraynumber = 0;
    this.ipcService.send("resetTrayData", {
      "code": "B"
    })//清除A料仓数据
  }
  PcbOut(type:string){
    if (this.status !==6) {
      this.showMessageBox(browserWindow, {
        type: "warning",
        message: "不在就绪状态下PCB不能出料"
      });
      return;
    }else{
     
    
    if(type==='A'){
      this.showMessageBox(browserWindow,{
        type: "warning",
        message: "A_PCB是否出料",
        buttons: ["是", "否"],
        defaultId: 0,
        cancelId:-1,
      }).then((btnIndex: number) => {
        if (btnIndex === 0) {
          this.classstyle=[false,false,false,false,true,false];
          this.ipcService.send("PCBOut",{'code':type});
        }
      })
      
    }else if(type==='B'){
      this.showMessageBox(browserWindow,{
        type: "warning",
        message: "B_PCB是否出料",
        buttons: ["是", "否"],
        defaultId: 0,
        cancelId:-1,
      }).then((btnIndex: number) => {
        if (btnIndex === 0) {
          this.classstyle=[false,false,false,false,false,true];
          this.ipcService.send("PCBOut",{'code':type});
        }
      })
      
    }
    
  }
  }
  showMessageBox(browswindow:object,options: object) {
    return new Promise(function (resolve, reject) {
      dialog.showMessageBox(browswindow,options, (btnIndex: number) => {
        resolve(btnIndex);
      });
    });
  }
  ngOnInit() {
    this.ipcService.on("WarehouseoutOK", (data) => {//出库完成反馈
      this._ngZone.run(() => {
        if(data.data.code!==undefined&&data.data.code==="A"){
         this.warn.loginfo="A仓库出料成功";
        }else if(data.data.code==="B"){
          this.warn.loginfo="B仓库出料成功";
        }
      })
    })

  }
}