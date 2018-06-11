const BaseHandler = require("./baseHandler.js");
const MongodbService = require("../service/mongodbService.js");
const collectionName = require("../common/collectionName.js");
const WebSocketUtil = require("../service/WebSocketUtil.js");
const PcbCount = require("../bean/pcbCount.js");
const MSG_TYPE = require('../common/systemVar.js').msgType;
const fsEx = require('fs-extra');
let  startTime=0;
let endTime=0;
class ReadproductDetail extends BaseHandler {
    /**
     * 执行数据处理前的准备工作
     */
    befor() {
        startTime = Date.now();
        console.log("start handle ReadproductDetail");
    }
    /**
     * 处理完成后的一些处理
     */
    after() {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("finish handle ReadproductDetail,cost time " + cost + "s");
    }
    // sendOK() {
    //   this.webSocketUtil.sendToPage(MSG_TYPE.SAVE_CONFIG_RESULT,{
    //     resultCode:0,msg:"",
    //   });
    // }
    onError(error) {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("error on handle ReadproductDetail,cost time " + cost + "s");
    }
    /**
     * 页面初始加载时获取数据库5条生产记录
     */
    async handle() {
        
        let pcbCollection = await this.mongodbService.getCollection(collectionName.pcbcount);
        /**@type {[PcbCount]} */
        let pcbList = await pcbCollection.find().toArray();
        if( pcbList.length!== 0 ){
            let productdetail = pcbList.splice(pcbList.length-5);
            this.webSocketUtil.sendToPage("onloadProduct", productdetail);
        } 
        //this.writeFile(data.data);
        //this.webSocketUtil.sendToPage(MSG_TYPE.PAGE_READY_RESULT,response);
    }
}
module.exports = ReadproductDetail;