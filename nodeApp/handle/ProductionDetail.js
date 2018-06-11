const BaseHandler = require("./baseHandler.js");
const MongodbService = require("../service/mongodbService.js");
const WebSocketUtil = require("../service/WebSocketUtil.js");
const collectionName = require("../common/collectionName.js");
const MSG_TYPE = require('../common/systemVar.js').msgType;
let productADetail = require('../common/systemVar.js').productADetail;
let productBDetail = require('../common/systemVar.js').productBDetail;

const ProductCount = require('../bean/productCount.js');
const fsEx = require('fs-extra');
let  startTime=0;
let endTime=0;
let traynumber=[];
// let productDetail = {
//     PCBSN:"",
//     TraySN:"",
//     type:"",
//     jobnumber:"",
//     code:"",
//     time:"",
//     detail:""
// }
class ProductionDetailHandler extends BaseHandler {
    /**
     * 执行数据处理前的准备工作
     */
    befor() {
        startTime = Date.now();
        console.log("start handle productDetailHandler");
    }
    /**
     * 处理完成后的一些处理
     */
    after() {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("finish handle productDetailHandler,cost time " + cost + "s");
    }
    sendOK() {
      this.webSocketUtil.sendToPage(MSG_TYPE.SAVE_CONFIG_RESULT,{
        resultCode:0,msg:"",
      });
    }
    onError(error) {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("error on handle SaveConfigHandler,cost time " + cost + "s");
    }
    /**
     * 处理进料时接收的数据
     */
    async handle(data) {
        let currenttime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
        let productCountCollection = await this.mongodbService.getCollection(collectionName.productCount);
        /**@type {ProductCount} */
        let productCount = await productCountCollection.findOne({
          type:"pcbCounting"
        });
        if( data !== undefined ){
            // let productData = {
            //     PCBSN:data.PCBSN,
            //     TraySN:data.TraySN,
            //     type:data.type,
            //     jobnumber:data.jobnumber,
            //     code:data.code,
            //     time:currenttime
                
            // }
            if(data.code === "A"){
                productADetail.PCBSN = data.PCBSN ; 
                productADetail.TraySN = data.TraySN;
                productADetail.code = data.code;
                productADetail.jobnumber = data.jobnumber;
                productADetail.type = data.type;
                productADetail.time = currenttime;
                productADetail.detail = "product";
                if( productCount ){
                    let Atraynumber = productCount.Atraynumber + 1;
                    await productCountCollection.updateOne({
                        type:"pcbCounting"
                    },{
                        $set: { Atraynumber: Atraynumber }
                    });
                }else{
                  let product = new ProductCount();
                  product.Atraynumber = 1;
                  await productCountCollection.insertOne( product );
                }
            } else {
                productBDetail.PCBSN = data.PCBSN ; 
                productBDetail.TraySN = data.TraySN;
                productBDetail.code = data.code;
                productBDetail.jobnumber = data.jobnumber;
                productBDetail.type = data.type;
                productBDetail.time = currenttime;
                productBDetail.detail = "product";
                if( productCount ){
                    let Btraynumber = productCount.Btraynumber + 1;
                    await productCountCollection.updateOne({
                        type:"pcbCounting"
                    },{
                        $set: { Btraynumber: Btraynumber }
                    });
                }else{
                    let product = new ProductCount();
                    product.Btraynumber = 1;
                    await productCountCollection.insertOne(product);
                }
            }
        }
    }
}
module.exports = ProductionDetailHandler;