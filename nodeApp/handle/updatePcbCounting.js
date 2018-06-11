const BaseHandler = require("./baseHandler.js");
const MongodbService = require("../service/mongodbService.js");
const collectionName = require("../common/collectionName.js");
const WebSocketUtil = require("../service/WebSocketUtil.js");
const ProductCount = require('../bean/productCount.js');
const MSG_TYPE = require('../common/systemVar.js').msgType;
const fsEx = require('fs-extra');
let  startTime=0;
let endTime=0;
class UpdatePcbCounting extends BaseHandler {
    /**
     * 执行数据处理前的准备工作
     */
    befor() {
        startTime = Date.now();
        console.log("start handle UpdatePcbCounting");
    }
    /**
     * 处理完成后的一些处理
     */
    after() {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("finish handle UpdatePcbCounting,cost time " + cost + "s");
    }
    onError(error) {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("error on handle UpdatePcbCounting,cost time " + cost + "s");
    }
    /**
     * 更新数据库tray盘数等
     */
    async handle(data) {
        let productCountCollection = await this.mongodbService.getCollection(collectionName.productCount);
        /**@type {ProductCount} */
        let productCount = await productCountCollection.findOne({
            type:"pcbCounting"
        });
        //重置计数更新成品数量为0
        if( data.code ==="totalPCBnumber" ){
            if ( productCount ) {
                await productCountCollection.updateOne({
                    type:"pcbCounting"
                },{
                    $set: { 
                       
                        totalPCBnumber: 0
                    }
                });
            }
            return;
        }
        //否则更新tray盘数
        if ( productCount ) {
            let code = data.code;
            if( code === "A"){
                await productCountCollection.updateOne({
                    type:"pcbCounting"
                },{
                    $set: { 
                        Atraynumber: 0
                     }
                });
            }else{
                await productCountCollection.updateOne({
                    type:"pcbCounting"
                },{
                    $set: { 
                        Btraynumber:0
                     }
                });
            }
          
           
        } 
    }
}
module.exports = UpdatePcbCounting;