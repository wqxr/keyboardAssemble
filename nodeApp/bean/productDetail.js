
/**
 * 收到进料消息，页面生产记录先不显示该条记录，此表用来临时存储进料时发送的产品信息
 */
class ProductDetail {
    constructor() {
        this.PCBSN = "";        //PCB编号
        this.TraySN = "";       //tray盘编号
        this.type = "";         //类型ANSI/ISO/JIS
        this.jobnumber = "";    //工单号
        this.code = "";         //工站编号 A/B
        this.currenttime = "";  //时间
    }
}
module.exports = ProductDetail;