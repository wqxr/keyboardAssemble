const BaseHandler = require("./baseHandler.js");
const MongodbService = require("../service/mongodbService.js");
const collectionName = require("../common/collectionName.js");
const WebSocketUtil = require("../service/WebSocketUtil.js");
const excelLogUtil = require("../service/excellogUtil.js");
const MachineConfig = require("../bean/machineConfig.js");
const MSG_TYPE = require('../common/systemVar.js').msgType;
const fsEx = require('fs-extra');
let startTime = 0;
let endTime = 0;

class getMachineconfigHandler extends BaseHandler {
    /**
     * 执行数据处理前的准备工作
     */
    befor() {
        startTime = Date.now();
        console.log("start handle getMachineconfigHandler");
    }
    /**
     * 处理完成后的一些处理
     */
    after() {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("finish handle getMachineconfigHandler,cost time " + cost + "s");
    }
    // sendOK() {
    //   this.webSocketUtil.sendToPage(MSG_TYPE.SAVE_CONFIG_RESULT,{
    //     resultCode:0,msg:"",
    //   });
    // }
    onError(error) {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("error on handle getMachineconfigHandler,cost time " + cost + "s");
    }
    /**
     * 从数据库得到机器的配置
     */
    async handle() {
        let configCollection = await this.mongodbService.getCollection(collectionName.machineConfig);
        /**@type {MachineConfig} */
        let oldConfig = await configCollection.findOne({
            type: "machineConfig"
        });
        if (oldConfig) {
                this.webSocketUtil.send("machineconfig",oldConfig);  
                this.webSocketUtil.sendToPage("machineconfig", oldConfig);
                excelLogUtil.getLineNo(oldConfig.LineNo);
           
            
        } else {

        }
        //this.writeFile(data.data);
        //this.webSocketUtil.sendToPage(MSG_TYPE.PAGE_READY_RESULT,response);
    }
}
module.exports = getMachineconfigHandler;