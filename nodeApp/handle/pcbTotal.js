const BaseHandler = require("./baseHandler.js");
const MongodbService = require("../service/mongodbService.js");
const WebSocketUtil = require("../service/WebSocketUtil.js");
const collectionName = require("../common/collectionName.js");
const PcbCount = require("../bean/pcbCount.js");
const MSG_TYPE = require('../common/systemVar.js').msgType;
let productADetail = require('../common/systemVar.js').productADetail;
let productBDetail = require('../common/systemVar.js').productBDetail;
const excelLogUtil = require("../service/excellogUtil.js");
const ProductCount = require('../bean/productCount.js');
const fsEx = require('fs-extra');
let  startTime=0;
let endTime=0;
let pcbcount=[];

class PcbtotalHandler extends BaseHandler {
    /**
     * 执行数据处理前的准备工作
     */
    befor() {
        startTime = Date.now();
        console.log("start handle PcbtotalHandler");
    }
    /**
     * 处理完成后的一些处理
     */
    after() {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("finish handle PcbtotalHandler,cost time " + cost + "s");
    }
    sendOK() {
      this.webSocketUtil.sendToPage(MSG_TYPE.SAVE_CONFIG_RESULT,{
        resultCode:0,msg:"",
      });
    }
    onError(error) {
        endTime = Date.now();
        let cost = (endTime - startTime) / 1000;
        console.log("error on handle PcbtotalHandler,cost time " + cost + "s");
    }
    /**
     * 处理出料时发送的信息 
     * @param  {PcbCount} data
     */
    async handle(data) { 
      let currenttime = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
      /**@type {PcbCount}*/
      let pcbCountCollection = await this.mongodbService.getCollection(collectionName.pcbcount);
      let productCountCollection = await this.mongodbService.getCollection(collectionName.productCount);
      // let productDetailCollection = await this.mongodbService.getCollection(collectionName.productionDetail);
      // /**@type {ProductDetail}*/
      // let productdetail = await productDetailCollection.findOne({ PCBSN: data.PCBSN })
      // data.time = currenttime;
      // data.jobnumber = productdetail.jobnumber;
      // data.code = productdetail.code;
      // data.PCBSN=productdetail.PCBSN;
      // data.TraySN = productdetail.TraySN;
      // data.type = productdetail.type;
      // data.detail="product";
      // productdetail.time = currenttime;
      let newProductDetail = null;
      if( data.code === "A" ){
        // //不扫码时不会发进料消息
        // if( data.PCBSN === "nosn" ){
        //   productADetail.code = "A";
        //   productADetail.PCBSN = "";
        //   productADetail.TraySN = "";
        //   productADetail.jobnumber = "";
        //   productADetail.type = "";
        // }
        newProductDetail = Object.assign({},productADetail);
      }
      if( data.code === "B" ){
        // if( data.PCBSN === "nosn" ){
        //   productBDetail.code = "B";
        //   productBDetail.PCBSN = "";
        //   productBDetail.TraySN = "";
        //   productBDetail.jobnumber = "";
        //   productBDetail.type = "";
        // }
        newProductDetail = Object.assign({},productBDetail);
      }
      newProductDetail.time = currenttime;
      /**@type {ProductCount} */
      let productCount = await productCountCollection.findOne({
        type:"pcbCounting"
      });
      let totalPCBnumber = productCount.totalPCBnumber + 1;
      if( productCount ){
          await productCountCollection.updateOne({
              type:"pcbCounting"
          },{
              $set: { totalPCBnumber: totalPCBnumber }
          });
      }else{
        await productCountCollection.insertOne( new ProductCount() );
      }
      await pcbCountCollection.insertOne(newProductDetail);
      this.webSocketUtil.sendToPage("outmaterial", newProductDetail);
      excelLogUtil.addProductDetail(newProductDetail);

    }
}
module.exports = PcbtotalHandler;