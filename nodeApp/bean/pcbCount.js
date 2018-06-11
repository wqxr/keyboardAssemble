
/**
 * 收到出料消息，从临时表productDetail得到出料编号为PCBSN的数据，
 * 并将生产记录存储在此表中
 */
class PcbCount {
    constructor() {
        this.PCBSN = "";        //PCB编号
        this.TraySN = "";       //tray盘编号
        this.type = "";         //类型ANSI/ISO/JIS
        this.jobnumber = "";    //工单号
        this.code = "";         //工站编号 A/B
        this.currenttime = "";  //时间
    }
}
module.exports = PcbCount;