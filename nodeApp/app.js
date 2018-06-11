const WebSocketUtil = require("./service/WebSocketUtil");
const excellogUtil = require("./service/excellogUtil");

const msgType = require("./common/systemVar.js").msgType;
const SYSTEM_VAR = require("./common/systemVar.js");
const excelLogUtil = require("./service/excellogUtil.js");

const { ipcMain } = require('electron');
const wsURL = require("./common/systemVar.js").wsURL;
const mongodbURL = require("./common/systemVar.js").mongodbURL;

const logger = require("./service/logger");
const uiHandler = require("./handle/uiHandler");
const MongodbService = require("./service/mongodbService");
const ProductionDetailHandler=require("./handle/ProductionDetail.js");   
const ConfigHandler=require("./handle/configHandler.js");
const ReadConfigHandler=require("./handle/readConfig.js");
const PcbtotalHandler=require("./handle/pcbTotal.js");
const MachineconfigHandler=require("./handle/readmachineconfig.js");
const GetmachineConfigHandler=require("./handle/getmachineconfig.js");
const ReadproductDetail=require("./handle/readProductdetail.js");
const ReadPcbCounting=require("./handle/readPcbCounting.js");
const UpdatePcbCounting=require("./handle/updatePcbCounting.js");
//let 

class GascoigneApp {
  constructor(mainWindow) {
    this.handler={
      productionDetailHandler:new ProductionDetailHandler(),
      configHandler:new ConfigHandler(),
      readconfig:new ReadConfigHandler(),
      pcbTotalHandler:new PcbtotalHandler(),
      machineconfigHandler:new MachineconfigHandler(),
      getmachineconfigHandler:new GetmachineConfigHandler(),
      readProductionDetailHandler:new ReadproductDetail(),
      readPcbCountingHandler : new ReadPcbCounting(),
      updatePcbCountingHandler : new UpdatePcbCounting()
    };
    this.mainWindow = mainWindow;
    ipcMain.on(msgType.SEND_TO_MID,async(event,arg)=>{
      try{
        switch(arg.msgType){
          case "operate":
              this.socket.send(arg.msgType, arg.data); 
              break;
          case "workModel":
              this.socket.send(arg.msgType,arg.data);
           
              this.handler.configHandler.run(arg.data);
              break;
          case "Warehousezero":
              this.socket.send(arg.msgType,arg.data);
              break;
          case "pageready":
                //handler.getmachineconfigHandler.init(this.mongodbService,this.socket);
                await this.handler.getmachineconfigHandler.run();
                await this.handler.readconfig.run();
               // handler.readProductionDetailHandler.init(this.mongodbService,this.socket);
                await this.handler.readProductionDetailHandler.run();
              //  handler.readPcbCountingHandler.init(this.mongodbService,this.socket);
               await this.handler.readPcbCountingHandler.run();
                break;
          case "machineConfig":
                this.socket.send(arg.msgType,arg.data);
                //handler.machineconfigHandler.init(this.mongodbService,this.socket);
                this.handler.machineconfigHandler.run(arg.data);
                break;
          case "checkcorrect":
               this.socket.send(arg.msgType,arg.data);  
                break;
          case "login":
                this.socket.send(arg.msgType,arg.data);
                break;
          case "changepwd":
                this.socket.send(arg.msgType,arg.data);
                break;
          case "handerUpload":
                this.socket.send(arg.msgType,arg.data);
                break;
          case "resetTrayData":
                //handler.updatePcbCountingHandler.init(this.mongodbService,this.socket);
                this.handler.updatePcbCountingHandler.run(arg.data);
                break;
          case "trayCount":
                this.socket.send(arg.msgType,arg.data);
                break;
          case "Warehouseout":
                this.socket.send(arg.msgType,arg.data);
                break;
          case "machineTimeconfig":
                this.socket.send(arg.msgType,arg.data);
                excelLogUtil.addMachineTime(arg.data);
                break;
          case "operateIo":
            this.socket.send(arg.msgType, arg.data);
            break;
            case "setPoint":
            this.socket.send(arg.msgType, arg.data);
            excelLogUtil.addpointRecord(arg.data);
            break;
          case "windowclose":
            this.mainWindowClosed(this.mainWindow);
          break;
          default: 
           this.socket.send(arg.msgType, arg.data);
           break;
        }
      }catch(error){
        console.log(error);
      }
    })
  }

async init() {
      logger.debug("init websocket");
     // var self = this;
      this.mongodbService=new MongodbService(mongodbURL);
      this.socket = new WebSocketUtil(wsURL,this.mainWindow,this.handler);
      //this.excellogUtil=new excellogUtil(); 
      return callExe(SYSTEM_VAR.midExePath,SYSTEM_VAR.midExeDir)
      .then(()=>{
       return this.mongodbService.init();
      }).then(()=>{
        this.uncaughtException();
        this.handler.getmachineconfigHandler.init(this.mongodbService,this.socket,this.mainWindow);
        this.handler.productionDetailHandler.init(this.mongodbService,this.socket);
        this.handler.pcbTotalHandler.init(this.mongodbService,this.socket);
        this.handler.readconfig.init(this.mongodbService,this.socket);
        this.handler.readProductionDetailHandler.init(this.mongodbService,this.socket);
        this.handler.readPcbCountingHandler.init(this.mongodbService,this.socket);
        this.handler.updatePcbCountingHandler.init(this.mongodbService,this.socket);
        this.handler.configHandler.init(this.mongodbService,this.socket);
        this.handler.machineconfigHandler.init(this.mongodbService,this.socket);
        return this.socket.init()
      }).then(()=>{
        logger.debug("socket connect success");
        return excelLogUtil.init();
      }).then(()=>{
        logger.debug("excel log dir init success");
      }).catch(function(error){
        console.log(error);
        logger.debug(error);
      });     
   
     
      // this.socket.addEventListener(()=>{
      //     self.socket.send('ssssss',  'hello, ray', false);
      // });
      //this.mainWindow.on('closed', this.mainWindowClosed);
      uiHandler.setMainWin(this.mainWindow);
      // ipcMain.on(msgType.SEND_TO_MID, (event, arg) => {
      //   this.socket.send(arg.msgType, arg.data, arg.isNeedResponse, arg.timeout);
      // });
   

  }

  mainWindowClosed(mainwindow) {
    //this.mainWindow.hide();
     mainwindow.destroy();
  }
  uncaughtException() {
    process.on("unhandledRejection", function (error) {
      console.log(error);
    });
  }

}
//let app0 = new GascoigneApp(ipcMain);
//app0.init();
module.exports = GascoigneApp;
function callExe(path,dir) {
  const { execFile } = require('child_process');
  let options = {
    cwd:dir,
  };
  if( SYSTEM_VAR.isDebug ){
    return Promise.resolve();
  }else{
    return new Promise(function (resolve, reject) {
      const child = execFile(path, [],options, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
      });
      setTimeout(function() {
        resolve();
      }, 1000);
    });
  }
}
