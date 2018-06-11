const BaseHandler = require("./baseHandler.js");
const MongodbService = require("../service/mongodbService.js");
const collectionName = require("../common/collectionName.js");
const WebSocketUtil = require("../service/WebSocketUtil.js");
const ProductCount = require('../bean/productCount.js');
const MSG_TYPE = require('../common/systemVar.js').msgType;
const fsEx = require('fs-extra');
let  startTime=0;
let endTime=0;
class ReadpcbCounting extends BaseHandler {
    /**
     * 执行数据处理前的准备工作
     */
    befor() {
        startTime = Date.now();
        console.log("start handle ReadpcbCounting");
    }
    /**
     * 处理完成后的一些处理
     */
    after() {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("finish handle ReadpcbCounting,cost time " + cost + "s");
    }
    onError(error) {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("error on handle ReadpcbCounting,cost time " + cost + "s");
    }
    /**
     * 页面初始加载时获取数据库tray盘数等
     */
    async handle() {
        let productCountCollection = await this.mongodbService.getCollection(collectionName.productCount);
        /**@type {ProductCount} */
        let productCount = await productCountCollection.findOne({
            type:"pcbCounting"
        });
        if ( productCount ) {
            this.webSocketUtil.sendToPage(MSG_TYPE.PAGE_READY_RESULT, productCount);
        } 
    }
}
module.exports = ReadpcbCounting;