import { Component, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { IPCService } from '../../common/service/ipc.service';
import { countInfoService } from '../../service/countinfoService';
import { AssemblingService } from '../../service/assemblingService';
import { assemblystatusService } from '../../service/assemblystatusService';
import { TrayinfoService } from '../../service/TrayinfoService';
import { productionRecordService } from '../../service/productionRecordService';

import { Headerinfo } from '../../common/bean/headerinfo';
import { workModel } from '../../common/bean/workmodel';
import { Trayinfo } from '../../common/bean/trayinfo';
import { MSG_TYPE } from '../../common/bean/msgType';
import { productDetail } from '../../common/bean/productdetail';
import { Config } from '../../common/bean/machineConfig'
import { Assembling } from '../../common/bean/Assembling';

import { AssembleinfoComponent } from "../assembleing/assembleing";

import { KeycapDetailComponent } from "../keycapsDetails/keycapsdetail";
import { HeaderinfoComponent } from "../headerinfo/headerinfo";
import { AsideComponent } from "../aside/aside";
import { KeycapsComponent } from "../keycaps/keycaps";
import { LogPanel } from "../logPanel/logPanel";
import { LoginlPanel } from "../loginPanel/login.panel";
import { ChangePassword } from "../changePassword/change.password";
import { PcbCountComponent } from "../pcbcount/pcbcount";
import {PointPanel} from "../pointPanel/pointPanel";
const dialog = nodeRequire('electron').remote.dialog;
const browserWindow = nodeRequire('electron').remote.getCurrentWindow();
@Component({
  selector: 'root',
  templateUrl: "./webApp/component/root/root.html"
})
export class AppComponent {
  private _ngZone: NgZone
  private title: String
  private ipcService: IPCService;
  private AstartTime: number;//上料开始时间
  private AendTime: number;//出料结束时间
  private BstartTime: number;//上料开始时间
  private BendTime: number;//出料结束时间
  private countInfoService: countInfoService;
  private assemblystatusService: assemblystatusService;
  private trayinfoService: TrayinfoService;
  private productionRecordService: productionRecordService;
  private headerinfo: Headerinfo;
  private assemblingService: AssemblingService;
  private assembling: Assembling;
  private workmodel: workModel;
  private trayinfo: Trayinfo;
  private closewindow:boolean;
  private productdetail: productDetail;
  private isShow: boolean = true;
  private configShow: boolean = true;
  private isUseShow: boolean = false;
  private logshow: boolean = true;
  private pointshow: boolean = true;
  private logs: { time: number, loginfo: string,style:string}[];
  private warn:{ time: number,loginfo: string,style:string};
  private starttime:number;
  private ctnumber: boolean;
  private ctstarttime: number;//ct计数开始时间
  private ctendtime: number;//ct结束时间
  private maskshow: boolean = true;
  private loginStatus: { isLogin: boolean, role: string }
  private status: string; //运行状态
  private statusops:number;
  @ViewChild(AssembleinfoComponent)
  private assembleing: AssembleinfoComponent;
  @ViewChild(ChangePassword)
  private changePassword: ChangePassword;
  @ViewChild(KeycapsComponent)
  private keycapsComponent: KeycapsComponent;
  @ViewChild(KeycapDetailComponent)
  private keycapsDetail: KeycapDetailComponent;
  @ViewChild(HeaderinfoComponent)
  private headerinfomation: HeaderinfoComponent;
  @ViewChild(LoginlPanel)
  private loginpanel: LoginlPanel;
  @ViewChild(LogPanel)
  private logpanel: LogPanel;
  @ViewChild(PointPanel)
  private pointpanel: PointPanel;
  @ViewChild(AsideComponent)
  private asidecomponent: AsideComponent;
  @ViewChild(PcbCountComponent)
  private pcbCountComponent: PcbCountComponent;
  private outTrayCount: number = 0;
  private configinfo = {
    IP: "",
    MAC_ADDR: "",
    StationNo: "",
    MachineNo: "",
    LineNo: "",
    StationVer:"",
    AOutTrayCount: 0,  //出料个数,
    BOutTrayCount:0,
    macineType:"",
    CTtime:"",
  }
  private isAoutTray = false;
  private isBoutTray = false;
  constructor(_ngZone: NgZone,
    ipcService: IPCService,
    countInfoService: countInfoService,
    assemblingService: AssemblingService,
    assemblystatusService: assemblystatusService,
    trayinfoService: TrayinfoService,
    productionRecordService: productionRecordService,
  ) {
    this._ngZone = _ngZone;
    this.title = 'IAStudio';
    this.ipcService = ipcService;
    this.countInfoService = countInfoService;
    this.assemblingService = assemblingService;
    this.assemblystatusService = assemblystatusService;
    this.trayinfoService = trayinfoService;
    this.productionRecordService = productionRecordService;
    this.logs = [];
    this.ctnumber =true;
    this.starttime=0;
    this.closewindow=true;
    this.loginStatus = {
      isLogin: false,
      role: "登录",
    };
    this.status = "请复位";
    this.warn ={time: 0,loginfo: "",style:""};
  }
  ngOnInit() {
    this.headerinfo = new Headerinfo();
    this.workmodel = new workModel();
    this.trayinfo = new Trayinfo();
    this.assembling = new Assembling();
    this.productdetail = new productDetail();
    this.headerinfo.Atraynumber = 0;
    this.headerinfo.Btraynumber = 0;
    this.headerinfo.totalPCBnumber = 0;
    let self = this;
    this.ipcService.on("countInfo", (data) => {
      this._ngZone.run(() => {
        console.log("接受到的数据:" + data.data);
      });
    });
    this.ipcService.on("workingDetail", (data) => {
      this._ngZone.run(() => {
        this.assemblingService.updateheadInfo(this.assembling, data.data, 1);
        this.assemblingService.updateheadInfo(this.assembling, data.data, 2);
        console.log("接受到的数据:" + data.data);
      });
    });
    this.ipcService.on("assemblyStatus", (data) => {
      this._ngZone.run(() => {
        console.log("接受到的数据:" + data);
        this.assembleing.workassemb(data.data[0]);
      });
    });
    this.ipcService.on("trayInfo", (data) => {
      this._ngZone.run(() => {
        this.trayinfoService.updatetrayInfo(this.trayinfo, data.data);
      })
    })
    this.ipcService.on("emptyTray", (data) => {
      this._ngZone.run(() => {

      })
    })
    this.ipcService.on("productionRecord", (data) => {
      this._ngZone.run(() => {
        this.productionRecordService.updateheadInfo(this.productdetail, data)
      })
    })
    this.ipcService.on("warn", (data) => {//报警信息
      this._ngZone.run(() => {
        this.logs.unshift({
          time: Date.now(), loginfo: data.data.msg,style:"red"
        });
        let errorData = this.logs.find((item)=>{
          return item.style === "red";
        });
        this.warn = Object.assign({},errorData);
        this.warn.loginfo = this.warn.loginfo.split(",")[2];
      })
    })
    this.ipcService.on("log", (data) => {//普通日志信息
      this._ngZone.run(() => {
        this.logs.unshift({
          time: Date.now(), loginfo: data.data.msg,style:""
        });
      })
    })
    this.ipcService.on("MachineConnect", (data) => {//通讯连接
      this._ngZone.run(() => {
        this.pcbCountComponent.readMachineConnect(data.data);
      })
    })
    this.ipcService.on("opsStatus", (data) => {
      this._ngZone.run(() => {
        this.pcbCountComponent.changestatus(data.data.status);
        this.statusops=data.data.status;
        this.pointpanel.getUserandOpstatus(this.statusops,this.loginStatus.role);

        //this.headerinfomation.changestatus(data.data.status);
      })
    })
    this.ipcService.on("inmaterial", (data) => {//上料信号
      this._ngZone.run(() => {
       
      })
    })
    this.ipcService.on("feederinfomation", (data) => {//上料信息
      this._ngZone.run(() => {
        this.starttime=Date.now();
        if (data.data.code === "A") {
          this.AstartTime = Date.now();
        
       
       }else if(data.data.code==="B") {
          this.BstartTime = Date.now();
        }
        this.assemblingService.assemblinginfo(this.productdetail, data.data);
       
      
      })
    })
    this.ipcService.on("traynums",(data) => {
      this._ngZone.run(() => {
        if(data.data.code==="A"){
          this.headerinfo.Atraynumber=data.data.nums;
          let ARemainOutCount = this.configinfo.AOutTrayCount-this.headerinfo.Atraynumber;
          if( ARemainOutCount < 3 ){
            this.headerinfo.AtrayStyle = true;
          }
          if ( this.headerinfo.Atraynumber >=this.configinfo.AOutTrayCount
          && this.configinfo.AOutTrayCount>0 ) {
            this.warn.loginfo="B仓库待出料";
            this.warn.style="red";
            // this.ipcService.send("Warehouseout", {
            //   "code": "A"
            // });
          }

        }else if(data.data.code==="B"){
          this.headerinfo.Btraynumber=data.data.nums;
          let BRemainOutCount = this.configinfo.BOutTrayCount-this.headerinfo.Btraynumber;
          if( BRemainOutCount < 3 ){
            this.headerinfo.BtrayStyle = true;
          }
          if ( this.headerinfo.Btraynumber >=this.configinfo.BOutTrayCount
            && this.configinfo.BOutTrayCount>0 ) {
              this.warn.loginfo="B仓库待出料";
              // this.warn.style="red";
              // this.ipcService.send("Warehouseout", {
              //   "code": "B"
              // });
            }
        }

      })
    })
    this.ipcService.on("page_readyResult", (data) => {//页面一加载
      this._ngZone.run(() => {
        this.headerinfo.Atraynumber = data.data.Atraynumber || 0;
        this.headerinfo.Btraynumber = data.data.Btraynumber || 0;
        this.headerinfo.totalPCBnumber = data.data.totalPCBnumber || 0;
        //this.keycapsComponent.readconfig(data.data);
        //this.asidecomponent.readmachineconfig(data.data);
      })
    });
    this.ipcService.on("machineconfig", (data) => {//页面一加载发送设备信息
      this._ngZone.run(() => {
       // console.info(data.data);
        this.configinfo.IP = data.data.IP;
        this.configinfo.MAC_ADDR = data.data.MAC_ADDR;
        this.configinfo.MachineNo = data.data.MachineNo;
        this.configinfo.StationNo = data.data.StationNo;
        this.configinfo.LineNo = data.data.LineNo;
        this.configinfo.StationVer = data.data.StationVer;
        this.configinfo.AOutTrayCount = data.data.AOutTrayCount;
        this.configinfo.BOutTrayCount = data.data.BOutTrayCount;
        this.configinfo.macineType=data.data.macineType;
        this.configinfo.CTtime=data.data.CTtime;
        this.headerinfo.AOutTrayCount =  this.configinfo.AOutTrayCount||0;
        this.headerinfo.BOutTrayCount = this.configinfo.BOutTrayCount||0;
        this.asidecomponent.readmachineconfig(data.data);
        this.checkConfig();
      })
    })
    //监听与中间件打开连接状态
    this.ipcService.on("connect", (data) => {//与中间件连上后发送tray盘信息
        this._ngZone.run(() => {
          // setTimeout( (item)=>{
         
          // self.ipcService.send("trayCount", {
          //   "layers_a":  self.headerinfo.Atraynumber,
          //   "layers_b":  self.headerinfo.Btraynumber
          // })//清除A料仓数据
          // setTimeout(()=>{
          // this.ipcService.send("machineconfig",this.configinfo);
          // },500);
         // this.ipcService.send("machineConfig", this.configinfo);
       
          this.pcbCountComponent.openUIConnect();
       
          //this.pcbCountComponent.openUIConnect();
          //},1000);
        })
    })
    //监听与中间件关闭状态
    this.ipcService.on("closeConnect", (data) => {
        this._ngZone.run(() => {
          if(data.data.data===0){
            this.pcbCountComponent.closeUIConnect();
            this.statusops=1;
          }
       
        })
    })
    // window.onbeforeunload = (event) => {
    //   //工作中或者复位中,不能关闭软件
    //   if (this.statusops === 8 || this.statusops === 4) {
    //     event.returnValue = false;
    //   }
    // }
    //不再有计数的接口
    // this.ipcService.on("traytotal", (data) => {//Tray盘计数
    //   this._ngZone.run(() => {
    //     if (data.data.code === "A") {
    //       this.headerinfo.Atraynumber = data.data.traytotal;
    //     } else {
    //       this.headerinfo.Btraynumber = data.data.traytotal;
    //     }
    //   })
    // })
    // this.ipcService.on("onloadProduct", (data) => {//Tray盘计数
    //   this._ngZone.run(() => {
    //     console.info("wqwqwqwq", data.data)
    //     this.assemblingService.onloadProduct(this.assembling, data.data);
    //   })
    // })
    this.ipcService.on("outmaterial", (data) => {//出料
      this._ngZone.run(() => {
        //将数据清空
        this.productdetail.APCBSN = "";
        this.productdetail.BPCBSN = "";
        this.productdetail.ATraySN = "";
        this.productdetail.codeStation = "";
        this.productdetail.BTraySN = "";
        this.productdetail.jobnumber = "";
        this.productdetail.type = "";
        this.productdetail.keynow = ""
        this.assemblingService.productdetailinfo(this.assembling, data.data);
       
        if(this.ctnumber===true){
         this.ctstarttime = Date.now();
         this.headerinfo.CT= (this.ctstarttime-this.starttime)/1000;
         this.ctnumber=false;
        }else{
          this.headerinfo.CT = Date.now() - this.ctstarttime;
          this.ctstarttime = Date.now();
        }
        
        if (data.data.code === "A") {
          this.AendTime = Date.now();
          this.headerinfo.Acycletime = (this.AendTime - this.AstartTime) / 1000;
        } else {
          this.BendTime = Date.now();
          this.headerinfo.Bcycletime = (this.BendTime - this.BstartTime) / 1000;
        }
        this.headerinfo.totalPCBnumber = this.headerinfo.totalPCBnumber + 1;
      });
    });
    this.ipcService.on("WarehouseoutOK", (data) => {//出料结果
      this._ngZone.run(() => {
        if (data.data.code === "A") {
          this.isAoutTray = false;
          this.ipcService.send("resetTrayData", {
            "code": "A"
          })//清除A料仓数据
          this.headerinfo.Atraynumber = 0;
          this.headerinfo.AtrayStyle = false;
        } else {
          this.isBoutTray = false;
          this.ipcService.send("resetTrayData", {
            "code": "B"
          })//清除料仓数据
          this.headerinfo.Btraynumber = 0;
          this.headerinfo.BtrayStyle = false;
        }
      })
    })
     
    window.onbeforeunload = (event) => {
      event.returnValue = false;
      //工作中或者复位中,不能关闭软件
      
      if (this.statusops === 8 || this.statusops === 4) {
       return;
       
      } 
      if(event.returnValue==="false" &&this.closewindow===true){
        //event.returnValue = false;
        this.showMessageBox(browserWindow, {
          type: "warning",
          message: "是否关闭软件",
          buttons: ["确定", "取消"],
          defaultId: 0,
          cancelId: -1,
        }).then((btnIndex: number) => {
          if (btnIndex === 0) {
           this.ipcService.send("windowclose",{});
       
          } else {
            this.closewindow=true;
            event.returnValue=false;
           
          }
        })
        this.closewindow=false;
      }
    }
    this.ipcService.on(MSG_TYPE.SEND_TO_MSG, (response) => {
      this._ngZone.run(() => {
        console.info(response.data);
        if (undefined !== response.data.log) { //中间件发送来的日志
          //this.currenttime=Date.now();      
          this.logs.unshift({
            time: Date.now(), loginfo: response.data.log,style:""
          });
          // this.logs.push({
          //   time: Date.now(), loginfo: response.data.log
          // });
          setTimeout(() => {
            document.getElementById('js_logDiv').scrollTop = document.getElementById('js_logDiv').scrollHeight;
          }, 0);
        }
        if (undefined !== response.data.operate) { //中间件发送来的日志
          //this.currenttime=Date.now();      
          this.logs.unshift({
            time: Date.now(), loginfo: response.data.operate,style:""
          });
          setTimeout(() => {
            document.getElementById('js_logDiv').scrollTop = document.getElementById('js_logDiv').scrollHeight;
          }, 0);
        }
        if (undefined !== response.data.error) {//中间件发送来的异常信息
          this.logs.unshift({
            time: Date.now(), loginfo: response.data.error,style:"red"
          });
          setTimeout(() => {
            document.getElementById('js_logDiv').scrollTop = document.getElementById('js_logDiv').scrollHeight;
          }, 0);
        }
      })
    })
    this.ipcService.on("workModel", (data) => {
      this._ngZone.run(() => {
        //console.info("workModel", data.data);
        this.keycapsComponent.readconfig(data.data);
        // this.assemblingService.onloadProduct(this.workmodel, data.data);
      });
    })
  }
  ngAfterViewInit() {
    this.ipcService.send("pageready", {});
    this.checkConfig();
    this.maskshow = false;
  }
  showIo(isioshow: boolean) {
    this.isShow = isioshow;
    console.info(this.isShow);
  }
  showconfig(configshow: boolean) {
    this.configShow = configshow;
  }
  changepwd(pwdpanel: boolean) {
    this.changePassword.show();
  }
  changeStatus(newStatus:string){
    this.status = newStatus;
  }
  showfunlog(showlogfunction: boolean) {
    this.isUseShow = showlogfunction;
    //this.logpanel.show();
    if (this.isUseShow ===false) {

      this.logpanel.show()
        .then((result: boolean) => {
          this.logshow = result;
        });
    }
  }
  showMessageBox(browswindow: object, options: object) {
    return new Promise(function (resolve, reject) {
      dialog.showMessageBox(browswindow, options, (btnIndex: number) => {
        resolve(btnIndex);
      });
    });
  }
  showlogpanel(logpanelshow: boolean) {
    this.logshow = logpanelshow;
  }
  showpointpanel(Pointshow: boolean) {
    this.pointshow = Pointshow;
  }
  showconfiginfo( data:any[] ) {
    this.configinfo.IP = data[0];
    this.configinfo.MAC_ADDR = data[1];
    this.configinfo.StationNo = data[2];
    this.configinfo.MachineNo = data[3];
    this.configinfo.LineNo = data[4];
    this.configinfo.StationVer = data[5];
    this.configinfo.AOutTrayCount = data[6];
    this.configinfo.BOutTrayCount = data[7];
    this.configinfo.macineType=data[8];
    this.configinfo.CTtime=data[9];
    this.headerinfo.AOutTrayCount =  data[6]||0;
    this.headerinfo.BOutTrayCount = data[7]||0;
   // this.checkConfig();
  }
  loginshow(logineeshow: boolean) {
    //this.loginpanel.hiddenLoginPanel()
    this.loginpanel.showLoginPanel();
    this.maskshow = false;
  }
  getuserinfo(result: { isLogin: boolean, role: string }) {
    //this.loginStatus.role=result.role;
    if (result.role == "admin") {
      this.loginStatus.role = "管理员";
    } else {
      this.loginStatus.role = "操作员";
    }
    this.pointpanel.getUserandOpstatus(this.statusops,this.loginStatus.role);
    this.loginStatus.isLogin = result.isLogin;
    this.maskshow = true;
  }
  outlogin(outlogin:boolean){
    this.changePassword.show();
    this.maskshow = false;
  }
  closepwd(closeing: boolean) {
    if (closeing === true) {
      this.maskshow = closeing;
    } else {
      this.maskshow = false;
      this.loginpanel.showLoginPanel();
    }

  }
  //检查配置是否有空的情况，有的话报警
  checkConfig(){
    let warnInfo = "";
    if( this.configinfo.IP === ""){
      warnInfo+="IP,";
    }
    if( this.configinfo.MAC_ADDR === ""){
      warnInfo+="MAC_ADDR,";
    }
    if( this.configinfo.MachineNo === ""){
      warnInfo+="MachineNo,";
    }
    if( this.configinfo.StationNo === ""){
      warnInfo+="StationNo,";
    }
    if( this.configinfo.LineNo === ""){
      warnInfo+="LineNo,";
    }
    if( this.configinfo.AOutTrayCount === 0 ){
      warnInfo+="A仓库出料个数,";
    }
    if( this.configinfo.BOutTrayCount === 0 ){
      warnInfo+="B仓库出料个数,";
    }
    if( warnInfo !== "" ){
      warnInfo+="参数为空!请设置参数"
    }
    this.warn.loginfo = warnInfo;
  }
}